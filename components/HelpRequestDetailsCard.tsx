import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { HelpRequest } from '../screens/DisasterMapScreen';

interface HelpRequestDetailsCardProps {
  request: HelpRequest;
  onHelpPress: () => void;
  onClose: () => void;
}

const HelpRequestDetailsCard: React.FC<HelpRequestDetailsCardProps> = ({
  request,
  onHelpPress,
  onClose,
}) => {
  const getSeverityColor = (severity: string) => {
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

  const getSeverityLabel = (severity: string) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1);
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.userName}>{request.userName}</Text>
          <Text style={styles.age}>Age: {request.age}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: getSeverityColor(request.severity) },
            ]}
          >
            <Text style={styles.severityText}>
              {getSeverityLabel(request.severity)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Type of Help:</Text>
          <Text style={styles.value}>{getTypeLabel(request.type)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{request.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>
            {request.distanceKm.toFixed(1)} km away
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={onHelpPress}
            activeOpacity={0.8}
          >
            <Text style={styles.helpButtonText}>I'm going to help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '60%',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: '#666666',
  },
  badgeContainer: {
    marginBottom: 16,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  helpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HelpRequestDetailsCard;

