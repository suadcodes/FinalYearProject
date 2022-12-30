import { useState } from 'react';
import { ActionTray, ActionAdd, ActionClose } from './Actions';
import ToolTipDecorator from './ToolTipDecorator.js';
import '../scss/Form.scss';

export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
  const handleSubmit = () => onSubmit();
  const handleCancel = () => onCancel();

  // View ----------------------------------------
  return (  
    <form className="BorderedForm">

      <div className="FormTray">
        {
          children
        }
      </div>

      <ActionTray>
        <ToolTipDecorator message="Submit event">
          <ActionAdd showText onClick={handleSubmit} buttonText="Submit"/>
        </ToolTipDecorator>
        <ToolTipDecorator message="Cancel form">
          <ActionClose showText onClick={handleCancel} buttonText="Cancel" />
        </ToolTipDecorator>
      </ActionTray>

    </form>
  );
}

function Item({ children, label, htmlFor, advice, error }) {
  // Initialisation ------------------------------
  // Hooks ---------------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className="Form.Item">
      <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
      {
        advice && <p className="FormAdvice">{advice}</p>
      }
      {
        children
      }
      {
        error && <p className="FormError">{error}</p>
      }
    </div>
  );
}

function useForm(initialEvent, conformance, { isValid, errorMessage }, onCancel, onSubmit) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  const [events, setEvents] =useState(initialEvent);
  const [errors, setErrors] = useState(
    Object.keys(initialEvent).reduce((accum,key) => ({...accum,[key]:null}), {})
);

  // Context -------------------------------------
  // Handlers ------------------------------------
  const handleChange = (event) => { 
    const { name, value } = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    setEvents({ ...events, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]});
  };

  const isValidEvent = (events) => {
    let isEventValid = true;
    Object.keys(events).forEach((key) => {
      if (isValid[key](events[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isEventValid = false;
      }
    });
    return isEventValid;
  }

  const handleSubmit = () => { 
    isValidEvent(events) && onSubmit(events) && onCancel();
    setErrors({...errors});
  };
  
  // View ----------------------------------------
  return [events, errors, handleChange, handleSubmit];
}

// -----------------------------------------
// Compose Form Object /////////////////////
// -----------------------------------------
Form.Item = Item;
Form.useForm = useForm;