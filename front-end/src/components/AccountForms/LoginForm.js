import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const LoginForm = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <div className="row">
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Email"
              onChange={handleChange}
              id="email-form"
              name="email"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Password"
              type="password"
              onChange={handleChange}
              id="password-form"
              name="password"
              value={password}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Repeat Password"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              id="password-form-confirm"
              value={passwordConfirm}
              validators={["isPasswordMatch", "required"]}
              errorMessages={["password mismatch", "this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="First Name"
              onChange={handleChange}
              id="firstname-form"
              name="firstname"
              value={firstName}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Last Name"
              onChange={handleChange}
              id="lastname-form"
              name="lastName"
              value={lastName}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Phone Number"
              onChange={handleChange}
              id="phonenumber-form"
              name="phoneNumber"
              value={phoneNumber}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
          <div className={classes.centerDiv}>
            <TextValidator
              className={classes.textField}
              margin="normal"
              label="Address"
              onChange={handleChange}
              id="address-form"
              name="address"
              value={address}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className={classes.centerDiv}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </div>
        </div>
        <br />
      </ValidatorForm>
    </div>
  );
};

export default LoginForm;
