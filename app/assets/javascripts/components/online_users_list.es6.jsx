class OnlineUsersList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            available_users: props.available_users
        };
        this.setupSubscription = this.setupSubscription.bind(this);
        this.updateUsersList = this.updateUsersList.bind(this);
        this.renderAvailableUsers = this.renderAvailableUsers.bind(this);
    }

    componentDidMount() {
        this.setupSubscription();
    }

    render () {
        return (
            <div className="available-users-container">
                <header className="available-users-container__header">Online Users</header>
                <ul className="available-users-list">
                    {this.renderAvailableUsers()}
                </ul>
            </div>
        );
    }

    renderAvailableUsers() {
        return this.state.available_users.map((user, index) => {
            if(user.id !== this.props.currentUser.id){
                return(
                    <li key={"available_user-" + index} className="available-users-list__item">
                        <img src={user.avatar_path} alt="user avatar" className="available-users-list__item__avatar"/>
                        <p className="available-users-list__item__username">{user.username}</p>
                        <a href={`/games/invite?user_id=${user.id}`}
                           data-method="post"
                           className="btn available-users-list__item__invite-btn">
                            Invite
                        </a>
                    </li>
                )
            }
        }).filter(n => n);
    }

    updateUsersList(data){
        if(data.id == this.props.currentUser.id){
            return;
        }else if(!data.is_available){
            let userIndex = this.state.available_users.findIndex((user) => {
                return user.id === data.id
            });
            this.setState({
                available_users: this.state.available_users.filter((_, i) => i !== userIndex)
            })
        }else{
            this.setState({
                available_users: this.state.available_users.concat([data])
            })
        }
    }

    setupSubscription() {
        App.comments = App.cable.subscriptions.create(
            {
                channel: "AvailableUsersChannel"
            },
            {
                connected: function () {
                    setTimeout(() => this.perform('appear', {}), 1000);
                },
                received: function(data) {
                    this.updateUsersList(data);
                },
                disconnected: function () {
                    this.perform('uninstall', {})
                },
                updateUsersList: this.updateUsersList
            }
        );
    }
}
