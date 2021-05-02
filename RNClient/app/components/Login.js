/**
 * App Login
 */
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import { login, oauthLogin } from "../actions/auth";

Icon.loadFont();
const config = require("../config");

class Login extends React.Component {

  static navigationOptions = {
    title: "Login"
  };
  
  constructor(props, context){
  	super(props, context);
  	this.state = {
      userName: '',
      password:'',
      isError: false,
      errorMessage: ''
    };
  }

  componentDidMount(){
    //Componenet mount
    this.checkOAuthLogin();
  }

  checkOAuthLogin(){
    //Check if app opened after Oauth Login
    Linking.getInitialURL().then(url => {
      if (url){
        let event = {
          url: url,
        };
        this.handleOpenURL(event);
      }
    });
    Linking.addEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    //Check URL and login to app
    console.log(event);
    let url = event.url;
    if (url && url.indexOf('?jwt=') > -1){
      try{
        let regex = /[?&]([^=#]+)=([^&#]*)/g, params = {}, match;
        while ((match = regex.exec(url))) {
          params[match[1]] = match[2]
          console.log(match[1], match[2])
        }
        const { jwt, role, name } = params;
        this.props.oauthLogin(jwt, role, name)
        .then(() => {
          this.props.navigation.navigate(this.props.isLoggedIn ? 'Auth' : 'App');
        });
      }
      catch(err){
        Alert.alert('Oauth login failed');
      }
    }   
  }

  componentDidUpdate(prevProps, prevState){
    //Check if new error message generated
    if (this.state.errorMessage !== this.props.loginErrorMsg && this.props.loginErrorMsg){
      this.checkError();
    }   
  }

  checkError(){
    //Display Login Error Message
    if (this.props.loginErrorMsg){
      this.setState({isError: true, errorMessage: this.props.loginErrorMsg });
    }
    return;
  }

  signIn(){
    //Validate locally
    if(this.state.userName.length <=  0 || this.state.password.length <=  0){
      this.setState({isError: true, errorMessage: 'Please enter all details' });
      return;
    }
    //login dispatch
    console.log('Call dispatcher');
    this.props.login(this.state.userName, this.state.password)
    .then(() => {
      this.props.navigation.navigate(this.props.isLoggedIn ? 'Auth' : 'App');
    });
    return;
  }
  
  render(){
  	return(
  	<>
  	<View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <Image source={require('../res/images/toptal-logo.png')} style={styles.loginToptalLogo} />
      </View>
      <Text h3 style={styles.loginHeader}>Apartment Rental App</Text>
      <Divider style={styles.smallDivider}/>
      {this.state.isError ?
        <Text h4 style={styles.errorText}>{this.state.errorMessage}</Text>     
        :
        <Text h4 style={styles.loginText}>Enter login details </Text>
      }
      <Input
      placeholder='Enter Email...'
      onChangeText={(text)=> this.setState({userName: text})}
      testID={'email'}
      leftIcon={
        <Icon
          name='user'
          size={24}
          color='black'
        />
      }
      />
      <Input
      placeholder='Enter password...'
      onChangeText={(text)=> this.setState({password: text})}
      secureTextEntry={true}
      testID={'password'}
      leftIcon={
        <Icon
          name='unlock-alt'
          size={24}
          color='black'
        />
      }
      />
      <Button
        buttonStyle={styles.loginButton}
        icon={
          <Icon
            name="arrow-right"
            size={15}
            color="white"
          />
        }
        testID={'login'}
        title="Login"
        onPress={() => this.signIn()}
      />
      <Text testID={'register'} style={styles.signUpText} onPress={() => this.props.navigation.navigate('register')}>
        {'\n'} Not registered? Sign up now.
      </Text>
      <Divider style={styles.smallDivider}/>
      <View style={{flexDirection:"row"}}>
      <Button
        buttonStyle={styles.gLoginButton}
        icon={
          <Icon
            name="google"
            size={15}
            color="white"
          />
        }
        title="Login"
        onPress={() => Linking.openURL(config.API_URL + '/users/auth/google/')}
      />
      <Button
        buttonStyle={styles.lLoginButton}
        icon={
          <Icon
            name="linkedin"
            size={15}
            color="white"
          />
        }
        title="Login"
        onPress={() => Linking.openURL(config.API_URL + '/users/auth/linkedin/')}
      />
      </View>
      <Divider style={styles.smallDivider}/>
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri: config.apartment_URI,
        }}
        containerStyle={styles.loginImage}
      />
    </View>
    </>
    );
  }
};

const mapDispatchToProps = {
  login,
  oauthLogin
};

const mapStateToProps = state => {
  return {
    loginErrorMsg: state.auth.loginErrorMsg,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
