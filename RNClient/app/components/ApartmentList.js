//List all apartments, view on map
import React from 'react';
import { connect } from "react-redux";
import { Alert, SafeAreaView, Image, StyleSheet, ScrollView, Switch, View, StatusBar, Linking } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar, Input, Button, Divider, Text, Overlay, Card } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { getApartment, addApartment, updateApartment, deleteApartment, } from "../actions/apartment";
import MapView, { Marker }  from 'react-native-maps';
import ApartmentDetailView from './ApartmentDetailView';

Icon.loadFont();
const config = require("../config");

class ApartmentList extends React.Component {

  constructor(props, context){
	super(props, context);
	this.state = {
	  apartmentList: [],
	  isEditable: true,
	  filterPrice: '',
	  filterSize: '',
	  filterNoRooms: '',
	  isMapView: false,
	  showMap: false,
	  region: {
	  	latitude: 28.57952,
        longitude: 77.215029,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      },
      markers:[],
      showApartmentOverlay: false,
      addApartment: false,
      selectedApartment:{},
	}
  }

  componentDidMount(){
  	if (this.props.role === 'client'){
  	  this.setState({isEditable: false}, () => {
  	  	this.getApartment();
  	  });
  	}
  	else{
  	  this.getApartment();
  	}
  }

  getApartment(){
  	let filterQuery = {
  	  price: this.state.filterPrice,
  	  rooms: this.state.filterNoRooms,
  	  area: this.state.filterSize,
  	};
  	this.props.getApartment(filterQuery, this.props.user.token).
  	then(() => {
  	  if (this.props.getApErrorMsg){
  	  	Alert.alert(this.props.getApErrorMsg);
  	  	return;
  	  }
  	  else if (typeof this.props.apartmentList.apartments !==  'undefined')
  	  {
  	  	var apartmentArr = this.props.apartmentList.apartments;
	    this.setState({apartmentList: [], markers: []}, async() => {
	      //Calculate minimum and maximum latitutde longitude to display  all points in map
	      let minLatitude = apartmentArr[0].location.coordinates[0], minLongitude = apartmentArr[0].location.coordinates[1],
	      maxLatitude = apartmentArr[0].location.coordinates[0], maxLongitude = apartmentArr[0].location.coordinates[1];
	      for (var i = 0; i < apartmentArr.length; i++){
	      	await this.setStateAsync({apartmentList:  [...this.state.apartmentList, apartmentArr[i]] });
	      	var marker = {
	      	  key: apartmentArr[i]._id,
	      	  coordinate: apartmentArr[i].location.coordinates,
	      	  title: apartmentArr[i].name,
              description: apartmentArr[i].description
	      	};
	      	await this.setStateAsync({markers:  [...this.state.markers, marker] });
	      	if (apartmentArr[i].location.coordinates[0] < minLatitude) minLatitude = apartmentArr[i].location.coordinates[0];
	      	if (apartmentArr[i].location.coordinates[1] < minLongitude) minLongitude = apartmentArr[i].location.coordinates[1];
	      	if (apartmentArr[i].location.coordinates[0] > maxLatitude) maxLatitude = apartmentArr[i].location.coordinates[0];
	      	if (apartmentArr[i].location.coordinates[1] > maxLongitude) maxLongitude = apartmentArr[i].location.coordinates[1];
	      }
	      this.setState({
	      	region: {
		  	  latitude: maxLatitude + 0.01,
	          longitude: maxLongitude + 0.01,
	          latitudeDelta: (maxLatitude - minLatitude) + 0.05,
	          longitudeDelta: (maxLongitude - minLongitude) + 0.05,
	      	}
	      }, () =>  console.log(this.state.region));
	     
	      console.log(this.state.apartmentList);
	    });
  	  }
  	});
  }

  updatePrice(price){
  	this.setState({filterPrice: price}, () => this.getApartment());
  }

  updateRooms(rooms){
  	this.setState({filterNoRooms: rooms}, () => this.getApartment());
  }

  updateArea(area){
  	this.setState({filterSize: area}, () => this.getApartment());
  }

