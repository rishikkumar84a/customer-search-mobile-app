import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Customer } from '../../types/customer';
import { displayConfig } from '../../config/appConfig';

interface CustomerListItemProps {
  customer: Customer;
  onPress: (customer: Customer) => void;
}

/**
 * Customer List Item Component
 * 
 * Renders a customer in the list view using the display configuration.
 * The display is completely driven by displayConfig.listItem
 */
export const CustomerListItem: React.FC<CustomerListItemProps> = ({
  customer,
  onPress,
}) => {
  const { title, subtitle, details } = displayConfig.listItem.formatter(customer);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(customer)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <View style={styles.detailsContainer}>
          {details.map((detail, index) => (
            <Text key={index} style={styles.detail}>
              {detail}
            </Text>
          ))}
        </View>
      </View>
      
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 4,
  },
  detail: {
    fontSize: 13,
    color: '#888',
  },
  chevron: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
});
