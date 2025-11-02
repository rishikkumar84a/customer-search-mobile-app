# Configuration System Guide

## 🎯 Overview

This application uses a **configuration-driven architecture** where all UI elements are generated dynamically from configuration objects. This means you can add, modify, or remove features by editing configuration files—no component code changes required.

## 📁 Configuration Files

### Main Configuration: `src/config/appConfig.ts`

This file contains two main configurations:

1. **searchConfig** - Controls the search form
2. **displayConfig** - Controls how data is displayed

## 🔧 Search Configuration

### Structure

```typescript
export const searchConfig: SearchConfig = {
  fields: {
    [fieldName]: {
      type: FieldType,
      label: string,
      placeholder?: string,
      renderOrder: number,
      required?: boolean,
      validation?: (value: string) => string | null,
    }
  }
}
```

### Field Types

- **text** - Regular text input
- **email** - Email keyboard layout
- **phone** - Numeric phone pad
- **date** - Date input (YYYY-MM-DD format)
- **select** - Dropdown selection

### Example: Adding an Email Search Field

```typescript
// Add this to searchConfig.fields in appConfig.ts
email: {
  type: 'email',
  label: 'Email Address',
  placeholder: 'Enter email address',
  renderOrder: 4,  // Position in the form (after dateOfBirth)
  required: false,
}
```

**That's it!** The search form will automatically include this field.

### Example: Adding a Phone Number Search

```typescript
phoneNumber: {
  type: 'phone',
  label: 'Phone Number',
  placeholder: 'Enter phone number',
  renderOrder: 5,
  required: false,
}
```

### Example: Adding Required Field Validation

```typescript
membershipId: {
  type: 'text',
  label: 'Membership ID',
  placeholder: 'Enter membership ID',
  renderOrder: 6,
  required: true,  // Make it required
  validation: (value) => {
    if (!value || value.trim() === '') {
      return 'Membership ID is required';
    }
    if (value.length < 5) {
      return 'Membership ID must be at least 5 characters';
    }
    return null; // Valid
  },
}
```

## 📊 Display Configuration

### List Item Configuration

Controls how customers appear in the results list:

```typescript
listItem: {
  primaryFields: ['firstName', 'lastName'],
  secondaryFields: ['dateOfBirth'],
  formatter: (customer: Customer) => ({
    title: string,
    subtitle: string,
    details: string[],
  }),
}
```

### Example: Customize List Display

```typescript
listItem: {
  primaryFields: ['firstName', 'lastName'],
  secondaryFields: ['dateOfBirth', 'membershipId'],
  formatter: (customer) => {
    const primaryPhone = customer.phones.find(p => p.isPrimary)?.number || 'N/A';
    const primaryEmail = customer.emails.find(e => e.isPrimary)?.address || 'N/A';
    
    return {
      title: `${customer.firstName} ${customer.lastName}`,
      subtitle: `DOB: ${formatDate(customer.dateOfBirth)}`,
      details: [
        `📞 ${primaryPhone}`,
        `📧 ${primaryEmail}`,
        `🆔 ${customer.membershipId || 'N/A'}`,
      ],
    };
  },
}
```

## 🏗 Detail View Sections

### Structure

```typescript
detailSections: [
  {
    title: string,
    renderOrder: number,
    fields: [
      {
        key: string,
        label: string,
        format?: (value: any) => string,
      }
    ],
  }
]
```

### Example: Adding a New Section

```typescript
// Add this to displayConfig.detailSections
{
  title: 'Membership Information',
  renderOrder: 4,  // Position in detail view
  fields: [
    { 
      key: 'membershipId', 
      label: 'Membership ID' 
    },
    { 
      key: 'membershipType', 
      label: 'Membership Type' 
    },
    { 
      key: 'joinDate', 
      label: 'Join Date',
      format: (value) => formatDate(value),
    },
    { 
      key: 'expiryDate', 
      label: 'Expiry Date',
      format: (value) => formatDate(value),
    },
  ],
}
```

### Example: Custom Field Formatters

```typescript
{
  title: 'Financial Information',
  renderOrder: 5,
  fields: [
    {
      key: 'balance',
      label: 'Account Balance',
      format: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      key: 'lastPaymentDate',
      label: 'Last Payment',
      format: (value) => {
        const date = new Date(value);
        const daysAgo = Math.floor(
          (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
        );
        return `${formatDate(value)} (${daysAgo} days ago)`;
      },
    },
  ],
}
```

## 🎨 Advanced Examples

### Multi-Value Field Display

```typescript
{
  key: 'tags',
  label: 'Tags',
  format: (tags: string[]) => {
    if (!tags || tags.length === 0) return 'No tags';
    return tags.join(', ');
  },
}
```

### Conditional Display

