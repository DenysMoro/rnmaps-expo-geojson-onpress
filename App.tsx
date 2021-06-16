import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import RNM, { Geojson, MapEvent, Marker } from 'react-native-maps'

const newGeoJson = require('./field_790470_1.json')
const initialCoords = {
  latitude: 33.61099089454942,longitude: -90.79735743461134
}

export default function App() {
  const mapRef = useRef<RNM>(null)

  useEffect(() => {
    mapRef.current?.setCamera({ center: initialCoords });
  }, [])

  return (
    <View style={styles.container}>
      <RNM
        ref={mapRef}
        provider="google"
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        }}
      >
        <Geojson
          geojson={newGeoJson}
          fillColor="transparent"
          strokeColor="#27c7be"
          strokeWidth={2}
          onPress={(test) => console.log(test)}
        />
      </RNM>
    </View>
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
  }
});
