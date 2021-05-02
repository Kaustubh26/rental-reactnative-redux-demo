//Navigation Stack

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator}  from 'react-navigation-stack'
import Login from "../components/Login";
import Home from "../components/Home";
import Register from "../components/Register";
import AuthLoading from "../components/AuthLoading";

const AppStack = createStackNavigator({
  login: {
    screen: Login,
  },
  register: {
    screen: Register,
  }
});

const AuthStack  = createStackNavigator({ 
  home: {
  	screen: Home,
  }
});

//const AuthAdminStack

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);