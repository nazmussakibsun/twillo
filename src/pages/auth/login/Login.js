import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import config from "../../../config";
import { connect } from "react-redux";
import { loginUser, receiveToken, doInit } from "../../../actions/auth";
import jwt from "jsonwebtoken";
import { push } from "connected-react-router";
import classnames from "classnames";

// styles
// import UseStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
// logo
import logo from "./Ronas-Network-Official-Logo.png";
import google from "../../images/google.svg";

const styles = (theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 800,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    // boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
});

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    if (!data) return;
    return date < data.exp;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "admin@flatlogic.com",
      password: "password",
      isLoading: false,
      activeTabId: 0,
      error: null,
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      this.props.dispatch(receiveToken(token));
      this.props.dispatch(doInit());
    }
  }

  signUp() {
    this.props.dispatch(push("/register"));
  }

  render() {
    const { classes } = this.props;
    return (
      // <div className="auth-page">

      // </div>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="Logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>VodeVI</Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={this.state.activeTabId}
              onChange={(e, id) => this.setState({ activeTabId: id })}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} id="1" />
              <Tab label="New User" classes={{ root: classes.tab }} id="0" />
            </Tabs>
            {this.state.activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Good Morning, User
                </Typography>
                <Button size="large" className={classes.googleButton}>
                  <img
                    src={google}
                    alt="google"
                    className={classes.googleIcon}
                  />
                  &nbsp;Sign in with Google
                </Button>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>
                    or
                  </Typography>
                  <div className={classes.formDivider} />
                </div>
                <Fade in={this.state.error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={this.state.email}
                  onChange={this.changeEmail}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={this.state.password}
                  onChange={this.changePassword}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {this.state.isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        this.state.email.length === 0 ||
                        this.state.password.length === 0
                      }
                      onClick={this.doLogin}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                  </Button>
                </div>
              </React.Fragment>
            )}
            {this.state.activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Welcome!
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                  Create your account
                </Typography>
                <Fade in={this.state.error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Something is wrong with your login or password :(
                  </Typography>
                </Fade>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  // value={this.state.email}
                  // onChange={e => setNameValue(e.target.value)}
                  margin="normal"
                  placeholder="Full Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={this.state.email}
                  onChange={this.state.changeEmail}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={this.state.password}
                  onChange={this.state.changePassword}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.creatingButtonContainer}>
                  {this.state.isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      onClick={
                        () => loginUser()
                        // userDispatch,
                        // loginValue,
                        // passwordValue,
                        // props.history,
                        // setIsLoading,
                        // setError,
                      }
                      disabled={
                        this.state.email.length === 0 ||
                        this.state.password.length === 0
                        // nameValue.length === 0
                      }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Create your account
                    </Button>
                  )}
                </div>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>
                    or
                  </Typography>
                  <div className={classes.formDivider} />
                </div>
                <Button
                  size="large"
                  className={classnames(
                    classes.googleButton,
                    classes.googleButtonCreating
                  )}
                >
                  <img
                    src={google}
                    alt="google"
                    className={classes.googleIcon}
                  />
                  &nbsp;Sign in with Google
                </Button>
              </React.Fragment>
            )}
          </div>
          <Typography color="primary" className={classes.copyright}>
            © 2014-{new Date().getFullYear()}{" "}
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="https://flatlogic.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Flatlogic
            </a>
            , LLC. All rights reserved.
          </Typography>
        </div>
      </Grid>
      // <h1>{classes}</h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Login)));
