import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    renderAdmin(userId, id) {
        if (this.props.currentUserId === userId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map(({ title, id, description, userId }) => {
            return (
                <div className="item" key={id}>
                    {this.renderAdmin(userId, id)}
                    < i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${id}`}>{title}</Link>
                        <div className="description">{description}</div>
                    </div>
                </div >
            )
        });
    };
    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {
    fetchStreams
})(StreamList);