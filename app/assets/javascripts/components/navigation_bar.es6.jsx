class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invitationsList: [],
            showDropDown: false
        };

        this.updateInvitations = this.updateInvitations.bind(this);
        this._toggleDropDown = this._toggleDropDown.bind(this);
    }

    componentWillMount() {
        if(!this.props.currentUser) return;
        let self = this;
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/games/get_invitations",
            success: function(data) {
                self.setState({invitationsList: data})
            }
        })
    }

    componentDidMount() {
        if(!this.props.currentUser) return;
        this._setupSubscription();
    }

    updateInvitations(data) {
        if(data.deleted){
            this.setState({invitationsList: this.state.invitationsList.filter(
                invitation => {
                    invitation.game_id != data.game_id
                }
            )
            });
        }else{
            this.setState({invitationsList: this.state.invitationsList.concat([data])});
        }
    }

    _toggleDropDown() {
        this.setState({showDropDown: !this.state.showDropDown});
    }

    _setupSubscription() {
        App.comments = App.cable.subscriptions.create({
                channel: "UserInvitationChannel",
                user_id: this.props.currentUser.id
            },
            {
                received: function (data) {
                    this.updateInvitations(data);
                },
                disconnected: function () {
                    this.perform('uninstall',
                        {
                            game_id: this.game_id,
                        }
                    )
                },
                updateInvitations: this.updateInvitations
            }
        );
    }

    render () {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header nav navbar-nav navbar-left">
                            <a href="#">
                                <img alt="Brand" src="http://brain.im/app/images/brain.png" className="navbar__logo" />
                            </a>
                            <section className="navbar-brand navbar__brand-name">
                                <p className="navbar__brand-name--first">Quiz</p>
                                <p className="navbar__brand-name--second">Whiz</p>
                            </section>
                        </div>
                        <div className="nav navbar-nav navbar-right navbar__right-section">
                            { this.props.currentUser &&
                            <span>
              { this.state.invitationsList.length !== 0 &&
              <span className="navbar__right-section--invitation-info" onClick={this._toggleDropDown}>
                  <span className="fa fa-bell" aria-hidden="true"></span>
                  <span>{this.state.invitationsList.length} invitations</span>
              </span>
              }
                                <span className="navbar__right-section--session-info">Signed in as <img className="navbar__right-section--user-avatar" src={this.props.currentUser.avatar_path}/> <strong>{this.props.currentUser.username}</strong></span>
                <span className="navbar__right-section--logout-info">
                <a href="/users/sign_out" data-method="delete" rel="nofollow" style={{
                    paddingRight: 10,
                    color: 'white'

                }}>Log Out</a>
                <i className="fa fa-power-off" aria-hidden="true" />
                </span>
                </span>
                            }
                        </div>
                    </div>
                </nav>
                { this.state.showDropDown && <InvitationsDropdown invitations={this.state.invitationsList} /> }
            </div>
        )
    }
}
