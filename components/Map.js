/* 
// Adapted by Lyn from:
// From: https://stackoverflow.com/questions/58821736/live-location-tracking-in-react-native-with-expo         
*/

import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const specialLocations = [
{ name: 'Tupelo Point',
coord: {latitude: 42.28929, longitude: -71.30570},
color: 'yellow' },
{ name: 'Paramecium Pond',
coord: {latitude: 42.29476, longitude: -71.30512},
color: 'cyan' },
{ name: 'Paintshop Pond Waterfall',
coord: {latitude: 42.29219, longitude: -71.31515},
color: 'magenta' },
{ name: 'My room',
coord: {latitude: 42.292653, longitude: -71.308447},
color: 'red' },
// Extend this with one of *your* favorite locations!
]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      foregroundPerms: 'unknown',
      rememberedLocations: []
    };
  }

  _getLocationAsync = async () => {
    // watchPositionAsync returns location with lat, long, & more on location change
    this.subscription = await Location.watchPositionAsync(
      // Argument #1: location options
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000 // check for location change every 10 seconds
      },
      // Argument #2: location callback
      newLocation => {
        this.setState({ location: newLocation});
      }
    );
  };

  async componentDidMount() { // Executes after first render     
    const foregroundResponse = await Location.requestForegroundPermissionsAsync();
    this.setState({ foregroundPerms: foregroundResponse });
    if (foregroundResponse.status === "granted") {
      this._getLocationAsync();
    }
  }

  addMarker(){
    var date = new Date(Date.now()).toString();

  }

    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {`foregroundPerms: ${JSON.stringify(this.state.foregroundPerms)}`}
        </Text>
        <Text style={styles.text}>
          {`location: ${JSON.stringify(this.state.location)}`}
        </Text>
        <Button title='Add Marker for current location'
        onPress={() => this.addMarker()}></Button>
        
      {(this.state.location!==null) &&
        <MapView
          initialRegion={
              {latitude: this.state.location.coords.latitude,
               longitude: this.state.location.coords.longitude,
               latitudeDelta: 0.045,
               longitudeDelta: 0.045
              }
          }
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => { this.map = map; }}
          style={{ flex: 1 }}
          > 
          <Marker key="1" // each marker needs a unique key
             coordinate={
               {latitude: this.state.location.coords.latitude,
               longitude: this.state.location.coords.longitude,
               }
             }
             pinColor='green'
           title='This is a long marker title'
          >
          </Marker>
          {
        specialLocations.map( sloc =>
        <Marker key = {sloc.name}
        coordinate={sloc.coord}
       title={sloc.name}
       pinColor={sloc.color}
        >
        </Marker>,)
}
        </MapView>
      }
      </View>
    );
  }
}

// Handy debugging functions                                                                 

/** Show a popup alert dialog with msg and value before returning value */
function alertVal(msg, val) {
  alert(`${msg}:${JSON.stringify(val)}`);
  return val;
}

/** Write msg and value to console.log before returning value */
function logVal(msg, val) {
  console.log(`${msg}:${JSON.stringify(val)}`);
  return val;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 20
    },
    text: {
      padding: 10,
    }
  });