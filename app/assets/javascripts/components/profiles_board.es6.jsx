class ProfilesBoard extends React.Component {
    render() {
        return (
            <section className="users-board">
                <div className="row">
                    {/*<Profile user={this.props.currentUser} separatorClass="users-board__profile--left" scoreClass={leftScoreClass} />*/}
                    {/*<Profile user={this.props.opponent} scoreClass={rightScoreClass} />*/}

                    <Profile user={this.props.currentUser} right={false} />
                    <Profile user={this.props.opponent} right={true}/>
                </div>
            </section>
        );
    }
}

