import { object, string, boolean } from 'yup';

export const updateAccountSchema = object({
  email: string().max(128, 'Email must be 128 characters or less.'),
  address_1: string().max(64, 'Address must be 64 characters or less.'),
  city: string().max(24, 'City must be 24 characters or less.'),
  company: string().max(128, 'Company must be 128 characters or less.'),
  country: string()
    .min(2, 'Country code must be two letters.')
    .max(2, 'Country code must be two letters.'),
  first_name: string().max(50, 'First name must be 50 characters or less.'),
  last_name: string().max(50, 'Last name must be 50 characters or less.'),
  address_2: string().max(64, 'Address must be 64 characters or less.'),
  phone: string().max(32, 'Phone number must be 32 characters or less.'),
  state: string().max(24, 'State must be 24 characters or less.'),
  tax_id: string().max(100, 'Tax ID must be 100 characters or less.'),
  zip: string().max(16, 'Zip code must be 16 characters or less.')
});

export const updateAccountSettingsSchema = object({
  network_helper: boolean(),
  backups_enabled: boolean(),
  managed: boolean()
});
