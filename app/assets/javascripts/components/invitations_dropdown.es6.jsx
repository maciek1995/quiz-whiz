class InvitationsDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    _renderInvitations(invitations) {
        return invitations.map((invitation, index)=>{
            return (
                <i className="notification-dropdown__invitation-item" key={index}>
                    <img className="notification-dropdown__invitation-item__avatar" src={invitation.user.avatar_path}/>
                    <p className="notification-dropdown__invitation-item__username">{invitation.user.username}</p>
                    <a href={`/games/${invitation.game_id}/accept_invitation`} data-method="post" className="notification-dropdown__invitation-item__btn btn">Accept</a>
                    <a href={`/games/${invitation.game_id}/decline_invitation`} data-method="post" className="notification-dropdown__invitation-item__btn btn">Decline</a>
                </i>
            )
        });
    }

    render () {
        let {invitatons} = this.props;
        let invitationsList = this._renderInvitations(this.props.invitations);

        return (
          <ul className="notification-dropdown">
            {invitationsList}
          </ul>
        );
      }
}
