import React, { useCallback, useRef, useState } from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import RNM, { Geojson } from 'react-native-maps'

const newGeoJson = require('./field.json')
const initialRegion = {
  "latitude": 42.027114758,
  "latitudeDelta": 0.0007,
  "longitude": -83.635308678,
  "longitudeDelta": 27.70935960591133,
}
const fitToCoords = [
  {
    "latitude": 42.019622817,
    "longitude": -83.635308678,
  },
  {
    "latitude": 42.027114758,
    "longitude": -83.628828461,
  },
]
const fitToCoordsOptions = {
  "animated": true,
  "edgePadding": {
  "bottom": 15,
    "left": 15,
    "right": 15,
    "top": 15,
  },
}

export default function App() {
  const [clickCounter, setClickCounter] = useState(0)
  const [geoJSONClickCounter, setGeoJSONClickCounter] = useState(0)
  const mapRef = useRef<RNM>(null)

  const onMapPress = useCallback(() => {
    setClickCounter((prevState) => prevState + 1)
  }, [])

  const onGeoJSONPress = useCallback((data) => {
    setGeoJSONClickCounter((prevState) => prevState + 1)
  }, [])

  const onMapReady = useCallback(() => {
    mapRef.current?.fitToCoordinates(fitToCoords, fitToCoordsOptions);
  }, [])

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <RNM
          ref={mapRef}
          provider="google"
          showsCompass
          showsScale
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          style={styles.map}
          initialRegion={initialRegion}
          mapType="satellite"
          onPress={onMapPress}
          onMapReady={onMapReady}
        >
          <Geojson
            tappable
            geojson={newGeoJson}
            fillColor="transparent"
            strokeColor="#27c7be"
            strokeWidth={2}
            onPress={onGeoJSONPress}
          />
        </RNM>
      </View>
      <View style={styles.footer}>
        <View style={styles.textContainer}>
          <Text>Total clicks: </Text>
          <Text>{clickCounter}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>GeoJSON clicks: </Text>
          <Text>{geoJSONClickCounter}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const {
  width: dimensionsWindowWidth,
  height: dimensionsWindowHeight,
} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: dimensionsWindowHeight,
    width: dimensionsWindowWidth,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textContainer: {
    flexDirection: "row",
  }
});
