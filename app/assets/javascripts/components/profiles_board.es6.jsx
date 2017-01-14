class ProfilesBoard extends React.Component {
    render() {
        const leftScoreClass = "users-board__profile__score--left";
        const rightScoreClass = "users-board__profile__score--right";
        return (
            <section className="users-board">
                <div className="row">
                    <Profile user={this.props.currentUser} separatorClass="users-board__profile--left" scoreClass={leftScoreClass} />
                    <Profile user={this.props.opponent} scoreClass={rightScoreClass} />
                </div>
            </section>
        );
    }
}

