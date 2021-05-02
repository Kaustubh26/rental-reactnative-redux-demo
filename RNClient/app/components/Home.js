//Home Page after login
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import { logout } from "../actions/auth";
import ApartmentList from "../components/ApartmentList";
import UserList from "../components/UserList";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//Create Tabs for admin - Can be moved to navigation/index.js, declared here to accomodate within home view
const TabScreens = createAppContainer(createBottomTabNavigator({
  apartments: {
     screen: ApartmentList,
  },
  users: {
    screen: UserList,
  }
  },
  {
    initialRouteName: 'apartments'
  }
));

Icon.loadFont();

class Home extends React.Component {
  
  static navigationOptions = {
    title: "Home"
  };
  
  constructor(props, context){
  	super(props, context);
    this.state = {};
  }

  logOut(){
    this.props.logout().then(() => {
      this.props.navigation.navigate(this.props.isLoggedIn ? 'Auth' : 'App');
    });
  }

  render(){
  	return(
  	<>
      <View style={styles.userViewContainer} testID="home-view">
        <Text h4 style={styles.loginHeader}>Apartment Rentals Home</Text>
        <Divider style={styles.smallDivider}/>
        <View style={{flexDirection:"row"}}>
          <View style={{flex:1,flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Icon name='user' size={24} color='black'/>
            <Text style={{fontSize:16}}> Welcome {this.props.user ? this.props.user.name : ''},  </Text>
          </View>
          <View style={{flex:1,flexDirection: 'row', justifyContent: 'flex-end', zIndex: 10}}>
            <Icon testID={'logout'} name='power-off' size={24} color='black' onPress={() => this.logOut()}/>
          </View>
        </View>
        <Divider style={styles.smallDivider}/>
        {this.props.user?
          <>
          {this.props.user.role  === 'admin'?
            <TabScreens/>
            :
            <ApartmentList/>
          }
          </>
          :
          <></>
        }
      </View>
  	</>
  	);
  }
}

const mapDispatchToProps = {
  logout
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);