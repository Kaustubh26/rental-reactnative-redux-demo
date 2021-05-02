/**
 * Apartment Details
 */
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, Switch, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';

const config = require("../config");
Geocoder.init(config.G_API_KEY);
Icon.loadFont();

class ApartmentDetailView extends React.Component{
  
  constructor(props, context){
  	super(props, context);
  	this.state = {
      name: '',
      description: '',
      area: 0,
      price: 0,
      realtorId: '',
      rooms: 0,
      location: { 
      	"type": "Point", 
      	"coordinates": [0, 0]
      },
      isRented: false,
      geocodeAddress:'',
      latError: false,
      longError: false
  	}
  }

  componentDidMount(){
  	if(this.props.apartmentDetails){
  	  this.setState({name: this.props.apartmentDetails.name, rooms:  this.props.apartmentDetails.rooms  ,description: this.props.apartmentDetails.description, area: this.props.apartmentDetails.area, price: this.props.apartmentDetails.price, realtorId: this.props.apartmentDetails.realtorId,  location: this.props.apartmentDetails.location, isRented: this.props.apartmentDetails.isRented});
  	}
  	else{
  	  if(this.props.user.role ===  'realtor'){
  	  	this.setState({realtorId: this.props.user.username})
  	  }
  	}
  }

  updateLong(longitude){
  	if (!isNaN(parseFloat(longitude))){
  	  this.state.location.coordinates[1] = parseFloat(longitude);	
  	  this.setState({location: this.state.location, longError: false});
  	}
  	else{
  	  this.setState({longError: true});
  	  return;
  	}
  }

  updateLat(latitude){
  	if (!isNaN(parseFloat(latitude))){
  	  this.state.location.coordinates[0] = latitude;
  	  this.setState({location: this.state.location, latError: false});
  	}
  	else{
  	  this.setState({latError: true});
  	  return;
  	}
  }

  async getGeoCodedLocation(){
  	return new Promise((resolve, reject) => {
  	  Geocoder.from(this.state.geocodeAddress)
	    .then(json => {
	        var location = json.results[0].geometry.location;
	        this.state.location.coordinates[0] =  location["lat"];
	        this.state.location.coordinates[1] =  location["lng"];
	        this.setState({location: this.state.location}, () => {
	           resolve('success');
	        });	        
	    })
	    .catch(error => {
	      console.warn(error);
	      reject(error);
	    });
  	})
  	
  }

  async onSumbit(){
  	//Validate locally
  	if (this.state.description.length <= 0 || this.state.name.length <= 0 || this.state.rooms.length <= 0 || this.state.price.length <= 0 || this.state.area.length <= 0 || this.state.realtorId.length <= 0){
  	  Alert.alert('Please fill in all fields');
  	  return;
  	}
  	if (isNaN(this.state.rooms) || parseInt(this.state.rooms) == 0){
  	  Alert.alert('Enter valid value for Rooms');
  	  return;
  	}
  	if (isNaN(this.state.price) || parseInt(this.state.price) == 0 ){
  	  Alert.alert('Enter valid value for Price');
  	  return;
  	}
  	if (isNaN(this.state.area) || parseInt(this.state.area) == 0){
  	  Alert.alert('Enter valid value for Area');
  	  return;
  	}
  	if (this.state.geocodeAddress !== ''){
  	  var t = await this.getGeoCodedLocation();
  	  if (t !== 'success'){
  	  	Alert.alert('Error in obtaining coordinates from provided location, please input Latitude Longitude directly');
  	  	return;
  	  }
  	}
    else{
      if(this.state.latError || this.state.longError){
        Alert.alert('Latitude Longitude value Error');
        return;
      }
    }
  	
  	var submitData = {
  	  name: this.state.name,
      description: this.state.description,
      area: parseInt(this.state.area),
      price: parseInt(this.state.price),
      realtorId: this.state.realtorId,
      rooms: parseInt(this.state.rooms),
      location: this.state.location,
      isRented: this.state.isRented,
  	}
  	if (this.props.apartmentDetails) {
  	  submitData.id = this.props.apartmentDetails._id;
  	}
  	console.log(submitData);
  	this.props.submitAppartmentDetails(submitData);
  }

  render()
  {
  	return(
  	  <>
      <ScrollView contentContainerStyle={styles.scrollListView} testID="apartmentscroll-view">
	      <Input
	      placeholder='Enter Name...'
        testID={'apartmentname'}
	      defaultValue={this.state.name}
	      onChangeText={(text)=> this.setState({name: text})}
	      label='Name'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Description...'
	      multiline={true}
        testID={'apartmentdescription'}
        numberOfLines={2}
	      defaultValue={this.state.description}
	      onChangeText={(text)=> this.setState({description: text})}
	      label='Description'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Area...'
        testID={'apartmentarea'}
	      defaultValue={this.state.area.toString()}
	      onChangeText={(text)=> this.setState({area: text})}
	      label='Area(sq. yds.)'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Price...'
        testID={'apartmentprice'}
	      defaultValue={this.state.price.toString()}
	      onChangeText={(text)=> this.setState({price: text})}
	      label='Price($)'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Rooms...'
        testID={'apartmentrooms'}
	      defaultValue={this.state.rooms.toString()}
	      onChangeText={(text)=> this.setState({rooms: text})}
	      label='Number of Rooms'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Input
	      placeholder='Enter Realtor Email...'
        testID={'apartmentrealtormail'}
	      defaultValue={this.state.realtorId}
	      onChangeText={(text)=> this.setState({realtorId: text})}
	      label='Realtor Email Address'
	      />
	      <Divider style={styles.smallDivider}/>
	      <Text> Is the Room Rented? </Text>
	      <Switch
		    trackColor={{ false: "#767577", true: "#81b0ff" }}
		    thumbColor={this.state.isRented ? "#f5dd4b" : "#f4f3f4"}
		    ios_backgroundColor="#3e3e3e"
        testID={'apartmentrented'}
		    onValueChange={()=> this.setState({isRented: !this.state.isRented})}
		    value={this.state.isRented}
	      />
	      <Divider style={styles.smallDivider}/>
	      <Text> Enter Location </Text>
	      <View style={{flexDirection:"row"}}>
	        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
		      <Input
		      placeholder='Enter Latitude'
          testID={'apartmentlatitude'}
		      onChangeText={(text)=> this.updateLat(text)}
		      defaultValue={this.state.location.coordinates[0].toString()}
		      label='Latitude'
		      />
		    </View>
		    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
		      <Input
		      placeholder='Enter Longitude'
          testID={'apartmentlongitude'}
		      onChangeText={(text)=> this.updateLong(text)}
		      defaultValue={this.state.location.coordinates[1].toString()}
		      label='Longitude'
		      />
		    </View>
	      </View>
	      <Text> OR Enter Address to Geocode </Text>
	      <Input
	      placeholder='Enter Address...'
        testID={'apartmentgeocodadrs'}
	      onChangeText={(text)=> this.setState({geocodeAddress: text})}
	      label='Address'
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
          testID={'apartmentsubmit'}
	        title="Submit"
	        onPress={() => this.onSumbit()}
	      />
      </ScrollView>
  	  </>
  	);
  }
};

const mapStateToProps = state => {
  return {
  	user: state.auth.user,
  };
 };

export default connect(mapStateToProps, null)(ApartmentDetailView);
