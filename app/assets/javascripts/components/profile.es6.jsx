class Profile extends React.Component {

    _renderProfile() {
        if(this.props.user) {
            return (
                <div className={"users-board__profile " + this.props.separatorClass}>
                    <img src={this.props.user.avatar_path} alt=""/>
                    <div className="users-board__profile__name">{this.props.user.username}</div>
                </div>
            );
        } else {
            return (
                <p>Waiting for yout opponent</p>
            );
        }
    }


    render() {
        return (
            <div className="col-xs-6" style={{paddingRight: 0, paddingLeft: 0}}>
                {this._renderProfile()}
            </div>
        );
    }
}

