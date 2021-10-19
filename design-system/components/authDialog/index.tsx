import React, { Fragment } from "react";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";

import Modal from "../modal";

import * as yup from "yup";

import { sortLocations } from "../../../utils/helpers";

import "./authDialog.scss";

const resetPasswordValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
});

const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Password"),
});

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required().label("Password"),
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
});

const googleLoginButtonStyle = {
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const GoogleLoginButton = (props: object) => (
  <button
    type="button"
    className="auth-dialog__third-party-auth-button"
    {...props}
  >
    <i className="third-party-auth-icon icon--google"></i>
    Login with Google
  </button>
);

const AppleLoginButton = (props: object) => (
  <button
    type="button"
    className="auth-dialog__third-party-auth-button"
    {...props}
  >
    <i className="third-party-auth-icon icon--apple"></i>
    Login with Apple
  </button>
);

type City = {
  name: string;
  value: string;
};

type Location = {
  latitude: number;
  longitude: number;
};

type BaseAuthDialogProps = {
  allCities: Array<City>;
  citiesFeatured: Array<string>;
  currentLocation: Location;
  errorMessage: string | null;
  isInProgress: boolean;
  onAppleResponse: Function;
  onFacebookResponse: Function;
  onGoogleResponse: Function;
  onLogIn: Function;
  onRegister: Function;
  onForgotPassword: Function;
};

type AuthRole = "Log in" | "Register" | "Reset password";

function BaseAuthDialog({
  allCities,
  citiesFeatured,
  currentLocation,
  errorMessage: errorMessageProp,
  isInProgress,
  onAppleResponse,
  onFacebookResponse,
  onGoogleResponse,
  onRegister,
  onLogIn,
  onForgotPassword,
}: BaseAuthDialogProps) {
  const [authRole, setAuthRole] = React.useState<AuthRole>("Log in");
  const [cityOptions, setCityOptions] = React.useState<Array<City>>([]);
  const [pickedCity, setPickedCity] = React.useState<City | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorReason, setErrorReason] = React.useState("");

  // form values
  const [email, setEmail] = React.useState<string | undefined>("");
  const [password, setPassword] = React.useState<string | undefined>("");
  const [firstName, setFirstName] = React.useState<string | undefined>("");
  const [lastName, setLastName] = React.useState<string | undefined>("");
  const [wantsToJoinMailingList, setWantsToJoinMailingList] = React.useState(
    true
  );

  React.useEffect(() => {
    if (errorMessageProp) {
      setHasError(true);
      setErrorReason(errorMessageProp);
    } else {
      setHasError(false);
      setErrorReason("");
    }
  }, [errorMessageProp]);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "first_name":
        setFirstName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "join_mailing_list":
        setWantsToJoinMailingList(event.target.checked);
        break;
    }

    return event;
  };

  React.useEffect(() => {
    const featuredCities = allCities.filter((el) =>
      citiesFeatured.includes(el.name)
    );
    const citiesSortedByNearness = sortLocations(
      featuredCities,
      currentLocation
    );

    if (citiesSortedByNearness.length > 0) {
      setPickedCity(citiesSortedByNearness[0]);
      setCityOptions(citiesSortedByNearness);
    }
  }, [allCities, citiesFeatured]);

  const toggleShowModal = () => {
    setShowModal((oldValue) => !oldValue);
  };

  const handleSubmit = async () => {
    let data: object;
    let schema: yup.ObjectSchema<any>;

    if (isInProgress) return false;

    switch (authRole) {
      case "Log in":
        data = {
          email,
          password,
        };
        schema = signInValidationSchema;
        break;
      case "Register":
        data = {
          email,
          password,
          firstName,
          lastName,
        };
        schema = signUpValidationSchema;
        break;
      case "Reset password":
        data = { email };
        schema = resetPasswordValidationSchema;
        break;
    }

    try {
      await schema.validate(data);
      setHasError(false);
      setErrorReason("");
    } catch (error: any) {
      setHasError(true);
      setErrorReason(error.message);
      return false;
    }

    try {
      switch (authRole) {
        case "Log in":
          await onLogIn({
            email,
            password,
          });
          break;
        case "Register":
          await onRegister({
            city: pickedCity,
            email,
            name: `${firstName} ${lastName}`,
            password,
            wantsToJoinMailingList,
          });
          break;
        case "Reset password":
          await onForgotPassword({ email });
          break;
      }
    } catch (error: any) {
      setHasError(true);
      setErrorReason(error.message);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPickedCity = cityOptions.find(({ value }) =>
      value.includes(event.target.value)
    );

    if (!newPickedCity) return;

    setPickedCity(newPickedCity);
  };

  const handleAppleResponse = async (...params: any[]) => {
    setHasError(false);
    setErrorReason("");

    try {
      await onAppleResponse(...params);
    } catch (error: any) {
      setHasError(true);
      setErrorReason(error.message);
    }
  };

  const handleFacebookResponse = async (...params: any[]) => {
    setHasError(false);
    setErrorReason("");

    try {
      await onFacebookResponse(...params);
    } catch (error: any) {
      setHasError(true);
      setErrorReason(error.message);
    }
  };

  const handleGoogleAuthSuccess = async (...params: any[]) => {
    setHasError(false);
    setErrorReason("");

    try {
      await onGoogleResponse(...params);
    } catch (error: any) {
      setHasError(true);
      setErrorReason(error.message);
    }
  };

  const handleGoogleAuthFailure = async () => {};

  const changeAuthRole = (newRole: AuthRole) => {
    setAuthRole(newRole);
    setHasError(false);
    setErrorReason("");
  };

  return (
    <div className="auth-dialog">
      <button className="auth-dialog__toggler" onClick={toggleShowModal}>
        Sign In
      </button>
      <Modal isOpen={showModal} onClose={toggleShowModal}>
        <Modal.Header>
          <h2>{authRole}</h2>
        </Modal.Header>
        <Modal.Body>
          {hasError && <div className="auth-dialog__error">{errorReason}</div>}
          {authRole === "Log in" && (
            <form onSubmit={handleSubmit} className="auth-dialog__form">
              <input
                className="auth-dialog__input"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleFormChange}
                value={email}
              />
              <input
                className="auth-dialog__input"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleFormChange}
                value={password}
              />
            </form>
          )}
          {authRole === "Register" && (
            <form onSubmit={handleSubmit} className="auth-dialog__form">
              <div className="auth-dialog__form-group">
                <input
                  className="auth-dialog__input"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  onChange={handleFormChange}
                  value={firstName}
                />
                <input
                  className="auth-dialog__input"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleFormChange}
                  value={lastName}
                />
              </div>
              <input
                className="auth-dialog__input"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFormChange}
                value={email}
              />
              <input
                className="auth-dialog__input"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleFormChange}
                value={password}
              />
              <select
                className="auth-dialog__input"
                name="city"
                onChange={handleCityChange}
                value={pickedCity?.value}
              >
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <label htmlFor="join_mailing_list">
                <input
                  checked={wantsToJoinMailingList}
                  name="join_mailing_list"
                  type="checkbox"
                  onChange={handleFormChange}
                />{" "}
                Join our mailing list
              </label>
            </form>
          )}
          {authRole === "Reset password" && (
            <form onSubmit={handleSubmit} className="auth-dialog__form">
              <p>
                Enter your email and we will send the instructions to reset your
                password
              </p>
              <input
                className="auth-dialog__input"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleFormChange}
                value={email}
              />
            </form>
          )}
          <div className="auth-dialog__form-options">
            {authRole === "Log in" ? (
              <>
                <div>
                  Forgot password?{" "}
                  <button
                    className="auth-dialog__form-changer"
                    onClick={() => changeAuthRole("Reset password")}
                  >
                    Reset it
                  </button>
                </div>
                <span>
                  Don't have an account?{" "}
                  <button
                    className="auth-dialog__form-changer"
                    onClick={() => changeAuthRole("Register")}
                  >
                    Sign Up
                  </button>
                </span>
              </>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  className="auth-dialog__form-changer"
                  onClick={() => changeAuthRole("Log in")}
                >
                  Log In
                </button>
              </span>
            )}
          </div>
          <div className="auth-dialog__divider">Or</div>
          <div className="auth-dialog__third-party-container">
            <GoogleLogin
              className="ui button basic fluid"
              // TODO: set from .env
              clientId="139643579800-ulu48465p4dh31ts9l6g3rnvf8vq643o.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={handleGoogleAuthSuccess}
              onFailure={handleGoogleAuthFailure}
              cookiePolicy={"single_host_origin"}
              render={GoogleLoginButton}
              style={googleLoginButtonStyle}
            />
            <FacebookLogin
              // TODO: set from .env
              appId="600240257827625"
              autoLoad={false}
              cssClass="auth-dialog__third-party-auth-button"
              fields="name,email,picture"
              scope="public_profile,user_likes"
              callback={handleFacebookResponse}
              icon={<i className="third-party-auth-icon icon--facebook"></i>}
            />
            <AppleLogin
              callback={handleAppleResponse}
              clientId="com.vibemap.app"
              redirectURI="https://b2e15f115fca.ngrok.io/app/callback"
              render={AppleLoginButton}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={toggleShowModal}
            className="auth-dialog__action-button auth-dialog__action-button--cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isInProgress}
            className="auth-dialog__action-button auth-dialog__action-button--submit"
          >
            {authRole === "Reset password" ? "Request reset" : authRole}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

BaseAuthDialog.defaultProps = {
  errorMessage: null,
  isInProgress: false,
};

export default BaseAuthDialog;
