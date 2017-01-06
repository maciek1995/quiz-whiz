class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            questions: props.questions,
            second: 0
        };
        console.log(props.game);
        this.updateGame = this.updateGame.bind(this)
        this._abort = this._abort.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
        setInterval(function () {
            this.setState({second: this.state.second + 1})
        }.bind(this), 1000);
    }

    _abort() {


    }

    render() {
        return (
            <div className="container">

                <form role='form' accept-charset="UTF-8" action={"/games/" + this.state.game.id + "/abort"} method="post">
                    <input type='hidden' name='authenticity_token' value={this.props.authenticity_token} />
                    <button type="submit" className="btn btn-danger" onClick={this._abort}>Abort</button>
                </form>

                <ProfilesBoard me={this.state.currentUser} opponent={this.state.currentUser}/>
                <GamePlay me={this.state.currentUser}
                          opponent={this.state.currentUser}
                          sec={this.state.second}
                />
            </div>
        )
    }

    updateGame(data) {
        console.log();
        data = JSON.parse(data);
        let newGame = Object.assign({}, this.state.game, {status: data.game_status});
        console.log(data.game_status);
        console.log(newGame);
        this.setState({
            game: newGame
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
