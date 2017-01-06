class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: props.game,
            currentUser: props.currentUser,
            questions: props.questions
        };

        this.updateGame = this.updateGame.bind(this)
    }

    componentDidMount() {
        this.setupSubscription();
    }

    render() {
        return (
            <div className="container">
               <ProfilesBoard me={this.state.currentUser} opponent={this.state.currentUser}/>
                <section className="question-board">
                    <div className="row">

                    </div>
                </section>
            </div>
        )
    }

    updateGame(data) {
        console.log(JSON.parse(data));
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
