import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "services/auth/auth.service";
import HomepageStyles from "layouts/visitor/styles";
import Header from "components/visitor/Header";
import Footer from "components/visitor/Footer";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slide,
  Box,
} from "@chakra-ui/react";

const Login = () => {
  const history = useHistory();
  const fadeDuration = 4;
  const [signupSuccessAlert, setSignupSuccessAlert] = useState(false);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [activePanel, setActivePanel] = useState("sign-in");
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(true);
  const switchToSignIn = () => {
    setActivePanel("sign-in");
  };

  const switchToSignUp = () => {
    setActivePanel("sign-up");
  };

  useEffect(() => {
    const isLoggedIn = AuthService.isLoggedIn();
    if (isLoggedIn) {
      history.push("/user/default");
    }
  }, []);

  //Login

  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await AuthService.login(username, password)
      .then((response) => {
        console.log("Login successful:", response);
        history.push("/user/default");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data === "object"
        ) {
          setShowErrors(error.response.data);
          setShowErrorAlert(true);
        } else if (error.response && typeof error.response.data === "string") {
          const fieldErrors = error.response.data.split("\n");

          setShowErrors(fieldErrors);
          setShowErrorAlert(true);
        }
        setIsCollapseOpen(true);
        setTimeout(() => {
          setIsCollapseOpen(false);
        }, fadeDuration * 800);
      });
  };

  //Register
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(
        username,
        email,
        password,
        confirmPassword
      );
      if (response && response.status === 200) {
        if (response && response.data && typeof response.data === "object") {
          setSignupSuccessMessage(response.data);
          setSignupSuccessAlert(true);
        } else if (
          response &&
          response.data &&
          typeof response.data === "string"
        ) {
          const fieldSuccess = response.data.split("\n");
          setSignupSuccessMessage(fieldSuccess);
          setSignupSuccessAlert(true);
        }
      }
      setIsSuccessOpen(true);
      setTimeout(() => {
        setIsSuccessOpen(false);
      }, fadeDuration * 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "object"
      ) {
        setShowErrors(error.response.data);
        setShowErrorAlert(true);
      } else if (error.response && typeof error.response.data === "string") {
        const fieldErrors = error.response.data.split("\n");
        setShowErrors(fieldErrors);
        setShowErrorAlert(true);
      }
      setSignupSuccessAlert(false);
      setIsCollapseOpen(true);
      setTimeout(() => {
        setIsCollapseOpen(false);
      }, fadeDuration * 800);
    }
  };
  return (
    <HomepageStyles>
      <body className="body" style={{ position: "relative" }}>
        <Header />
        <Slide
          direction="top"
          in={isCollapseOpen}
          animateOpacity
          style={{ position: "fixed", zIndex: "9999" }}
        >
          {showErrorAlert && Object.keys(showErrors).length > 0 && (
            <Box p="40px" mt="4" w="30%" margin="auto" padding="auto">
              {Object.entries(showErrors).map(([field, errorMessage]) => (
                <Alert key={field} status="error" mt={4}>
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ))}
            </Box>
          )}
        </Slide>
        <Slide
          direction="top"
          in={isSuccessOpen}
          animateOpacity
          style={{ position: "fixed", zIndex: "9999" }}
        >
          {signupSuccessAlert &&
            Object.keys(signupSuccessMessage).length > 0 && (
              <Box p="40px" mt="4" w="30%" margin="auto" padding="auto">
                {Object.entries(signupSuccessMessage).map(
                  ([field, successMessage]) => (
                    <Alert key={field} status="success" mt={4}>
                      <AlertIcon />
                      <AlertTitle>Sign up successful!</AlertTitle>
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  )
                )}
              </Box>
            )}
        </Slide>
        <div className="visual">
          <div className="visual__shape">
            <svg xmlns="http://www.w3.org/2000/svg" width="938" height="885">
              <defs>
                <linearGradient
                  id="a"
                  x1="40.909%"
                  x2="25.957%"
                  y1=".755%"
                  y2="91.712%"
                >
                  <stop offset="0%" stopColor="#12C48B" />
                  <stop offset="100%" stopColor="#FFF" />
                </linearGradient>
                <linearGradient
                  id="b"
                  x1="31.928%"
                  x2="49.518%"
                  y1="35.898%"
                  y2="98.292%"
                >
                  <stop offset="0%" stopColor="#2b71ad" />
                  <stop offset="100%" stopColor="#422AFB" />
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle
                  cx="440"
                  cy="445"
                  r="439.5"
                  stroke="url(#a)"
                  opacity=".24"
                />
                <path
                  fill="url(#b)"
                  d="M498 880C254.995 880 58 683.005 58 440S254.995 0 498 0s440 196.995 440 440-196.995 440-440 440zm0-317c67.931 0 123-55.069 123-123s-55.069-123-123-123-123 55.069-123 123 55.069 123 123 123z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div
          className={`container_login visual container ${
            activePanel === "sign-up" ? "right-panel-active" : ""
          }`}
        >
          <div className="form-container sign-up-container">
            <form className="formLogin" onSubmit={handleRegister} ref={form}>
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChangeUsername}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              <button className="LoginBtn">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="formLogin" onSubmit={handleLogin} ref={form}>
              <h2>Sign in</h2>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChangeUsername}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <button className="LoginBtn">Sign In</button>
              <Link to="/auth/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </form>
          </div>
          <div className="overlay-container">
            <div
              className={`overlay-login ${
                activePanel === "sign-up" ? "right-panel-active" : ""
              }`}
            >
              <div className="overlay-panel-login overlay-left-login">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn" onClick={switchToSignIn}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel-login overlay-right-login">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" onClick={switchToSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </body>
    </HomepageStyles>
  );
};

export default Login;
