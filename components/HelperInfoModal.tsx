import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

export interface HelperInfo {
  location: string;
  phoneNumber: number;
  name: string;
  occupation: number; // 0 for community member, 1 for paramedic
}

interface HelperInfoModalProps {
  visible: boolean;
  location: string;
  onSubmit: (data: HelperInfo) => void;
  onClose: () => void;
}

const HelperInfoModal: React.FC<HelperInfoModalProps> = ({
  visible,
  location,
  onSubmit,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!name.trim() || !phoneNumber.trim() || occupation === null) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Convert phone number to integer
    const phoneNumberInt = parseInt(phoneNumber.replace(/\D/g, ''), 10);
    
    if (isNaN(phoneNumberInt)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const helperData: HelperInfo = {
      location: location,
      phoneNumber: phoneNumberInt,
      name: name.trim(),
      occupation: occupation, // 0 or 1
    };

    onSubmit(helperData);
    
    // Reset form
    setName('');
    setPhoneNumber('');
    setOccupation(null);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Provide Your Information</Text>
            <Text style={styles.subtitle}>We need your details to coordinate help</Text>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Occupation *</Text>
                <View style={styles.occupationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.occupationButton,
                      occupation === 0 && styles.occupationButtonSelected,
                    ]}
                    onPress={() => setOccupation(0)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.occupationButtonText,
                        occupation === 0 && styles.occupationButtonTextSelected,
                      ]}
                    >
                      Community Member
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.occupationButton,
                      occupation === 1 && styles.occupationButtonSelected,
                    ]}
                    onPress={() => setOccupation(1)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.occupationButtonText,
                        occupation === 1 && styles.occupationButtonTextSelected,
                      ]}
                    >
                      Paramedic
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.locationContainer}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.locationText}>{location}</Text>
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  locationContainer: {
    marginBottom: 20,
    padding: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  occupationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  occupationButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  occupationButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  occupationButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  occupationButtonTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default HelperInfoModal;

