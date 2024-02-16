import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import HomepageStyles from "../layouts/visitor/styles";
import Header from "../components/visitor/Header";
import Footer from "../components/visitor/Footer";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Login = () => {
  const history = useHistory();
  const [signupSuccess, setSignupSuccess] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [activePanel, setActivePanel] = useState("sign-in");

  const switchToSignIn = () => {
    setActivePanel("sign-in");
  };

  const switchToSignUp = () => {
    setActivePanel("sign-up");
  };

  //Login

  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginValidationErrors, setLoginValidationErrors] = useState({
    username: "",
    password: "",
  });
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
    setShowErrorAlert(false);
    setSignupSuccess(false);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setShowErrorAlert(false);
    setSignupSuccess(false);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    setShowErrorAlert(false);
    setSignupSuccess(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginValidationErrors({
        username: !username ? "Username cannot be blank" : "",
        password: !password ? "Password cannot be blank" : "",
      });
      setShowErrorAlert(true);
      return;
    }
    await AuthService.login(username, password)
      .then((response) => {
        console.log("Login successful:", response);
        history.push("/user/default");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setLoginValidationErrors({
            username: "Invalid username or password",
          });
        } else if (error.response.status === 403) {
          setLoginValidationErrors({
            username: "You need to verify your email to login",
          });
        }
        setShowErrorAlert(true);
      });
  };
  useEffect(() => {
    const isLoggedIn = AuthService.isLoggedIn();
  
    if (isLoggedIn) {
      history.push("/user/default");
    }
  }, []);

  //Register
  const [registerValidationErrors, setRegisterValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChangeConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setShowErrorAlert(false);
    setSignupSuccess(false);
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/;
  
    if (password && !passwordRegex.test(password)) {
      setRegisterValidationErrors({
        password: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 8-10 characters long."
      });
      setShowErrorAlert(true);
    }

    if (password !== confirmPassword) {
      setRegisterValidationErrors({
        confirmPassword: "Passwords do not match."
      });
      setShowErrorAlert(true);
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email) {
      setRegisterValidationErrors({
        username: !username ? "Username cannot be blank" : "",
        email: !email ? "Email cannot be blank" : "",
        password: !password ? "Password cannot be blank" : "",
      });
      setShowErrorAlert(true);
      return;
    }

    try {
      await AuthService.register(username, email, password);
      setSignupSuccess(true);
    } catch (error) {
      console.log("Error object:", error);
      if (error.response) {
        const status = error.response.status;
        console.log(error.response.status);
        if (status === 403) {
          setRegisterValidationErrors({
            username: "Username or Email already exists",
            password: !password ? "Password cannot be blank" : "",
          });
        }
      }
      setShowErrorAlert(true);
    }
  };
  return (
    <HomepageStyles>
      <body className="body">
        <Header />
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
              {showErrorAlert &&
                Object.values(registerValidationErrors).map(
                  (error, index) =>
                    error && (
                      <Alert key={index} status="error" mt={4}>
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )
                )}
              {signupSuccess && (
                <Alert status="success" mt={4}>
                  <AlertIcon />
                  <AlertTitle>Sign up successful!</AlertTitle>
                  <AlertDescription>
                    Please check your email to verify your account.
                  </AlertDescription>
                </Alert>
              )}
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
              {showErrorAlert &&
                Object.values(loginValidationErrors).map(
                  (error, index) =>
                    error && (
                      <Alert key={index} status="error" mt={4}>
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )
                )}
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
              <Link to="/auth/forgot-password" className="forgot-password-link">Forgot Password?</Link>
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
