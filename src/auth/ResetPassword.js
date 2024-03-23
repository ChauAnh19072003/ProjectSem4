import React, { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  Divider,
  Slide,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const ResetPassword = () => {
  const history = useHistory();
  const { token } = useParams();
  const form = useRef();
  const fadeDuration = 4;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordSuccessAlert, setResetPasswordSuccessAlert] =
    useState(false);
  const [resetPasswordSuccessMessage, setResetPasswordSuccessMessage] =
    useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState({});
  const [isValidToken, setIsValidToken] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Calling resetPassword API");
      const response = await AuthService.resetPassword(token, password, confirmPassword);
      if (response && response.status === 200) {
        if (response && response.data && typeof response.data === "object") {
          setResetPasswordSuccessMessage(response.data);
          setResetPasswordSuccessAlert(true);
        } else if (
          response &&
          response.data &&
          typeof response.data === "string"
        ) {
          const fieldSuccess = response.data.split("\n");
          setResetPasswordSuccessMessage(fieldSuccess);
          setResetPasswordSuccessAlert(true);
        }
      }
      setIsSuccessOpen(true);
      // history.push("/auth/signin");
      setTimeout(() => {
        setIsSuccessOpen(false);
      }, fadeDuration * 1000);
      setIsSuccessOpen(true);
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
      setResetPasswordSuccessAlert(false);
      setIsErrorOpen(true);
      setTimeout(() => {
        setIsErrorOpen(false);
      }, fadeDuration * 800);
    }
  };
  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       await axios.get(`/api/auth/validate-token/${token}`);
  //       setIsValidToken(true);
  //     } catch (error) {
  //       setIsValidToken(false);
  //       console.error("Invalid token:", error.message);
  //       alert("Token expiry");
  //       history.push("/auth/signin");
  //     }
  //   };

  //   validateToken();
  // }, [token]);
  // if (!isValidToken) {
  //   return <div>Token expired</div>;
  // }
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
        {resetPasswordSuccessAlert &&
          Object.keys(resetPasswordSuccessMessage).length > 0 && (
            <Box
              p="40px"
              mt="4"
              w={{ base: "100%", md: "30%" }}
              margin="auto"
              padding="auto"
            >
              {Object.entries(resetPasswordSuccessMessage).map(
                ([field, successMessage]) => (
                  <Alert key={field} status="success" mt={4}>
                    <AlertIcon />
                    <AlertTitle>Reset password successful!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )
              )}
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
                onSubmit={handleResetPassword}
                ref={form}
              >
                <h2>Reset Password</h2>
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
                <button className="btn">Reset</button>
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

export default ResetPassword;
