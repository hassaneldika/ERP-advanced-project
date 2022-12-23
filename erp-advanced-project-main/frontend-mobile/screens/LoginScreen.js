import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useContext, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      console.log(err);
      Alert.alert(
        err.response.data.message,
        "Please check your credentials or try again later!"
      );
    }
    setIsAuthenticating(false);
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `https://erp-lamp-api.herokuapp.com/api/login`,
      { email, password }
    );
    if (response.data) {
      const { access_token } = response.data;
      return access_token;
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in" />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
