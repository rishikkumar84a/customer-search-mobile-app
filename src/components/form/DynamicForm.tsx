import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FormField } from './FormField';
import { SearchConfig } from '../../types/config';

interface DynamicFormProps {
  config: SearchConfig;
  onSubmit: (values: Record<string, string>) => void;
  onClear: () => void;
}

/**
 * Dynamic Form Component
 * 
 * Renders a complete form based on configuration.
 * All fields are generated dynamically - no hardcoded fields.
 * 
 * To add a new field, simply add it to the config object.
 */
export const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  onSubmit,
  onClear,
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Sort fields by renderOrder
  const sortedFields = Object.entries(config.fields).sort(
    ([, a], [, b]) => a.renderOrder - b.renderOrder
  );

  const handleFieldChange = (fieldKey: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleClear = () => {
    setFormValues({});
    onClear();
  };

  const handleSubmit = () => {
    // Filter out empty values
    const filledValues = Object.entries(formValues).reduce(
      (acc, [key, value]) => {
        if (value && value.trim()) {
          acc[key] = value.trim();
        }
        return acc;
      },
      {} as Record<string, string>
    );

    onSubmit(filledValues);
  };

  const hasValues = Object.values(formValues).some(v => v && v.trim());

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {sortedFields.map(([fieldKey, fieldConfig]) => (
          <FormField
            key={fieldKey}
            fieldKey={fieldKey}
            config={fieldConfig}
            value={formValues[fieldKey] || ''}
            onChange={(value) => handleFieldChange(fieldKey, value)}
          />
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.searchButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>

          {hasValues && (
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#3498db',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
