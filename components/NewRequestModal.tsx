import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';

interface NewRequestModalProps {
  visible: boolean;
  onSubmit: (data: {
    severity: 'critical' | 'urgent' | 'low';
    type: 'medical' | 'evacuation' | 'food' | 'shelter' | 'other';
    description: string;
    shareExactLocation: boolean;
  }) => void;
  onClose: () => void;
}

const NewRequestModal: React.FC<NewRequestModalProps> = ({
  visible,
  onSubmit,
  onClose,
}) => {
  const [severity, setSeverity] = useState<'critical' | 'urgent' | 'low'>('urgent');
  const [type, setType] = useState<'medical' | 'evacuation' | 'food' | 'shelter' | 'other'>('other');
  const [description, setDescription] = useState('');
  const [shareExactLocation, setShareExactLocation] = useState(false);
  const [showSeverityPicker, setShowSeverityPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const handleSubmit = () => {
    if (description.trim().length === 0) {
      return;
    }

    onSubmit({
      severity,
      type,
      description: description.trim(),
      shareExactLocation,
    });

    setDescription('');
    setSeverity('urgent');
    setType('other');
    setShareExactLocation(false);
  };

  const handleClose = () => {
    setDescription('');
    setSeverity('urgent');
    setType('other');
    setShareExactLocation(false);
    onClose();
  };

  const severityOptions: Array<'critical' | 'urgent' | 'low'> = ['critical', 'urgent', 'low'];
  const typeOptions: Array<'medical' | 'evacuation' | 'food' | 'shelter' | 'other'> = [
    'medical',
    'evacuation',
    'food',
    'shelter',
    'other',
  ];

  const getSeverityLabel = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const getTypeLabel = (t: string) => {
    switch (t) {
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
        return t;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>New Help Request</Text>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={styles.label}>Severity</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  setShowTypePicker(false);
                  setShowSeverityPicker(!showSeverityPicker);
                }}
              >
                <Text style={styles.pickerText}>{getSeverityLabel(severity)}</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>
              {showSeverityPicker && (
                <View style={styles.pickerOptions}>
                  {severityOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.pickerOption}
                      onPress={() => {
                        setSeverity(option);
                        setShowSeverityPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>
                        {getSeverityLabel(option)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Type of Help</Text>
              <TouchableOpacity
                style={styles.picker}
                onPress={() => {
                  setShowSeverityPicker(false);
                  setShowTypePicker(!showTypePicker);
                }}
              >
                <Text style={styles.pickerText}>{getTypeLabel(type)}</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>
              {showTypePicker && (
                <View style={styles.pickerOptions}>
                  {typeOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.pickerOption}
                      onPress={() => {
                        setType(option);
                        setShowTypePicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>
                        {getTypeLabel(option)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={4}
                placeholder="Describe what kind of help you need..."
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.field}>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Share exact location</Text>
                <Switch
                  value={shareExactLocation}
                  onValueChange={setShareExactLocation}
                  trackColor={{ false: '#D0D0D0', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                description.trim().length === 0 && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={description.trim().length === 0}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Send Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: 400,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    color: '#000000',
  },
  pickerArrow: {
    fontSize: 12,
    color: '#666666',
  },
  pickerOptions: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#000000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    minHeight: 100,
    backgroundColor: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#D0D0D0',
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
});

export default NewRequestModal;

