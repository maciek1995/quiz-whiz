class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            opponent: null,
            currentQuestionIndex: null,
            answered: false,
            seconds: 10,
            gameStarted: false
        };

        this.updateGame = this.updateGame.bind(this);
        this.shouldStartGame = this.shouldStartGame.bind(this);
        this.shouldTriggerNextQuestion = this.shouldTriggerNextQuestion.bind(this);
        this.triggerNextQuestion  = this.triggerNextQuestion.bind(this);
        this.triggerAnswer = this.triggerAnswer.bind(this);
        this.checkIfTimeFinished = this.checkIfTimeFinished.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
    }

    componentDidUpdate() {
        this.checkIfTimeFinished();
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
                          sec={this.state.seconds}
                          csrf={this.props.authenticity_token}
                          gameId={this.state.game.id}
                          triggerAnswer={this.triggerAnswer}
                />
                { this.state.game.status === 'aborted' &&
                    <AbortedModal/>
                }
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
        }, function () {
            this.shouldStartGame();
            this.shouldTriggerNextQuestion();
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
                disconnected: function () {
                    this.perform('uninstall',
                        {
                            game_id: this.game_id,
                        }
                    )
                },
                updateGame: this.updateGame
            }
        );
    }

    shouldStartGame() {
        if(!this.state.gameStarted && this.state.game.status == "current"){
            this.setState({gameStarted: true, currentQuestionIndex: 0},
                ()=> {
                    setInterval(function () {
                        this.setState({seconds: this.state.seconds - 1})
                    }.bind(this), 1000);
                }
            )
        }
    }

    shouldTriggerNextQuestion() {
        let opponent_answer = this.state.opponent.answer;
        if(opponent_answer && opponent_answer.question_id === this.props.questions[this.state.currentQuestionIndex].id && this.state.answered){
            this.triggerNextQuestion();
        }
    }

    triggerNextQuestion() {
        this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1, seconds: 10, answered: false});
    }

    triggerAnswer() {
        this.setState({
            answered: true
        }, this.shouldTriggerNextQuestion);
    }

    checkIfTimeFinished() {
        if(this.state.seconds == 0 && this.state.game.status == "current") {
            let authenticity_token = this.props.authenticity_token;
            let question_id = this.props.questions[this.state.currentQuestionIndex].id;
            let game_id = this.state.game.id;
            let self = this;
            let path = "http://localhost:3000/user_game/" + game_id;
            this.setState({seconds: 10},
                () => {
                    $.ajax({
                        method: "PUT",
                        url: path,
                        data: {
                            authenticity_token: authenticity_token,
                            question_id: question_id,
                            game_id: game_id,
                            score: 0
                        }
                    }).done(function () {
                        self.triggerAnswer();
                    });
                });
        }
    }
}
