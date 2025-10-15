import React from 'react';
import { TouchableOpacity, Text, Linking, Alert, StyleSheet } from 'react-native';
import { Phone_Number } from '../Const/Const';

const CallButton = ({ phoneNumber = Phone_Number }) => {

  const handleCall = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Phone number is not provided");
      return;
    }

    let phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Phone call not supported on this device");
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCall}>
      <Text style={styles.text}>Call</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width:"100%",
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CallButton;
