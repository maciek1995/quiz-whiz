class Profile extends React.Component {
    render() {
        return (
            <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                <div className={"users-board__profile " + this.props.separatorClass}>
                    <i className="fa fa-user-circle fa-5x" aria-hidden="true"></i>
                    <div className="users-board__profile__name">{this.props.user.email}</div>
                </div>
                <p className={"users-board__profile__score " + this.props.scoreClass} >Score: {this.props.user.score}</p>
            </div>
        );
    }
}