```typescript
{
  key: 'status',
  label: 'Account Status',
  format: (status: string) => {
    const emoji = status === 'active' ? '✅' : '❌';
    return `${emoji} ${status.toUpperCase()}`;
  },
}
```

### Complex Object Display

```typescript
{
  key: 'addresses',
  label: 'Addresses',
  format: (addresses: Address[]) => {
    if (!addresses || addresses.length === 0) return 'No addresses';
    
    return addresses
      .map((addr, idx) => {
        const lines = [
          `${addr.type}:`,
          `  ${addr.street}`,
          `  ${addr.city}, ${addr.state} ${addr.zipCode}`,
          `  ${addr.country}`,
        ];
        return lines.join('\n');
      })
      .join('\n\n');
  },
}
```

## 🔄 How It Works Behind the Scenes

### Search Form Flow

```
searchConfig
     ↓
DynamicForm Component
     ↓
Sorts fields by renderOrder
     ↓
Maps each field to FormField component
     ↓
FormField renders appropriate input type
     ↓
User submits → values collected
     ↓
API called with search criteria
```

### Display Flow

```
displayConfig
     ↓
CustomerListItem uses listItem.formatter
     ↓
CustomerDetailScreen uses detailSections
     ↓
Sections sorted by renderOrder
     ↓
Fields formatted using format functions
     ↓
Data displayed to user
```

## ✅ Best Practices

### 1. Use Meaningful Field Names
```typescript
// ✅ Good
customerEmail: { ... }

// ❌ Avoid
field1: { ... }
```

### 2. Set Logical Render Orders
```typescript
// ✅ Good - Related fields together
firstName: { renderOrder: 1 }
lastName: { renderOrder: 2 }
dateOfBirth: { renderOrder: 3 }
email: { renderOrder: 4 }

// ❌ Avoid - Random order
firstName: { renderOrder: 3 }
email: { renderOrder: 1 }
```

### 3. Provide Helpful Placeholders
```typescript
// ✅ Good
placeholder: 'YYYY-MM-DD'
placeholder: 'john.doe@email.com'

// ❌ Avoid
placeholder: 'Enter value'
```

### 4. Use Format Functions for Consistency
```typescript
// ✅ Good - Centralized formatting
format: (value) => formatDate(value)

// ❌ Avoid - Inline formatting everywhere
```

## 🚀 Real-World Scenarios

### Scenario 1: Add Search by City

```typescript
// 1. Add to searchConfig.fields
city: {
  type: 'text',
  label: 'City',
  placeholder: 'Enter city name',
  renderOrder: 4,
}

// 2. Update API service to handle city parameter
// (already handled automatically by json-server)
```

### Scenario 2: Add Insurance Section

```typescript
// Add to displayConfig.detailSections
{
  title: 'Insurance Information',
  renderOrder: 4,
  fields: [
    { key: 'insuranceProvider', label: 'Provider' },
    { key: 'policyNumber', label: 'Policy Number' },
    { 
      key: 'coverageStartDate', 
      label: 'Coverage Start',
      format: (value) => formatDate(value),
    },
    { 
      key: 'coverageEndDate', 
      label: 'Coverage End',
      format: (value) => formatDate(value),
    },
  ],
}
```

### Scenario 3: Add Priority Field with Custom Display

```typescript
// In displayConfig
{
  key: 'priority',
  label: 'Priority Level',
  format: (priority: number) => {
    const stars = '⭐'.repeat(priority);
    const levels = ['Low', 'Medium', 'High', 'Urgent', 'Critical'];
    return `${stars} ${levels[priority - 1] || 'Unknown'}`;
  },
}
```

## 📝 Configuration Checklist

When adding a new feature, check:

- [ ] Added field to appropriate config object
- [ ] Set correct field type
- [ ] Assigned logical renderOrder
- [ ] Provided clear label
- [ ] Added helpful placeholder (if applicable)
- [ ] Created format function (if needed)
- [ ] Updated types if adding new customer fields
- [ ] Tested the new field in the app

## 🎓 Learning Resources

### Explore These Files

1. **`src/config/appConfig.ts`** - Main configuration file
2. **`src/types/config.ts`** - Type definitions for configs
3. **`src/components/form/DynamicForm.tsx`** - How config is consumed
4. **`src/components/form/FormField.tsx`** - Field rendering logic

### Try These Exercises

1. Add a "Middle Name" search field
2. Add a "Notes" section to customer details
3. Create a custom formatter for phone numbers
4. Add validation to the date field
5. Create a new section showing customer statistics

## 💡 Tips & Tricks

1. **Preview Changes Quickly**: Hot reload will show config changes immediately
2. **Use TypeScript**: Let TS guide you with autocomplete
3. **Copy Existing Fields**: Use similar fields as templates
4. **Test Incrementally**: Add one field at a time
5. **Check Console**: Errors will appear if config is invalid

---

**Need help?** Check the main README.md or contact the developer!
