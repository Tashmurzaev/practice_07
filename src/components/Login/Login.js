import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [prim, setPrim] = useState(false);

  const [enteredName, setEnteredName] = useState('');
  const [nameIsValid, setNameIsValid] = useState();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const validNameRegex = RegExp(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/);

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('find');
      setFormIsValid(
        validNameRegex.test(enteredName) &&
          validEmailRegex.test(enteredEmail) &&
          enteredPassword.trim().length > 6
      );
    }, 3000);
    return () => {
      console.log('clean up the timer');
      clearTimeout(timer)
    } 
  }, [enteredName, enteredEmail, enteredPassword]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);

    // setFormIsValid(
    //   validNameRegex.test(event.target.value) &&
    //     validEmailRegex.test(enteredEmail) &&
    //     enteredPassword.trim().length > 6
    // );
    // console.log(formIsValid);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   validEmailRegex.test(event.target.value) &&
    //     enteredPassword.trim().length > 6 &&
    //     validNameRegex.test(enteredName)
    // );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 &&
    //     validEmailRegex.test(event.target.value) &&
    //     validNameRegex.test(enteredName)
    // );
  };

  const validateNameHandler = () => {
    setNameIsValid(validNameRegex.test(enteredName));
  };

  const validateEmailHandler = () => {
    setEmailIsValid(validEmailRegex.test(enteredEmail));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validNameRegex.test(enteredName)) {
      setPrim(
        <p className={classes.valid}>Username must have digits and letters</p>
      );
      return;
    }
    if (!validEmailRegex.test(enteredEmail)) {
      setPrim(<p className={classes.valid}>Gmail is not valid</p>);
      return;
    }
    if (!passwordIsValid) {
      setPrim(
        <p className={classes.valid}>Password must be more than 6 characters</p>
      );
      return;
    }

    props.onLogin(enteredName, enteredEmail, enteredPassword);
  };
  console.log(formIsValid);
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            nameIsValid === false ? classes.invalid : ''
          }`}
        >
          {prim}
          <input
            type="text"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
            placeholder="Name"
          />
        </div>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <input
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            placeholder="E-mail"
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <input
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            placeholder="Password"
          />
        </div>
        <div className={classes.action}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
