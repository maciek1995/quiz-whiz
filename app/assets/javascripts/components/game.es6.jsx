class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            opponent: null,
            questions: props.questions,
            second: 0
        };
        this.updateGame = this.updateGame.bind(this)
    }

    componentDidMount() {
        this.setupSubscription();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState.game.status);
        if(this.state.game.status === 'current' && this.state.second === 0) {
            setInterval(function () {
                this.setState({second: this.state.second + 1})
            }.bind(this), 1000);
        }
    }

    render() {
        return (
            <div className="container">

                <form role='form' action={"/games/" + this.state.game.id + "/abort"} method="post">
                    <input type='hidden' name='authenticity_token' value={this.props.authenticity_token}/>
                    <button type="submit" className="btn btn-danger" onClick={this._abort}>Abort</button>
                </form>

                <ProfilesBoard currentUser={this.state.currentUser} opponent={this.state.opponent}/>
                <GamePlay me={this.state.currentUser}
                          opponent={this.state.currentUser}
                          sec={this.state.second}
                />
            </div>
        )
    }


    updateGame(data) {
        data = JSON.parse(data);
        let newGame = Object.assign({}, this.state.game, {status: data.game_status});
        let opponent = data.users.find((user)=>{
            return user.id !== this.state.currentUser.id;
        });
        this.setState({
            game: newGame,
            opponent: opponent
        });
    }

    setupSubscription() {
        App.comments = App.cable.subscriptions.create({
                channel: "GamesChannel",
                game_id: this.state.game.id
            },
            {
                currentUser: this.state.game.currentUser,
                game_id: this.state.game.id,
                connected: function () {
                    setTimeout(() => this.perform('appear',
                        {
                            game_id: this.game_id,
                            user: this.currentUser
                        }
                    ), 1000);
                },
                received: function (data) {
                    this.updateGame(data);
                },
                updateGame: this.updateGame
            }
        );
    }
}
