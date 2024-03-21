import React, { useState, useRef } from "react";
import HomepageStyles from "layouts/visitor/styles";
import Header from "components/visitor/Header";
import Footer from "components/visitor/Footer";
import AuthService from "services/auth/auth.service";
import AuthStyles from "./AuthStyles";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const ForgotPassword = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [sendEmailSuccess, setSendEmailSuccess] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [emailSendValidationErrors, setEmailSendValidationErrors] = useState({
    email: "",
  });

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    setShowErrorAlert(false);
    setSendEmailSuccess(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthService.forgotPassword(email);
      setSendEmailSuccess(true);
    } catch (error) {
      setEmailSendValidationErrors(error.message || "Something went wrong!");
      if (error.response.status === 403) {
        setEmailSendValidationErrors({ email: "Email not found" });
      }
      setShowErrorAlert(true);
    }
  };
  return (
    <HomepageStyles>
      <Header />
      <div className="visual"></div>
      <AuthStyles>
        <div className="container password-reset-form">
          <div className="forms-container">
            <div className="signin-signup">
              <form className="sign-in-form" onSubmit={handleForgotPassword} ref={form}>
                <h2 className="title">Find Your Account</h2>
                <p style={{textAlign:'center'}}>
                  Please enter your email address to search for your account.
                </p>
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
                <div className="input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>
                <button className="btn">Search</button>
              </form>
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

export default ForgotPassword;
