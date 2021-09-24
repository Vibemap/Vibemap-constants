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

import { logIn, oauthLogin } from "../../../utils/auth";
import { sortLocations } from "../../../utils/helpers";

import "./authDialog.scss";

const defaultProps = {
  dimmer: "inverted",
};

type City = {
  name: string,
}

type BaseAuthDialogProps = {
  allCities: Array<City>;
  citiesFeatured: Array<string>;
  currentLocation: any;
  setMessage: Function;
  setShowMessage: Function;
  onClick: Function;
  resetPassword: Function;
} & typeof defaultProps;

type BaseAuthDialogState = {
  city: string;
  cityOptions: Array<any>;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  open: boolean;
  error: Boolean;
  errorReason: string | null;
  resetPassword: Boolean;
  showSignIn: Boolean;
};

class BaseAuthDialog extends React.Component<
  BaseAuthDialogProps,
  BaseAuthDialogState
> {
  constructor(props: BaseAuthDialogProps) {
    super(props);

    this.state = {
      city: "",
      cityOptions: [],
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      open: true,
      error: false,
      errorReason: "",
      resetPassword: false,
      showSignIn: true,
    };
  }

  componentWillMount() {
    const { allCities, citiesFeatured, currentLocation } = this.props;

    const filtered = allCities.filter(function (el) {
      return citiesFeatured.indexOf(el.name) >= 0;
    });
    const ordered_locations = sortLocations(filtered, currentLocation);

    console.log("ordered_locations: ", ordered_locations);

    this.setState({
      city: ordered_locations[0]["name"],
      cityOptions: ordered_locations,
    });
  }

  showModal = (show: boolean | null) => {
    if (show === null) show = true;
    this.setState({ open: show });
  };

  handleChange = (_e: any, { name, value }: any) => {
    // @ts-ignore
    this.setState({ [name]: value });
  };

  responseFacebook = async (response: any) => {
    console.log("Got response from Facebook: ", response);
    const { accessToken } = response;

    // TODO: Handle cancel or missing info
    if (response && accessToken) {
      // @ts-ignore
      const oauthResponse = await oauthLogin({
        provider: "facebook",
        token: accessToken,
      });

      console.log("Got Oauth response ", oauthResponse);
    }
  };

  responseGoogle = (response: any) => {
    console.log(response);
  };

  handleSubmit = async () => {
    const {
      first_name,
      email,
      password,
      resetPassword,
      showSignIn,
    } = this.state;

    const { setMessage, setShowMessage } = this.props;

    // Login
    if (showSignIn) {
      if (resetPassword) console.log("Submitted form: ", email, password);

      // @ts-ignore
      const { response, error } = await logIn({
        email,
        password,
      });

      console.log("Login response ", response, error);

      if (error || response == undefined) {
        console.log("Handle error and message user", error.response.data);
        this.setState({
          error: true,
          errorReason: error.response.data,
        });
      }

      if (response && response.status === 200) {
        this.setState({
          error: false,
          errorReason: null,
          open: false,
        });

        setMessage({
          id: "logged",
          title: "You're signed in",
          type: "success",
          body: "Expore and save places to your vibe.",
        });
        setShowMessage(true);
        console.log("Add this data to the store ", response.data.user);
      }
      // Or register
    } else {
      console.log("Submitted form: ", email, password, first_name);
      // @ts-ignore
      const { response, error } = await api.register({
        email: email,
        //name: first_name + " " + last_name,
        password: password,
      });

      console.log("Register response: ", response, error);

      if (error || response == undefined) {
        this.setState({
          error: true,
          errorReason: error.response.data,
        });
      }
    }
  };

  onClick = () => {
    console.log("Add place: ", this.props);
    this.props.onClick();
    this.showModal(false);
  };

  onCitySelect = (_e: any, { value }: any) => {
    let item = this.state.cityOptions.find((o) => o.value.includes(value));
    this.setState({ city: item.name });
  };

  toggleFrom = () => {
    this.setState((prevState) => ({
      showSignIn: !prevState.showSignIn,
    }));
  };

  render() {
    const { dimmer } = this.props;
    const { cityOptions, error, errorReason, open, showSignIn } = this.state;

    return (
      <Fragment>
        <Button
          basic
          circular
          icon
          size="large"
          onClick={() => this.showModal(true)}
        >
          <Icon name="user" />
        </Button>
        <Modal
          dimmer={dimmer}
          open={open}
          closeIcon
          onClose={() => this.showModal(false)}
          size={"tiny"}
        >
          <Modal.Header>
            <h2>{showSignIn ? "Log In" : "Sign Up"}</h2>
          </Modal.Header>
          <Modal.Content>
            {error && (
              <Message negative>
                <Message.Header>{errorReason}</Message.Header>
              </Message>
            )}
            {showSignIn ? (
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  size="large"
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  size="large"
                  onChange={this.handleChange}
                />
              </Form>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    name="first_name"
                    type="text"
                    size="large"
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    name="last_name"
                    size="large"
                    type="text"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    size="large"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    size="large"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
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
                    onChange={this.onCitySelect}
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
              {showSignIn && (
                <div>
                  <a onClick={() => this.props.resetPassword()}>
                    Forgot password?
                  </a>
                </div>
              )}
              {showSignIn ? (
                <span>
                  Don't have an account?{" "}
                  <a onClick={this.toggleFrom}>Sign Up</a>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <a onClick={this.toggleFrom}>Log In</a>
                </span>
              )}
            </Container>
            <Container className="moreOptions">
              <Divider horizontal>Or</Divider>
              <Button basic fluid>
                <Icon name="google" />
                Continue with Google
              </Button>
              <GoogleLogin
                // TODO: set from .env
                clientId="1053361256278-pkrme3nd7leqhap3jln87f4s39t23noa.apps.googleusercontent.com"
                buttonText="Login"
                //cssClass="ui button basic fluid"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                // TODO: set from .env
                appId="452059128741716"
                autoLoad={false}
                cssClass="ui button basic fluid"
                fields="name,email,picture"
                // TODO: after the app is appoved consdier these additional settings:
                // user_likes
                scope="public_profile,user_likes"
                callback={this.responseFacebook}
                icon={<Icon name="facebook" />}
              />
              <AppleLogin
                clientId="com.vibemap.app"
                redirectURI="https://b2e15f115fca.ngrok.io/app/callback"
              />
            </Container>
          </Modal.Content>
          <Modal.Actions>
            <Button>Cancel</Button>
            <Button secondary onClick={this.handleSubmit}>
              {showSignIn ? "Log In" : "Sign Up"}
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default BaseAuthDialog;
