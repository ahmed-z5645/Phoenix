import React, { useState } from 'react';
import { View, StyleSheet, Alert, Clipboard } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import HelpRequestDetailsCard from '../components/HelpRequestDetailsCard';
import NewRequestButton from '../components/NewRequestButton';
import NewRequestModal from '../components/NewRequestModal';
import UserProfileStrip from '../components/UserProfileStrip';
import HelperInfoModal, { HelperInfo } from '../components/HelperInfoModal';
import JSONDisplayModal from '../components/JSONDisplayModal';

export interface HelpRequest {
  id: string;
  userName: string;
  age: number;
  severity: 'critical' | 'urgent' | 'low';
  type: 'medical' | 'evacuation' | 'food' | 'shelter' | 'other';
  description: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
}

export interface User {
  id: string;
  name: string;
  age: number;
  status: string;
}

const DisasterMapScreen: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([
    {
      id: '1',
      userName: 'Sarah M.',
      age: 34,
      severity: 'critical',
      type: 'medical',
      description: 'Need immediate medical assistance. Elderly person with breathing difficulties.',
      latitude: 37.78825,
      longitude: -122.4324,
      distanceKm: 0.5,
    },
    {
      id: '2',
      userName: 'John D.',
      age: 28,
      severity: 'urgent',
      type: 'evacuation',
      description: 'Stuck in flooded area. Need help getting to higher ground.',
      latitude: 37.78925,
      longitude: -122.4334,
      distanceKm: 1.2,
    },
    {
      id: '3',
      userName: 'Maria L.',
      age: 45,
      severity: 'low',
      type: 'food',
      description: 'Running low on food supplies. Could use some non-perishable items.',
      latitude: 37.78725,
      longitude: -122.4314,
      distanceKm: 0.8,
    },
    {
      id: '4',
      userName: 'Tom K.',
      age: 52,
      severity: 'urgent',
      type: 'shelter',
      description: 'Home damaged. Need temporary shelter for family of 4.',
      latitude: 37.79025,
      longitude: -122.4344,
      distanceKm: 1.5,
    },
    {
      id: '5',
      userName: 'Lisa P.',
      age: 31,
      severity: 'low',
      type: 'other',
      description: 'Need help moving furniture to second floor before water rises.',
      latitude: 37.78625,
      longitude: -122.4304,
      distanceKm: 0.3,
    },
  ]);

  const currentUser: User = {
    id: 'current',
    name: 'Alex R.',
    age: 29,
    status: 'Available to help',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelperModalVisible, setIsHelperModalVisible] = useState(false);
  const [isJSONModalVisible, setIsJSONModalVisible] = useState(false);
  const [currentJSONData, setCurrentJSONData] = useState('');
  const [selectedRequestForHelp, setSelectedRequestForHelp] = useState<HelpRequest | null>(null);
  const [helperDataList, setHelperDataList] = useState<HelperInfo[]>([]);
  const [initialRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [userLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#FF0000';
      case 'urgent':
        return '#FF8800';
      case 'low':
        return '#FFD700';
      default:
        return '#808080';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'medical':
        return 'Medical';
      case 'evacuation':
        return 'Evacuation';
      case 'food':
        return 'Food/Water';
      case 'shelter':
        return 'Shelter';
      case 'other':
        return 'Other';
      default:
        return type;
    }
  };

  const handleMarkerPress = (request: HelpRequest) => {
    setSelectedRequest(request);
  };

  const handleCloseCard = () => {
    setSelectedRequest(null);
  };

  const handleHelpPress = (request: HelpRequest) => {
    // Store the request and show the helper info modal
    setSelectedRequestForHelp(request);
    setIsHelperModalVisible(true);
  };

  const handleHelperInfoSubmit = (helperData: HelperInfo) => {
    // Store the helper data as JSON
    const helperDataJSON = JSON.stringify(helperData, null, 2);
    console.log('Helper Data (JSON):', helperDataJSON);
    
    // Add to the list of helpers
    const updatedList = [...helperDataList, helperData];
    setHelperDataList(updatedList);
    
    // Set the JSON data and show the JSON modal
    setCurrentJSONData(helperDataJSON);
    setIsHelperModalVisible(false);
    setIsJSONModalVisible(true);
    
    // Close the help request card
    setSelectedRequest(null);
    setSelectedRequestForHelp(null);
  };

  const handleCopyJSON = () => {
    Clipboard.setString(currentJSONData);
    Alert.alert('Copied!', 'JSON data has been copied to clipboard. You can now paste it in messages.');
  };

  const getLocationString = (request: HelpRequest): string => {
    return `${request.latitude.toFixed(6)}, ${request.longitude.toFixed(6)}`;
  };

  const handleNewRequestSubmit = (formData: {
    severity: 'critical' | 'urgent' | 'low';
    type: 'medical' | 'evacuation' | 'food' | 'shelter' | 'other';
    description: string;
    shareExactLocation: boolean;
  }) => {
    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      userName: currentUser.name,
      age: currentUser.age,
      severity: formData.severity,
      type: formData.type,
      description: formData.description,
      latitude: userLocation.latitude + (Math.random() - 0.5) * 0.01,
      longitude: userLocation.longitude + (Math.random() - 0.5) * 0.01,
      distanceKm: Math.random() * 2,
    };

    setHelpRequests([...helpRequests, newRequest]);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <UserProfileStrip user={currentUser} />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
      >
        <Marker
          coordinate={userLocation}
          title="You"
          pinColor="blue"
        />
        {helpRequests.map((request) => (
          <Marker
            key={request.id}
            coordinate={{
              latitude: request.latitude,
              longitude: request.longitude,
            }}
            title={getTypeLabel(request.type)}
            pinColor={getMarkerColor(request.severity)}
            onPress={() => handleMarkerPress(request)}
          />
        ))}
      </MapView>

      {selectedRequest && (
        <HelpRequestDetailsCard
          request={selectedRequest}
          onHelpPress={() => handleHelpPress(selectedRequest)}
          onClose={handleCloseCard}
        />
      )}

      <NewRequestButton onPress={() => setIsModalVisible(true)} />

      <NewRequestModal
        visible={isModalVisible}
        onSubmit={handleNewRequestSubmit}
        onClose={() => setIsModalVisible(false)}
      />

      <HelperInfoModal
        visible={isHelperModalVisible}
        location={selectedRequestForHelp ? getLocationString(selectedRequestForHelp) : ''}
        onSubmit={handleHelperInfoSubmit}
        onClose={() => {
          setIsHelperModalVisible(false);
          setSelectedRequestForHelp(null);
        }}
      />

      <JSONDisplayModal
        visible={isJSONModalVisible}
        jsonData={currentJSONData}
        onClose={() => setIsJSONModalVisible(false)}
        onCopy={handleCopyJSON}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default DisasterMapScreen;

