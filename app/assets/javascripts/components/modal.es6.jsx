class Modal extends React.Component {
  render () {
    return(
      <div className="modal-dialog modal-lg qw-modal">
          <div className="modal-content">
              {this.props.children}
          </div>
      </div>
  );
  }
}

