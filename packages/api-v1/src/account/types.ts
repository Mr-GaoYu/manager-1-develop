interface CreditCard {
  expiry: string | null;
  last_four: string | null;
}

export interface ActivePromotion {
  description: string;
  summary: string;
  expire_dt: string | null;
  credit_remaining: string;
  this_month_credit_remaining: string;
  credit_monthly_cap: string;
  image_url: string;
}

export type AccountCapability =
  | 'Linodes'
  | 'NodeBalancers'
  | 'Block Storage'
  | 'Object Storage'
  | 'Kubernetes'
  | 'Cloud Firewall'
  | 'Vlans';

export interface Account {
  active_since: string;
  address_2: string;
  email: string;
  first_name: string;
  tax_id: string;
  credit_card: CreditCard;
  state: string;
  zip: string;
  address_1: string;
  country: string;
  last_name: string;
  balance: number;
  balance_uninvoiced: number;
  city: string;
  phone: string;
  company: string;
  active_promotions: ActivePromotion[];
  capabilities: AccountCapability[];
  euuid: string;
}

export interface AccountSettings {
  managed: boolean;
  longview_subscription: string | null;
  network_helper: boolean;
  backups_enabled: boolean;
  object_storage: 'active' | 'disabled' | 'suspended';
}
