import { SearchConfig, DisplayConfig, DisplaySection } from '../types/config';
import { Customer } from '../types/customer';

/**
 * Search Form Configuration
 * 
 * This configuration drives the entire search form UI.
 * To add a new search field:
 * 1. Add a new key to the fields object
 * 2. Define its type, label, placeholder, and renderOrder
 * 3. The form will automatically render the new field
 */
export const searchConfig: SearchConfig = {
  fields: {
    firstName: {
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter first name',
      renderOrder: 1,
      required: false,
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter last name',
      renderOrder: 2,
      required: false,
    },
    dateOfBirth: {
      type: 'date',
      label: 'Date of Birth',
      placeholder: 'Select date',
      renderOrder: 3,
      required: false,
    },
  },
};

/**
 * Display Configuration
 * 
 * This configuration controls how customer data is displayed
 * in both the list view and detail view.
 */
export const displayConfig: DisplayConfig = {
  // Configuration for customer list items
  listItem: {
    primaryFields: ['firstName', 'lastName'],
    secondaryFields: ['dateOfBirth'],
    formatter: (customer: Customer) => {
      const primaryPhone = customer.phones.find(p => p.isPrimary)?.number || 
                          customer.phones[0]?.number || 'N/A';
      const primaryEmail = customer.emails.find(e => e.isPrimary)?.address || 
                          customer.emails[0]?.address || 'N/A';
      
      return {
        title: `${customer.firstName} ${customer.lastName}`,
        subtitle: `DOB: ${formatDate(customer.dateOfBirth)}`,
        details: [
          `Phone: ${primaryPhone}`,
          `Email: ${primaryEmail}`,
        ],
      };
    },
  },
  
  // Configuration for detail view sections
  detailSections: [
    {
      title: 'Basic Information',
      renderOrder: 1,
      fields: [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { 
          key: 'dateOfBirth', 
          label: 'Date of Birth',
          format: (value: string) => formatDate(value),
        },
        { key: 'maritalStatus', label: 'Marital Status' },
      ],
    },
    {
      title: 'Addresses',
      renderOrder: 2,
      fields: [
        {
          key: 'addresses',
          label: 'Addresses',
          format: (addresses: any[]) => {
            if (!addresses || addresses.length === 0) return 'No addresses';
            return addresses.map((addr, idx) => 
              `${addr.type}: ${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`
            ).join('\n');
          },
        },
      ],
    },
    {
      title: 'Contact Information',
      renderOrder: 3,
      fields: [
        {
          key: 'phones',
          label: 'Phone Numbers',
          format: (phones: any[]) => {
            if (!phones || phones.length === 0) return 'No phone numbers';
            return phones.map(phone => 
              `${phone.type}: ${phone.number}${phone.isPrimary ? ' (Primary)' : ''}`
            ).join('\n');
          },
        },
        {
          key: 'emails',
          label: 'Email Addresses',
          format: (emails: any[]) => {
            if (!emails || emails.length === 0) return 'No email addresses';
            return emails.map(email => 
              `${email.type}: ${email.address}${email.isPrimary ? ' (Primary)' : ''}`
            ).join('\n');
          },
        },
      ],
    },
  ],
};

// Helper function to format dates
function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * How to add a new search field:
 * 
 * Example: Adding an "Email" search field
 * 
 * 1. Add to searchConfig.fields:
 *    email: {
 *      type: 'email',
 *      label: 'Email Address',
 *      placeholder: 'Enter email',
 *      renderOrder: 4,
 *      required: false,
 *    }
 * 
 * 2. That's it! The form will automatically render the new field.
 *    No component code changes needed.
 * 
 * Example: Adding a new detail section
 * 
 * 1. Add to displayConfig.detailSections:
 *    {
 *      title: 'Additional Info',
 *      renderOrder: 4,
 *      fields: [
 *        { key: 'membershipId', label: 'Membership ID' },
 *        { key: 'joinDate', label: 'Join Date', format: formatDate },
 *      ],
 *    }
 */
