import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const { email: emailIsInvalid, password: passwordIsInvalid } =
    credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Log In</Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
