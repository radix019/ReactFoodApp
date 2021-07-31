import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Helper Functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm();
  };
  const stylesname = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const stylesStreet = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const stylesPostal = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;
  const stylesCity = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={stylesname}>
        <label htmlFor="name">Your Name</label>
        <input type="text" ref={nameInputRef} id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={stylesStreet}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetInputRef} id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={stylesPostal}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalInputRef} id="postal" />
        {!formInputsValidity.postal && <p>Please enter a 6 digit code</p>}
      </div>
      <div className={stylesCity}>
        <label htmlFor="city">City</label>
        <input type="text" ref={cityInputRef} id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
