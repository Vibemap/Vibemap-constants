import React, { Fragment } from "react";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";

import {
  Button,
  Checkbox,
  Container,
  Divider,
  Dropdown,
  Form,
  Icon,
  Message,
  Modal,
} from "semantic-ui-react";

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
  <Button type="button" basic fluid {...props}>
    <Icon name="google" />
    Login with Google
  </Button>
);

const AppleLoginButton = (props: object) => {
  console.log(props);
  return (
    <Button type="button" basic fluid {...props}>
      <Icon name="apple" />
      Login with Apple
    </Button>
  );
};

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
  const [
    wantsToJoinMailingList,
    setWantsToJoinMailingList,
  ] = React.useState<number>(1);

  React.useEffect(() => {
    if (errorMessageProp) {
      setHasError(true);
      setErrorReason(errorMessageProp);
    } else {
      setHasError(false);
      setErrorReason("");
    }
  }, [errorMessageProp]);

  const handleFormChange = (_nativeEvent: any, customEvent: any) => {
    const { name, value } = customEvent;

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
        setWantsToJoinMailingList(customEvent.checked);
        break;
    }
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
    };
  };

  const handleCityChange = (_e: any, { value }: any) => {
    const newPickedCity = cityOptions.find((o) => o.value.includes(value));

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
    console.log("Google Auth Success");
    console.log(params);

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
    <Fragment>
      <Button circular basic size="large" onClick={toggleShowModal}>
        Sign In
      </Button>
      <Modal
        dimmer="inverted"
        open={showModal}
        closeIcon
        onClose={toggleShowModal}
        size="tiny"
      >
        <Modal.Header>
          <h2>{authRole}</h2>
        </Modal.Header>
        <Modal.Content>
          {hasError && (
            <Message negative>
              <Message.Header>{errorReason}</Message.Header>
            </Message>
          )}
          {authRole === "Log in" && (
            <Form onSubmit={handleSubmit} loading={isInProgress}>
              <Form.Input
                name="email"
                placeholder="Email"
                type="email"
                size="large"
                onChange={handleFormChange}
                value={email}
              />
              <Form.Input
                name="password"
                placeholder="Password"
                type="password"
                size="large"
                onChange={handleFormChange}
                value={password}
              />
            </Form>
          )}
          {authRole === "Register" && (
            <Form onSubmit={handleSubmit} loading={isInProgress}>
              <Form.Group widths="equal">
                <Form.Input
                  name="first_name"
                  type="text"
                  size="large"
                  placeholder="First Name"
                  onChange={handleFormChange}
                  value={firstName}
                />
                <Form.Input
                  name="last_name"
                  size="large"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleFormChange}
                  value={lastName}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  size="large"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleFormChange}
                  value={email}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleFormChange}
                  value={password}
                />
              </Form.Group>
              <Form.Group>
                <Dropdown
                  fluid
                  labeled
                  compact
                  floating
                  selection
                  defaultValue={cityOptions[0].value}
                  onChange={handleCityChange}
                  options={cityOptions}
                />
              </Form.Group>
              <Form.Group>
                <Checkbox
                  toggle
                  defaultChecked
                  name="join_mailing_list"
                  size="tiny"
                  label="Join our mailing list"
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Form>
          )}
          {authRole === "Reset password" && (
            <Form onSubmit={handleSubmit} loading={isInProgress}>
              <p>
                Enter your email and we will send the instructions to reset your password
              </p>
              <Form.Group widths="equal">
                <Form.Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  size="large"
                  onChange={handleFormChange}
                  value={email}
                />
              </Form.Group>
            </Form>
          )}
          <Container style={{ paddingTop: "1rem" }}>
            {authRole === "Log in" ? (
              <>
                <div>
                  Forgot password? <a onClick={() => changeAuthRole("Reset password")}>Reset it</a>
                </div>
                <span>
                  Don't have an account? <a onClick={() => changeAuthRole('Register')}>Sign Up</a>
                </span>
              </>
            ) : (
              <span>
                Already have an account? <a onClick={() => changeAuthRole('Log in')}>Log In</a>
              </span>
            )}
          </Container>
          <Container className="moreOptions">
            <Divider horizontal>Or</Divider>
            <GoogleLogin
              className="ui button basic fluid"
              // TODO: set from .env
              clientId="1053361256278-pkrme3nd7leqhap3jln87f4s39t23noa.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={handleGoogleAuthSuccess}
              onFailure={handleGoogleAuthFailure}
              cookiePolicy={"single_host_origin"}
              render={GoogleLoginButton}
              style={googleLoginButtonStyle}
            />
            <FacebookLogin
              // TODO: set from .env
              appId="452059128741716"
              autoLoad={false}
              cssClass="ui button basic fluid"
              fields="name,email,picture"
              scope="public_profile,user_likes"
              callback={handleFacebookResponse}
              icon={<Icon name="facebook" />}
            />
            <AppleLogin
              callback={handleAppleResponse}
              clientId="com.vibemap.app"
              redirectURI="https://b2e15f115fca.ngrok.io/app/callback"
              render={AppleLoginButton}
            />
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={toggleShowModal}>Cancel</Button>
          <Button
            secondary
            onClick={handleSubmit}
            disabled={isInProgress}
            loading={isInProgress}
          >
            {authRole === "Reset password" ? "Request reset" : authRole}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}

BaseAuthDialog.defaultProps = {
  errorMessage: null,
  isInProgress: false,
};

export default BaseAuthDialog;
