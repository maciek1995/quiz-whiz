class Profile extends React.Component {

    _renderProfile() {

        var sepClass = "users-board__profile--left";
        var scoreClass = "users-board__profile__score";

        if(this.props.user) {
            if (this.props.right) {
                return (
                    <div className={"row users-board__profile "}>
                        <div className="col-xs-4">
                            <div className="users-board__profile__score users-board__profile__score--right">
                                {this.props.user &&
                                <p>Score:
                                    <span className="users-board__profile__score__points">{this.props.score}</span>
                                </p> }
                            </div>
                        </div>

                        <div className="col-xs-5">
                            <img className="users-board__profile__avatar" src={this.props.user.avatar_path} alt=""/>
                            <div className="users-board__profile__name">{this.props.user.username}</div>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div className={"row users-board__profile " + sepClass}>
                        <div className="col-xs-5 col-xs-offset-3">
                            <img className="users-board__profile__avatar" src={this.props.user.avatar_path} alt=""/>
                            <div className="users-board__profile__name">{this.props.user.username}</div>
                        </div>
                        <div className="col-xs-4">
                            <div className="users-board__profile__score users-board__profile__score--left">
                                <p>Score:
                                    <span className="users-board__profile__score__points">
                                        {this.props.score}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }


    render() {
        return (
            <div className="col-xs-6">
                {this._renderProfile()}
            </div>
        );
    }
}

