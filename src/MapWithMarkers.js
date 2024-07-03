import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import SituationMenu from './SituationMenu';
import { Axios } from 'axios';

const screenWidth = Dimensions.get('window').width;

export default function MapWithMarkers({farmData, repellingData}) {
  const [selectedFarm, setSelectedFarm] = useState(null);

  const handleFarmClick = farm => {
    setSelectedFarm(farm);
  };

  const initialRegion = {
    latitude: 36.970428,
    longitude: 127.929273,
    latitudeDelta: 2.0,
    longitudeDelta: 2.0,
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}>
        {farmData.map((farm, farmIndex) => (
          <React.Fragment key={`farm-${farmIndex}`}>
            {farm.repellentDevice.map((device, deviceIndex) => (
              <Marker
                key={`device-${deviceIndex}`}
                coordinate={{
                  latitude: parseFloat(device.latitude),
                  longitude: parseFloat(device.longitude),
                }}
                title={device.name}>
                {/* 기기 이름과 농장 이름을 함께 표시 */}
                <Callout>
                  <View>
                    <Text style={styles.markerTitle}>{farm.name}</Text>
                    <Text style={styles.markerDescription}>{device.name}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}

            <TouchableOpacity
              onPress={() => handleFarmClick(farm)}
              style={[
                styles.farmNameButton,
                {
                  top: farmIndex * 40, // 상대적인 Y 위치 조절
                },
              ]}>
              <Text style={styles.farmNameText}>{farm.name}</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </MapView>
      {selectedFarm && (
        <SituationMenu
          farmData={farmData}
          selectedFarm={selectedFarm}
          repellingData={repellingData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  farmNameButton: {
    position: 'absolute',
    backgroundColor: 'seagreen',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  farmNameText: {
    fontSize: 15,
    color: 'white',
  },
  markerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  markerDescription: {
    fontSize: 14,
  },
});
