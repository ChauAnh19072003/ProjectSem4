import React, {useState, useRef, useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import HomepageStyles from "layouts/visitor/styles";
import Header from "components/visitor/Header";
import Footer from "components/visitor/Footer";
import AuthService from 'services/auth/auth.service';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider
} from "@chakra-ui/react";
import axios from 'axios';

const ResetPassword = () => {
  const history = useHistory();
  const { token } = useParams();
  const form = useRef();
  const [password, setPassword] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidToken, setIsValidToken] = useState(true);
  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    password: "",
  });

  const onChangePassword = (e) =>{
    const password = e.target.value;
    setPassword(password);
    setShowErrorAlert(false);
    setResetPasswordSuccess(false);
  }

  const onChangeConfirmPassword = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setShowErrorAlert(false);
    setResetPasswordSuccess(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Calling resetPassword API");
      await AuthService.resetPassword(token, password);
      setResetPasswordSuccess(true);
    } catch (error) {
        setResetPasswordErrors(error.message || 'Something went wrong!');
    }
    alert('Reset password success. Pleas login!')
    history.push('/auth/signin');
  }

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    if (password && !passwordRegex.test(password)) {
      setResetPasswordErrors({
        password: "Password must contain at least one uppercase letter, one lowercase letter, one digit, at least 8 characters long.",
      });
      setShowErrorAlert(true);
    }else

    if (password !== confirmPassword) {
        setResetPasswordErrors({
        confirmPassword: "Passwords do not match."
      });
      setShowErrorAlert(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`/api/auth/validate-token/${token}`);
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
        console.error("Invalid token:", error.message);
        alert('Token expiry');
        history.push('/auth/signin')
      }
    };

    validateToken();
  }, [token]);
  if (!isValidToken) {
    return <div>Token expired</div>;
  }
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
        className="container_login visual container">
        <div className="form-container reset-password-container">
          <form className="formLogin" onSubmit={handleResetPassword} ref={form}>
            <h2>ResetPassword</h2>
            <Divider orientation='vertical' margin='25px'/>
            {showErrorAlert &&
              Object.values(resetPasswordErrors).map(
                (error, index) =>
                  error && (
                    <Alert key={index} status="error" mt={4}>
                      <AlertIcon />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )
              )}
            {resetPasswordSuccess && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                <AlertTitle>Reset password successful!</AlertTitle>
              </Alert>
            )}
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
            <button className="LoginBtn">Reset</button>
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </body>
  </HomepageStyles>
  )
}

export default ResetPassword