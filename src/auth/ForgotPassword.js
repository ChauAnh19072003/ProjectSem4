import React, {useState, useRef} from 'react'
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

const ForgotPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [sendEmailSuccess, setSendEmailSuccess] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [emailSendValidationErrors, setEmailSendValidationErrors] = useState({
    email: "",
  });

  const onChangeEmail = (e) =>{
    const email = e.target.value;
    setEmail(email);
    setShowErrorAlert(false);
    setSendEmailSuccess(false);
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthService.forgotPassword(email);
      setSendEmailSuccess(true);
    } catch (error) {
      setEmailSendValidationErrors(error.message || 'Something went wrong!');
      if(error.response.status === 403){
        setEmailSendValidationErrors({email: "Email not found"});
      }
      setShowErrorAlert(true);
    }
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
        <div className="form-container forgot-password-container">
          <form className="formLogin" onSubmit={handleForgotPassword} ref={form}>
            <h2>Find Your Account</h2>
            <Divider orientation='vertical' margin='25px'/>
            <p>Please enter your email address to search for your account.</p>
            {showErrorAlert &&
              Object.values(emailSendValidationErrors).map(
                (error, index) =>
                  error && (
                    <Alert key={index} status="error" mt={4}>
                      <AlertIcon />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )
              )}
            {sendEmailSuccess && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                <AlertTitle>Find email successful!</AlertTitle>
                <AlertDescription>
                  Please check your email to reset your password.
                </AlertDescription>
              </Alert>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
            <button className="LoginBtn">Search</button>
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

export default ForgotPassword