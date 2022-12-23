import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primaryColor,
    marginBottom: 4,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.whiteColor,
    borderRadius: 4,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  inputInvalid: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.dangerColor,
  },
});
