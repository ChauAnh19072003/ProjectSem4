import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "services/auth/auth.service";
import HomepageStyles from "layouts/visitor/styles";
import AuthStyles from "./AuthStyles";
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
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(true);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
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
        {signupSuccessAlert && Object.keys(signupSuccessMessage).length > 0 && (
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
      <div className="visual"></div>
      <AuthStyles>
        <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              <form
                className="sign-up-form"
                onSubmit={handleRegister}
                ref={form}
              >
                <h2 className="title">Create Account</h2>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                  />
                </div>
                <button className="btn">Sign Up</button>
              </form>
              <form className="sign-in-form" onSubmit={handleLogin} ref={form}>
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                  />
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>
                <button className="btn solid">Sign In</button>
                <Link
                  to="/auth/forgot-password"
                  className="forgot-password-link"
                >
                  Forgot Password?
                </Link>
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>Hello, Friend!</h3>
                <p>Enter your personal details and start journey with us</p>
                <button className="btn transparent" onClick={toggleMode}>
                  Sign up
                </button>
              </div>
              <img src="img/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>Welcome Back!</h3>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="btn transparent" onClick={toggleMode}>
                  Sign in
                </button>
              </div>
              <img src="img/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>
      </AuthStyles>
      <div className="footer">
        <Footer />
      </div>
    </HomepageStyles>
  );
};

export default Login;
