import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { displayConfig } from '../config/appConfig';
import { Customer } from '../types/customer';
import { RootStackParamList } from '../navigation/types';

type CustomerDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CustomerDetail'
>;

type CustomerDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'CustomerDetail'
>;

interface CustomerDetailScreenProps {
  navigation: CustomerDetailScreenNavigationProp;
  route: CustomerDetailScreenRouteProp;
}

/**
 * Customer Detail Screen
 * 
 * Displays full customer information organized by sections.
 * All sections and fields are driven by displayConfig.detailSections
 */
export const CustomerDetailScreen: React.FC<CustomerDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { customer } = route.params;

  // Sort sections by renderOrder
  const sortedSections = [...displayConfig.detailSections].sort(
    (a, b) => a.renderOrder - b.renderOrder
  );

  const renderField = (field: any, customer: Customer) => {
    const value = customer[field.key as keyof Customer];
    const displayValue = field.format ? field.format(value) : String(value || 'N/A');

    return (
      <View key={field.key} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{field.label}</Text>
        <Text style={styles.fieldValue}>{displayValue}</Text>
      </View>
    );
  };

  const renderSection = (section: any) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.fields.map((field: any) => renderField(field, customer))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Customer Details</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedSections.map(renderSection)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backButtonText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionContent: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
