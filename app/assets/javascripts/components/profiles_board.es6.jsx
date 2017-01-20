class ProfilesBoard extends React.Component {
    render() {
        return (
            <div className="row users-board">
                    <Profile user={this.props.currentUser}
                             right={false}
                            score={this.props.score}
                    />
                    <Profile user={this.props.opponent}
                             right={true}
                             score={this.props.opponent ? this.props.opponent.score : 0 }
                    />
            </div>
        );
    }
}

