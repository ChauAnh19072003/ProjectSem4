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
  Slide,
  Box,
} from "@chakra-ui/react";

const ForgotPassword = () => {
  const form = useRef();
  const fadeDuration = 4;
  const [email, setEmail] = useState("");
  const [sendEmailSuccessAlert, setSendEmailSuccessAlert] = useState(false);
  const [sendEmailSuccessMessage, setSendEmailSuccessMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(true);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.forgotPassword(email);
      console.log("Response Message:", response.message);
      if (response && response.status === 200) {
        setSendEmailSuccessAlert(true);
        setSendEmailSuccessMessage(response.message);
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
        setShowErrorMessage(error.response.data);
        setShowErrorAlert(true);
      } else if (error.response && typeof error.response.data === "string") {
        const fieldErrors = error.response.data.split("\n");
        setShowErrorMessage(fieldErrors);
        setShowErrorAlert(true);
      }
      setSendEmailSuccessAlert(false);
      setIsErrorOpen(true);
      setTimeout(() => {
        setIsErrorOpen(false);
      }, fadeDuration * 800);
    }
  };
  return (
    <HomepageStyles>
      <Header />
      <Slide
        direction="top"
        in={isErrorOpen}
        animateOpacity
        style={{ position: "fixed", zIndex: "9999" }}
      >
        {showErrorAlert && Object.keys(showErrorMessage).length > 0 && (
          <Box
            p="40px"
            mt="4"
            w={{ base: "100%", md: "30%" }}
            margin="auto"
            padding="auto"
          >
            {Object.entries(showErrorMessage).map(([field, errorMessage]) => (
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
        {sendEmailSuccessAlert && (
          <Box
            p="40px"
            mt="4"
            w={{ base: "100%", md: "30%" }}
            margin="auto"
            padding="auto"
          >
            <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertTitle>Find email successful!</AlertTitle>
              <AlertDescription>{sendEmailSuccessMessage}</AlertDescription>
            </Alert>
          </Box>
        )}
      </Slide>
      <div className="visual"></div>
      <AuthStyles>
        <div className="container password-reset-form">
          <div className="forms-container">
            <div className="signin-signup">
              <form
                className="sign-in-form"
                onSubmit={handleForgotPassword}
                ref={form}
              >
                <h2 className="title">Find Your Account</h2>
                <p style={{ textAlign: "center" }}>
                  Please enter your email address to search for your account.
                </p>

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
