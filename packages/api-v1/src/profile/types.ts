export interface Referrals {
  code: string;
  url: string;
  total: number;
  completed: number;
  pending: number;
  credit: number;
}

export type TPAProvider = 'password' | 'github';
export interface Profile {
  uid: number;
  username: string;
  email: string;
  timezone: string;
  email_notifications: boolean;
  referrals: Referrals;
  ip_whitelist_enabled: boolean;
  lish_auth_method: 'password_keys' | 'keys_only' | 'disabled';
  authentication_type: TPAProvider;
  authorized_keys: string[];
  two_factor_auth: boolean;
  restricted: boolean;
}

export interface TrustedDevice {
  created: string;
  last_authenticated: string;
  last_remote_addr: string;
  id: number;
  user_agent: string;
  expiry: string;
}

export type UserPreferences = Record<string, any>;

export interface ProfileLogin {
  id: number;
  datetime: string;
  ip: string;
  username: string;
  restricted: boolean;
}
