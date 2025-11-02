import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { FieldConfig } from '../../types/config';

interface FormFieldProps {
  fieldKey: string;
  config: FieldConfig;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Dynamic Form Field Component
 * 
 * Renders different input types based on field configuration.
 * Supports: text, date, email, phone, select
 */
export const FormField: React.FC<FormFieldProps> = ({
  fieldKey,
  config,
  value,
  onChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderField = () => {
    switch (config.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={config.placeholder}
            keyboardType={
              config.type === 'email'
                ? 'email-address'
                : config.type === 'phone'
                ? 'phone-pad'
                : 'default'
            }
            autoCapitalize={config.type === 'email' ? 'none' : 'words'}
          />
        );

      case 'date':
        return (
          <View>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder={config.placeholder || 'YYYY-MM-DD'}
              keyboardType="default"
            />
            <Text style={styles.dateHint}>Format: YYYY-MM-DD</Text>
          </View>
        );

      case 'select':
        // For simplicity, using text input. In production, use a proper picker
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={config.placeholder}
          />
        );

      default:
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={config.placeholder}
          />
        );
    }
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {config.label}
        {config.required && <Text style={styles.required}> *</Text>}
      </Text>
      {renderField()}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
