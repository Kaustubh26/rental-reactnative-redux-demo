/**
 * User Registration
 */
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import { register, verifyMail } from "../actions/register";
import UserDetailView from './UserDetailView';

class Register extends React.Component{

  static navigationOptions = {
    title: "Register"
  };

  constructor(props, context){
  	super(props, context);
  }

  registerUser = (data) => {
  	this.props.register(data)
    .then(() => {
      if(this.props.registerEmail !== null){
      	this.props.verifyMail(this.props.registerEmail)
      	.then(() => {
      	  if (this.props.verMailSent){
      	  	Alert.alert('Verification Email sent. Verify your email and continue');
      	    this.props.navigation.navigate('login');
      	  }
      	  else{
      	  	Alert.alert('Could not send vefification mail, try again');
      	  }   	  
      	})
      }
      else{
      	if(this.props.registerErrorMsg){
      	  Alert.alert(this.props.registerErrorMsg);
      	}
      	else{
          Alsert.alert('Registration could not be done, try again');
      	}
      	return;
      }    
    });
    return;
  }

  render(){
  	return(
  	  <>
  	  <View style={styles.userViewContainer}>
  	  <Text h4 style={styles.loginHeader}>Submit all your details</Text>
  	  <Divider style={styles.smallDivider}/>
  	    <UserDetailView submitUserDetails={this.registerUser} />
  	  </View>
  	  </>
  	);
  }
}

const mapDispatchToProps = {
  register,
  verifyMail
};

const mapStateToProps = state => {
  return {
    isRegistered: state.register.isRegistered,
    registerErrorMsg: state.register.registerErrorMsg,
    registerEmail: state.register.registerEmail,
    verMailSent: state.register.verMailSent,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);