  addApartment = (apartmentData) => {
    //Remove password from data and then update
    this.props.addApartment(apartmentData, this.props.user.token)
    .then(() => {
      if(this.props.isApAdded){
        Alert.alert('Apartment successfully added');
      }
      else{
        if(this.props.addApErrorMsg){
          Alert.alert(this.props.AddApErrorMsg);
        }
        else{
          Alert.alert('Apartment addition could not be done, try again');
        }
        return;
      } 
      //this.setState({showApartmentOverlay:false});
      this.getApartment();
    });
    return;
  }

  updateApartment = (apartmentData) => {
    this.props.updateApartment(apartmentData, this.props.user.token)
    .then(() => {
      if(this.props.isApUpdated){
        Alert.alert('Apartment successfully updated');
      }
      else{
        if(this.props.updateApErrorMsg){
          Alert.alert(this.props.updateApErrorMsg);
        }
        else{
          Alert.alert('Apartment updation could not be done, try again');
        }
        return;
      } 
      //this.setState({showApartmentOverlay:false});
      this.getApartment();
    });
    return;
  }

  deleteApartment(apartmentId){
  	this.props.deleteApartment(apartmentId, this.props.user.token)
    .then(() => {
      if(this.props.isApDeleted){
        Alert.alert('Apartment successfully deleted');
      }
      else{
        if(this.props.deleteApErrorMsg){
          Alert.alert(this.props.deleteApErrorMsg);
        }
        else{
          Alert.alert('Apartment deletion could not be done, try again');
        }
        return;
      } 
      //this.setState({showApartmentOverlay:false});
      this.getApartment();
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
	     isVisible={this.state.showApartmentOverlay}
	     onBackdropPress={() => this.setState({showApartmentOverlay:false}) }
	     overlayStyle={styles.overlayStyle}
	    >
	    {this.state.addApartment ? 
	      <ApartmentDetailView submitAppartmentDetails={this.addApartment} />
	      :
	      <ApartmentDetailView apartmentDetails={this.state.selectedApartment} submitAppartmentDetails={this.updateApartment} />
	    }
	  </Overlay>
	  <Divider style={styles.Divider}/>
      <View style={{flexDirection:"row", zIndex:0}}>
	    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
	      <Picker
          accessibilityLabel="picker-ios"
          selectedValue={this.state.filterNoRooms}
          style={{height: 50, width: 200, color: 'white', marginTop: -200, zIndex:0}}
          testID={'filterapartmentrooms'}
          onValueChange={(itemValue, itemIndex) =>
           this.updateRooms(itemValue)
          }>
            <Picker.Item label="any rooms" value="" />
            <Picker.Item label="0-2 rooms" value="0-2" />
            <Picker.Item label="3 rooms" value="3" />
            <Picker.Item label="4 rooms" value="4" />
            <Picker.Item label="5+ rooms" value="5+" />
        </Picker>
	    </View>
	    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
	      <Picker
          accessibilityLabel="picker-ios"
          selectedValue={this.state.filterPrice}
          style={{height: 50, width: 200, color: 'white', marginTop: -200, zIndex:0}}
          testID={'filterapartmentprice'}
          onValueChange={(itemValue, itemIndex) =>
           this.updatePrice(itemValue)
          }>
            <Picker.Item label="any price" value="" />
            <Picker.Item label="$0-100" value="0-100" />
            <Picker.Item label="$100-200" value="100-200" />
            <Picker.Item label="$200-300" value="200-300" />
            <Picker.Item label="$300+" value="300+" />
        </Picker>      
	    </View>
	    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
	      <Picker
          accessibilityLabel="picker-ios"
          selectedValue={this.state.filterSize}
          style={{height: 50, width: 200, color: 'white', marginTop: -200, zIndex:0}}
          testID={'filterapartmentarea'}
          onValueChange={(itemValue, itemIndex) =>
           this.updateArea(itemValue)
          }>
            <Picker.Item label="any size" value="" />
            <Picker.Item label="0-100 sqyds." value="0-100" />
            <Picker.Item label="100-200 sqyds." value="100-200" />
            <Picker.Item label="200-300 sqyds." value="200-300" />
            <Picker.Item label="300+ sqyds." value="300+" />
        </Picker>
	      
	    </View>
	  </View>
      <Divider style={styles.smallDivider}/>
      <View style={{flexDirection:"row"}}>
        <Text> Display Map </Text>
        <Switch
	      trackColor={{ false: "#767577", true: "#81b0ff" }}
	      thumbColor={this.state.showMap ? "#f5dd4b" : "#f4f3f4"}
	      ios_backgroundColor="#3e3e3e"
	      onValueChange={()=> this.setState({showMap: !this.state.showMap})}
	      value={this.state.showMap}
        />
        {this.props.user.role !== 'client'?  
        <Button
	    buttonStyle={styles.addApButton}
	    icon={
	      <Icon
	        name="plus"
	        size={15}
	        color="white"
	      />
	    }
      testID={'addapartment'}
	    title="Add"
	    onPress={() => this.setState({showApartmentOverlay: true, addApartment: true})}
	    />
	    : <></>
		}
      </View>
      {this.state.showMap?
        <MapView
          style={styles.map}
		  region={this.state.region}
		  onRegionChange={this.onRegionChange}
		>
		  {this.state.markers.map((marker, index) => (
		    <Marker
		      key={index}
		      coordinate={{
		      	latitude: marker.coordinate[0],
		      	longitude: marker.coordinate[1]
		      }}
		      title={marker.title}
		      description={marker.description}
		    />
		  ))}
		</MapView>
      	:
      	<ScrollView contentContainerStyle={styles.scrollListView} testID="apartmentlistscroll-view">
		<Divider style={styles.smallDivider}/>
		<Text style={styles.loginApartmentText}>Displaying {this.state.apartmentList.length} apartments</Text>
		<Divider style={styles.smallDivider}/>
		{this.state.apartmentList.map((apartment, i)=>(
		  <Card key={apartment.id}>
		  <Text style={{fontSize:20}}> Name: {apartment.name}</Text>
		  <View style={{flexDirection:"row"}}>
		    <Avatar size="xlarge" rounded  source={{uri: config.apartment_URI}} containerStyle={styles.loginImage}/>
		    <View style={{flex:1}}>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}> Price: ${apartment.price} </Text>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}> Area: {apartment.area} sq. yds.</Text>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}> Rooms: {apartment.rooms} </Text>
		      <Divider style={styles.smallDivider}/>
		      <Text style={{fontSize:16}}> Realtor Email: {apartment.realtorId} </Text>
		      <Divider style={styles.smallDivider}/>
		    </View>
		  </View> 
		  <View>
	 		<Text style={{fontSize:10}} numberOfLines={3} ellipsizeMode='tail'> Description: {apartment.description} </Text>
		    <Divider style={styles.smallDivider}/>
		    {this.props.user.role !== 'client'?
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
	            onPress={() => this.setState({selectedApartment: apartment,showApartmentOverlay: true, addApartment: false})}
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
              testID={'apartmentdelete' + i}
	            title=""
	            onPress={() => this.deleteApartment(apartment._id)}
	        /> 
	        </View> 
	        : <></>
	        }
	      </View>
	      </Card>
	    ))}
		</ScrollView>
      }
      </>
  	);
  }
}

const mapDispatchToProps = {
  getApartment,
  addApartment,
  updateApartment,
  deleteApartment,
};

const mapStateToProps = state => {
  return {
  	user: state.auth.user,
    apartmentList: state.apartment.apartmentList,
    getApErrorMsg: state.apartment.getApErrorMsg,
    isApAdded: state.apartment.isApAdded,
    addApErrorMsg: state.apartment.addApErrorMsg,
    isApUpdated: state.apartment.isApUpdated,
    updateApErrorMsg: state.apartment.updateApErrorMsg,
    isApDeleted: state.apartment.isApDeleted,
    deleteApErrorMsg: state.apartment.deleteApErrorMsg,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentList);
