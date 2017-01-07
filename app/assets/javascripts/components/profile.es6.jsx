class Profile extends React.Component {
    render() {
        return (
            <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                <div className={"users-board__profile " + this.props.separatorClass}>
                    <img src={this.props.user.avatar_path} alt=""/>
                    <div className="users-board__profile__name">{this.props.user.username}</div>
                </div>
                <p className={"users-board__profile__score " + this.props.scoreClass} >Score: {this.props.user.score}</p>
            </div>
        );
    }
}

