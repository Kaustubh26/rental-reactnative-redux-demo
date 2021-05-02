import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      marginLeft: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      alignSelf: 'center',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      marginLeft: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      alignSelf: 'center',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
});