class InvitationsDropdown extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderInvitations(invitations) {
    return invitations.map((invitation)=>{
      return <li>Play with {invitation.username}</li>
    });
  }

  render () {
    let {invitatons} = this.props;
    let invitationsList = this._renderInvitations(this.props.invitations);

    return (
      <ul>
        {invitationsList}
      </ul>
    );
  }
}
