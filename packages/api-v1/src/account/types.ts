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

export type GrantLevel = null | 'read_only' | 'read_write';

export interface Grant {
  id: number;
  premissions: GrantLevel;
  label: string;
}

export type GlobalGrantTypes =
  | 'add_linodes'
  | 'add_longview'
  | 'longview_subscription'
  | 'account_access'
  | 'cancel_account'
  | 'add_domains'
  | 'add_stackscripts'
  | 'add_nodebalancers'
  | 'add_images'
  | 'add_volumes';

export interface GlobalGrants {
  global: Record<GlobalGrantTypes, boolean | GrantLevel>;
}

export type GrantType =
  | 'linode'
  | 'domain'
  | 'nodebalancer'
  | 'image'
  | 'longview'
  | 'stackscript'
  | 'volume';

export type Grants = GlobalGrants & Record<GrantType, Grant[]>;

export interface Entity {
  id: number;
  label: string;
  type: string;
  url: string;
}

export type EventAction = 'account_update';

export type EventStatus =
  | 'scheduled'
  | 'started'
  | 'finished'
  | 'failed'
  | 'notification';

export interface Event {
  id: number;
  action: EventAction;
  created: string;
  entity: Entity | null;
  duration: number | null;
  percent_complete: number | null;
  rate: string | null;
  read: boolean;
  seen: boolean;
  status: EventStatus;
  time_remaining: null | string;
  username: string;
  secondary_entity: Entity | null;
  _initial?: boolean;
  message: string | null;
}
