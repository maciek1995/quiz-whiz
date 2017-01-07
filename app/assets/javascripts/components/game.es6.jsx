class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            opponent: null,
            currentQuestionIndex: -1,
            answered: false,
            second: 0
        };
        this.updateGame = this.updateGame.bind(this);
        this.triggerNextQuestion  = this.triggerNextQuestion.bind(this);
        this.toggleAnswered = this.toggleAnswered.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
        console.log("QUESTIONS");
        console.log(this.props.questions);
    }

    toggleAnswered() {
        this.setState({
            answered: !this.state.answered
        }, function () {
            if(this.state.answered === true && this.props.questions[this.state.currentQuestionIndex].id === this.state.opponent.answer.question_id) {
                this.triggerNextQuestion();
            }
        });
    }

    render() {
        return (
            <div className="container">

                <form role='form' action={"/games/" + this.state.game.id + "/abort"} method="post">
                    <input type='hidden' name='authenticity_token' value={this.props.authenticity_token}/>
                    <button type="submit" className="btn btn-danger" onClick={this._abort}>Abort</button>
                </form>

                <ProfilesBoard currentUser={this.state.currentUser} opponent={this.state.opponent}/>
                <GamePlay currentUser={this.state.currentUser}
                          opponent={this.state.opponent}
                          question={this.props.questions[this.state.currentQuestionIndex]}
                          sec={this.state.second}
                          csrf={this.props.authenticity_token}
                          gameId={this.state.game.id}
                          triggerNextQuestion={this.triggerNextQuestion}
                          toggleAnswered={this.toggleAnswered}
                />
            </div>
        )
    }

    triggerNextQuestion() {
        this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1, second: 0, answered: false}, ()=> {
            setInterval(function () {
                this.setState({second: this.state.second + 1})
            }.bind(this), 1000);
        });
    }

    updateGame(data) {
        data = JSON.parse(data);
        console.log(data);

        let newGame = Object.assign({}, this.state.game, {status: data.game_status});
        let opponent = data.users.find((user)=>{
            return user.id !== this.state.currentUser.id;
        });

        this.setState({
            game: newGame,
            opponent: opponent
        }, function () {
            if (this.state.game.status === 'current' && this.state.second === 0 && !this.state.opponent.answer || (
                    this.state.opponent.answer && this.state.opponent.answer.question_id === this.props.questions[
                        this.state.currentQuestionIndex].id
                    && this.state.answered
                )
            ) {
                this.triggerNextQuestion();
            }
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
