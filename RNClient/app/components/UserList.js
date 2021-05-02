//List all Users
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, Switch, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import { getUser, addUser, updateUser, deleteUser } from "../actions/user";
import { verifyMail } from "../actions/register";
import UserDetailView from './UserDetailView';

Icon.loadFont();


class UserList extends React.Component {

  constructor(props, context){
	  super(props, context);
	  this.state = {
	    userList: [],
      showUserOverlay: false,
      addUser: false,
      selectedUser:{},
	  }
  }

  componentDidMount(){
  	this.getUser();
  }

  getUser(){
  	this.props.getUser(this.props.user.token).
  	then(() => {
  	  if (this.props.getUsErrorMsg){
  	  	Alert.alert(this.props.getUsErrorMsg);
  	  	return;
  	  }
  	  else if (typeof this.props.userList.users !==  'undefined')
  	  {
  	  	var userArr = this.props.userList.users;
	      this.setState({userList: []}, async() => {      
	        for (var i = 0; i < userArr.length; i++){
            userArr[i].name = userArr[i].name.replace(/%20/g, " ");
	      	  await this.setStateAsync({userList:  [...this.state.userList, userArr[i]] });
	        }    
	        console.log(this.state.userList);
	      });
  	  }
  	});
  }

  addUser = (userData) =>{
    this.props.addUser(userData, this.props.user.token)
    .then(() => {
      if(this.props.addUsEmail !== null){
        this.props.verifyMail(this.props.addUsEmail)
        .then(() => {
          if (this.props.verMailSent){
            Alert.alert('Verification Email sent to user');
          }
          else{
            Alert.alert('Could not send vefification mail, try again');
          }       
        })
      }
      else{
        if(this.props.addUsErrorMsg){
          Alert.alert(this.props.addUsErrorMsg);
        }
        else{
          Alert.alert('User addition could not be done, try again');
        }
        return;
      } 
      this.setState({showUserOverlay:false});
      this.getUser();
    });
    return;
  }

  updateUser = (userData) => {
    //Remove password from data and then update
    if (userData.password) delete userData.password;
    this.props.updateUser(userData, this.props.user.token)
    .then(() => {
      if(this.props.isUsUpdated){
        Alert.alert('User successfully updated');
      }
      else{
        if(this.props.updateUsErrorMsg){
          Alert.alert(this.props.updateUsErrorMsg);
        }
        else{
          Alert.alert('User updation could not be done, try again');
        }
        return;
      } 
      this.setState({showUserOverlay:false});
      this.getUser();
    });
    return;
  }

  deleteUser(userId){
    this.props.deleteUser(userId, this.props.user.token)
    .then(() => {
      if(this.props.isUsDeleted){
        Alert.alert('User successfully deleted');
      }
      else{
        if(this.props.deleteUsErrorMsg){
          Alert.alert(this.props.deleteUsErrorMsg);
        }
        else{
          Alert.alert('User deletion could not be done, try again');
        }
        return;
      } 
      this.setState({showUserOverlay:false});
      this.getUser();
    });
    return;
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render(){
  	return(
    <>
    <Overlay
     isVisible={this.state.showUserOverlay}
     onBackdropPress={() => this.setState({showUserOverlay:false}) }
     overlayStyle={styles.overlayStyle}
    >
    {this.state.addUser ? 
      <UserDetailView submitUserDetails={this.addUser} adminView={true} />
      :
      <UserDetailView userDetails={this.state.selectedUser} submitUserDetails={this.updateUser} adminView={true}/>
    }
    </Overlay>

    <Button
    buttonStyle={styles.gLoginButton}
    icon={
      <Icon
        name="plus"
        size={15}
        color="white"
      />
    }
    title="Add"
    testID={'adduser'}
    onPress={() => this.setState({showUserOverlay: true, addUser: true})}
    />
  	<ScrollView contentContainerStyle={styles.scrollListView} testID="userlistscroll-view">
		<Divider style={styles.smallDivider}/>
		<Text style={styles.loginApartmentText}>Displaying {this.state.userList.length} users</Text>
    
		<Divider style={styles.smallDivider}/>
		{this.state.userList.map((user, k)=>(
		  <Card key={k}>
		  <View style={{flexDirection:"row"}}>
		    <View style={{flex:1}}>
		      <Icon name='user' size={80} color='black' style={{marginLeft:40}}/>
		    </View>
		    <View style={{flex:1}}>
		      <Text style={{fontSize:20}}> {user.name}</Text>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}>{user.email} </Text>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}> Role: {user.role} </Text>
		      <Divider style={styles.smallDivider}/>
		      <View style={{flexDirection:"row"}}>
              <Button
	            buttonStyle={styles.rateButton}
	            icon={
                  <Icon
                    name="edit"
                    size={22}
                    color="white"
                  />
                }
	            title=""
	            onPress={() => this.setState({selectedUser: user,showUserOverlay: true, addUser: false})}
	          />

	          <Button
	            buttonStyle={styles.deleteButton}
	            icon={
                  <Icon
                    name="trash"
                    size={22}
                    color="white"
                  />
                }
              testID={'userdelete' + k}
	            title=""
	            onPress={() => this.deleteUser(user._id)}
	          />
	          
	          </View>
	        </View>
	      </View>
	      </Card>
	    ))}
	  </ScrollView>
    </>
  	)
  }
  


};

const mapDispatchToProps = {
  getUser, 
  addUser, 
  updateUser, 
  deleteUser,
  verifyMail,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userList: state.user.userList,
    addUsEmail: state.user.addUsEmail,
    getUsErrorMsg: state.user.getUsErrorMsg,
    isUsAdded: state.user.isUsAdded,
    addUsErrorMsg: state.user.addUsErrorMsg,
    isUsUpdated: state.user.isUsUpdated,
    updateUsErrorMsg: state.user.updateUsErrorMsg,
    isUsDeleted: state.user.isUsDeleted,
    deleteUsErrorMsg: state.user.deleteUsErrorMsg,
    verMailSent: state.register.verMailSent,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);