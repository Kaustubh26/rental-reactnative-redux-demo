/**
 * User Details
 */
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, View, StatusBar, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';

Icon.loadFont();

class UserDetailView extends React.Component{
  
  constructor(props, context){
  	super(props, context);
  	this.state = {
      userEmail: '',
      name: '',
      password: '',
      confirmPassword: '',
      role: '',
      roleItems: [],
  	}
  }

  componentDidMount(){
  	if(this.props.userDetails){
  	  this.setState({name: this.props.userDetails.name, userEmail: this.props.userDetails.email, role: this.props.userDetails.role });
  	}
  	if (!this.props.adminView){
  	  this.setState({roleItems: [
	    { label: 'Client looking to Rent', value: 'client'},
  	    { label: 'Realtor looking to post', value: 'realtor'}
	  ]});
  	}
  	else{
  	  this.setState({roleItems: [
	    { label: 'Client looking to Rent', value: 'client'},
  	    { label: 'Realtor looking to post', value: 'realtor'},
  	    { label: 'Admin', value: 'admin'}
	  ]});
  	}
  }

  updateRole(role){
  	this.setState({role: role});
  }

  onSumbit(){
  	//Validate locally
  	if (!this.props.userDetails)
  	{
  	  if (this.state.password !== this.state.confirmPassword){
  	    Alert.alert('Passwords are not matching');
  	    return;
  	  }
  	  if (this.state.password.length < 6){
  	    Alert.alert(this.state.password.length);
  	    return;
  	  }
  	}

  	if (this.state.userEmail.length <= 0 || this.state.name.length <= 0){
  	  Alert.alert('Please fill in all fields');
  	  return;
  	}
  	console.log(this.state.role);
  	if (this.state.role === ''  || this.state.role === null){
  	  Alert.alert('Please select role');
  	  return;
  	}
  	
  	var submitData = {
  	  email: this.state.userEmail,
  	  name: this.state.name,
  	  role: this.state.role,
  	  password: this.state.password,
  	}
  	if (this.props.userDetails) {
  	  submitData.id = this.props.userDetails._id;
  	}
  	this.props.submitUserDetails(submitData);
  }

  render()
  {
  	return(
  	  <>
      <ScrollView contentContainerStyle={styles.scrollListView}>
	      <Input
	      placeholder='Enter Email...'
	      defaultValue={this.props.userDetails ? this.props.userDetails.email : ''}
	      onChangeText={(text)=> this.setState({userEmail: text})}
	      testID={'useremail'}
	      leftIcon={
	        <Icon
	          name='envelope-square'
	          size={24}
	          color='black'
	        />
	      }
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Name...'
	      defaultValue={this.props.userDetails ? this.props.userDetails.name : ''}
	      onChangeText={(text)=> this.setState({name: text})}
	      testID={'username'}
	      leftIcon={
	        <Icon
	          name='user'
	          size={24}
	          color='black'
	        />
	      }
	      />
	      {!this.props.userDetails ?
	      <>
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter password...'
	      onChangeText={(text)=> this.setState({password: text})}
	      secureTextEntry={true}
	      testID={'userpassword'}
	      leftIcon={
	        <Icon
	          name='unlock-alt'
	          size={24}
	          color='black'
	        />
	      }
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Confirm password...'
	      onChangeText={(text)=> this.setState({confirmPassword: text})}
	      secureTextEntry={true}
	      testID={'userconfirmpassword'}
	      leftIcon={
	        <Icon
	          name='unlock-alt'
	          size={24}
	          color='black'
	        />
	      }
	      />
	      </>
	      : <></>
	      }
	      <Divider style={styles.smallDivider}/>
	      <View style={{flex:1,flexDirection: 'row',justifyContent: 'center'}}>
		    <Text h4 style={styles.loginHeader}>Pick Role:</Text>
		    <Picker
	          accessibilityLabel="picker-ios"
	          selectedValue={this.state.role}
	          style={{height: 50, width: 200, color: 'white', marginTop: -100}}
	          testID={'userrole'}
	          onValueChange={(itemValue, itemIndex) =>
	           this.updateRole(itemValue)
	          }>
	            {this.state.roleItems.map((roleItem, k)=>(
	              <Picker.Item label={roleItem.label} value={roleItem.value} />
	            ))}
	        </Picker>
		  </View>
		   <Divider style={styles.smallDivider}/>
		   <Divider style={styles.Divider}/>
		  <Button
	        buttonStyle={styles.loginButton}
	        testID={'usersubmit'}
	        icon={
	          <Icon
	            name="arrow-right"
	            size={15}
	            color="white"
	          />
	        }
	        title="Submit"
	        onPress={() => this.onSumbit()}
	      />
      </ScrollView>
  	  </>
  	);
  }
};

export default UserDetailView;