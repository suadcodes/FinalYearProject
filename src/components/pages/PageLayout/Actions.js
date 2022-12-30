import PropTypes from 'prop-types';
import Icon from './Icons.js';
import '../scss/Actions.scss';

ActionTray.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
  }
  
  export function ActionTray({children}) {
    return (
      <div className="ActionTray">
        { children }
      </div>
    );
  }

  ActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    showText: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
  };
  
  function ActionButton({ children, onClick, showText, buttonText }) {
    return (
      <button className="Action" onClick={onClick}>
        {children} {showText && <p>{buttonText}</p>}
      </button>
    );
  }
  const ActionPropTypes = {
    onClick: PropTypes.func.isRequired,
    showText: PropTypes.bool
  };
  
  ActionAdd.propTypes = ActionPropTypes;
  
  export function ActionAdd({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Add"} onClick={onClick} showText={showText} >
        <Icon.Plus />
      </ActionButton>
    );
  }
  
  ActionClose.propTypes = ActionPropTypes;
  
  export function ActionClose({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Close"} onClick={onClick} showText={showText} >
        <Icon.Cross />
      </ActionButton>
    );
  }
  
  ActionDelete.propTypes = ActionPropTypes;
  
  export function ActionDelete({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Delete"} onClick={onClick} showText={showText} >
        <Icon.Trash />
      </ActionButton>
    );
  }
  
  ActionFavourites.propTypes = ActionPropTypes;
  
  export function ActionFavourites({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Favourite"} onClick={onClick} showText={showText} >
        <Icon.RedHeart />
      </ActionButton>
    );
  }
  
  ActionListAll.propTypes = ActionPropTypes;
  
  export function ActionListAll({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "List"} onClick={onClick} showText={showText} >
        <Icon.List />
      </ActionButton >
    );
  }
  
  ActionModify.propTypes = ActionPropTypes;
  
  export function ActionModify({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Modify"} onClick={onClick} showText={showText} >
        <Icon.Pen />
      </ActionButton>
    );
  }
  
  ActionNo.propTypes = ActionPropTypes;
  
  export function ActionNo({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "No"} onClick={onClick} showText={showText} >
        <Icon.Cross />
      </ActionButton>
    );
  }
  
  ActionSubscribe.propTypes = ActionPropTypes;
  
  export function ActionSubscribe({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Subscribe"} onClick={onClick} showText={showText} >
        <Icon.Tick />
      </ActionButton>
    );
  }
  
  ActionYes.propTypes = ActionPropTypes;
  
  export function ActionYes({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Yes"} onClick={onClick} showText={showText} >
        <Icon.Tick />
      </ActionButton>
    );
  }
  
  ActionUnsubscribe.propTypes = ActionPropTypes;
  
  export function ActionUnsubscribe({ onClick, showText=false, buttonText=null}) {
    return (
      <ActionButton buttonText={buttonText || "Unsubscribe"} onClick={onClick} showText={showText} >
        <Icon.Cross />
      </ActionButton>
    );
  }