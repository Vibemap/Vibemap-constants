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
  onAppleResponse: Function;
  onFacebookResponse: Function;
  onGoogleResponse: Function;
  onLogIn: Function;
  onRegister: Function;
  onForgotPassword: Function;
};

function BaseAuthDialog({
  allCities,
  citiesFeatured,
  currentLocation,
  onAppleResponse,
  onFacebookResponse,
  onGoogleResponse,
  onRegister,
  onLogIn,
  onForgotPassword,
}: BaseAuthDialogProps) {
  const [cityOptions, setCityOptions] = React.useState<Array<City>>([]);
  const [pickedCityName, setPickedCityName] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorReason, setErrorReason] = React.useState("");
  const [alreadyHasAccount, setAlreadyHasAccount] = React.useState(true);

  // form values
  const [email, setEmail] = React.useState<string | undefined>("");
  const [password, setPassword] = React.useState<string | undefined>("");
  const [firstName, setFirstName] = React.useState<string | undefined>("");
  const [lastName, setLastName] = React.useState<string | undefined>("");

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
    }
  }

  React.useEffect(() => {
    const featuredCities = allCities.filter((el) =>
      citiesFeatured.includes(el.name)
    );
    const citiesSortedByNearness = sortLocations(
      featuredCities,
      currentLocation
    );

    if (citiesSortedByNearness.length > 0) {
      setPickedCityName(citiesSortedByNearness[0].name);
      setCityOptions(citiesSortedByNearness);
    }
  }, [allCities, citiesFeatured]);

  const toggleShowModal = () => {
    setShowModal((oldValue) => !oldValue);
  };

  const handleSubmit = async () => {
    let data;
    let schema;

    if (alreadyHasAccount) {
      data = {
        email,
        password,
      };
      schema = signInValidationSchema;
    } else {
      data = {
        email,
        password,
        firstName,
        lastName,
      };
      schema = signUpValidationSchema;
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

    if (alreadyHasAccount) {
      // Log in
      try {
        await onLogIn({
          email,
          password,
        });
      } catch (error: any) {
        setHasError(true);
        setErrorReason(error.message);
      }
    } else {
      // Or register
      try {
        await onRegister({
          city: pickedCityName,
          email,
          name: `${firstName} ${lastName}`,
          password,
        });
      } catch (error: any) {
        setHasError(true);
        setErrorReason(error.message);
      }
    }
  };

  const handleCityChange = (_e: any, { value }: any) => {
    const newPickedCity = cityOptions.find((o) => o.value.includes(value));

    if (!newPickedCity) return;

    setPickedCityName(newPickedCity.name);
  };

  const handleAppleResponse = async (...params : any[]) => {
    setHasError(false)
    setErrorReason("")

    try {
      await onAppleResponse(...params)
    } catch (error : any) {
      setHasError(true)
      setErrorReason(error.message)
    }
  }

  const handleFacebookResponse = async (...params : any[]) => {
    setHasError(false)
    setErrorReason("")

    try {
      await onFacebookResponse(...params)
    } catch (error : any) {
      setHasError(true)
      setErrorReason(error.message)
    }
  }

  const handleGoogleResponse = async (...params : any[]) => {
    setHasError(false)
    setErrorReason("")

    try {
      await onGoogleResponse(...params)
    } catch (error : any) {
      setHasError(true)
      setErrorReason(error.message)
    }
  }

  const toggleForm = () => {
    setAlreadyHasAccount((oldValue) => !oldValue);
  };

  return (
    <Fragment>
      <Button basic circular icon size="large" onClick={toggleShowModal}>
        <Icon name="user" />
      </Button>
      <Modal
        dimmer="inverted"
        open={showModal}
        closeIcon
        onClose={toggleShowModal}
        size="tiny"
      >
        <Modal.Header>
          <h2>{alreadyHasAccount ? "Log In" : "Sign Up"}</h2>
        </Modal.Header>
        <Modal.Content>
          {hasError && (
            <Message negative>
              <Message.Header>{errorReason}</Message.Header>
            </Message>
          )}
          {alreadyHasAccount ? (
            <Form onSubmit={handleSubmit}>
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
          ) : (
            <Form onSubmit={handleSubmit}>
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
                  size="tiny"
                  label="Join our mailing list"
                />
              </Form.Group>
            </Form>
          )}
          <Container style={{ paddingTop: "1rem" }}>
            {alreadyHasAccount && (
              <div>
                Forgot password?
                <a onClick={() => onForgotPassword()}>Reset it</a>
              </div>
            )}
            {alreadyHasAccount ? (
              <span>
                Don't have an account? <a onClick={toggleForm}>Sign Up</a>
              </span>
            ) : (
              <span>
                Already have an account? <a onClick={toggleForm}>Log In</a>
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
              onSuccess={handleGoogleResponse}
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
          <Button secondary onClick={handleSubmit}>
            {alreadyHasAccount ? "Log In" : "Sign Up"}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}

export default BaseAuthDialog;
