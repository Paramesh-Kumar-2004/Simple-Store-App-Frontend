import React from 'react';
import { TouchableOpacity, Text, Linking, Alert, StyleSheet } from 'react-native';

const CallButton = ({ phoneNumber=0 }) => {
  
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
      <Text style={styles.text}>Call {phoneNumber}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
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
