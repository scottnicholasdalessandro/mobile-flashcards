import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const SubmitBtn = ({onPress, text, style}) => {
  return (
    <View style={style || styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{textAlign: 'center'}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});

export default SubmitBtn;
