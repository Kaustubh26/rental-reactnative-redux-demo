import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Header, LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  map: {
    position: 'absolute',
    right: 0,
    top: 280,
    left: 0,
    bottom: 0,
  },
  mapAdmin: {
    position: 'absolute',
    right: 0,
    top: 150,
    left: 0,
    bottom: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  loginContainer: {
    paddingTop: 100,
    height:'100%', 
    width:'100%',
    paddingHorizontal: 24,
    backgroundColor: '#ebeced',
    zIndex: -10,
  },
  loginHeader:{
    textAlign: 'center',
    color: '#262d3e',
    fontWeight: '900',
  },
  overlayHeader:{
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
  loginButton:{
    backgroundColor: '#262d3e',
    marginTop: 10,
  },
  gLoginButton:{
    backgroundColor: '#33a854',
    marginTop: 10,
    marginRight: 10
  },
  addApButton:{
    backgroundColor: '#33a854',
    marginLeft: 100,
    alignSelf: 'flex-end',
  },
  lLoginButton:{
    backgroundColor: '#0b66c2',
    marginTop: 10,
    marginLeft: 10
  },
  rateButton:{
    backgroundColor: '#1849d6',
    marginTop: 10,
    marginLeft: 5,
  },
  deleteButton:{
    backgroundColor: '#fe1709',
    marginTop: 10,
    marginLeft: 5,
  },
  reserveButton:{
    backgroundColor: '#009788',
    marginTop: 10,
    marginLeft: 2,
  },
  reserveCancelButton:{
    backgroundColor: '#fe1709',
    marginTop: 10,
    marginLeft: 2,
  },
  unavailableBadge:{
    marginTop: 20,
    marginLeft: 2,
    padding:5,
    height: 30,
  },
  unavailableText:{
    color: 'white',
    fontSize: 16,
  },
  logoContainer:{
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginToptalLogo:{
    height:80,
    resizeMode: 'contain',
  },
  loginText:{
  	alignSelf: 'stretch',
  },
  errorText:{
    alignSelf: 'stretch',
    color: 'red',
  },
  loginApartmentText:{
  	alignSelf: 'center',
  	fontSize: 20,
  },
  loginImage:{
  	alignSelf: 'center',
  },
  Divider:{
  	backgroundColor: 'transparent',
  	height: 100,
  },
  smallDivider:{
    backgroundColor: 'transparent',
    height: 20,
  },
  signUpText:{
    color: '#1849d6', 
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  userViewContainer: {
    paddingTop: 10,
    height:'100%', 
    width:'100%',
    paddingHorizontal: 10,
    backgroundColor: '#ebeced',
    zIndex: -10,
  },
  toptalLogo:{
    height:30,
    width:100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  userFilterView: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#1849d6',
  },
  filterTextLeft:{
    color: '#ffffff', 
    fontSize: 18,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  filterTextRight:{
    color: '#ffffff', 
    fontSize: 18,
    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  ratingView:{
    position: 'absolute',
    top: 1,
    right: 1,
    flexDirection:"row",
  },
  scrollListView:{
    textAlign: 'center',
  },
  overlayStyle: {
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  addButton: {
    marginLeft: 20,
    marginRight: 20,
  }
});