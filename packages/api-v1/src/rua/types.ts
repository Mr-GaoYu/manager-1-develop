export type Hypervisor = 'kvm' | 'zen';

export interface RuaSpecs {
  disk: number;
  memory: number;
  vcpus: number;
  transfer: number;
  gpus: number;
}

export interface RuaAlerts {
  cpu: number;
  io: number;
  network_in: number;
  network_out: number;
  transfer_quota: number;
}

export type Day =
  | 'Scheduling'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface RuaBackupSchedule {
  window: Window | null;
  day: Day | null;
}

export type RuaStatus =
  | 'offline'
  | 'booting'
  | 'running'
  | 'shutting_down'
  | 'rebooting'
  | 'rebuilding'
  | 'provisioning'
  | 'deleting'
  | 'migrating'
  | 'cloning'
  | 'restoring'
  | 'stopped';

export interface RuaBackups {
  enabled: boolean;
  schedule: RuaBackupSchedule;
  last_successful: string | null;
}

export interface Rua {
  id: number;
  alerts: RuaAlerts;
  backups: RuaBackups;
  created: string;
  region: string;
  image: string | null;
  group: string;
  ipv4: string[];
  ipv6: string | null;
  label: string;
  type: null | string;
  status: RuaStatus;
  updated: string;
  hypervisor: Hypervisor;
  specs: RuaSpecs;
  watchdog_enabled: boolean;
  tags: string[];
}

export interface CreateRuaRequest {
  type?: string;
  region?: string;
  stackscript_id?: number;
  backup_id?: number;
  swap_size?: number;
  image?: string;
  root_pass?: string;
  authorized_keys?: string[];
  backups_enabled?: boolean;
  stackscript_data?: any;
  booted?: boolean;
  label?: string;
  tags?: string[];
  private_ip?: boolean;
  authorized_users?: string[];
  interfaces?: Record<string, RuaInterfacePayload>;
}

export type InterfaceType = 'default' | 'additional';

export interface RuaInterfacePayload {
  type: InterfaceType;
  vlan_id?: number;
}

export interface RuaType {
  id: string;
  disk: number;
  class: RuaTypeClass;
  price: PriceObject;
  successor: string | null;
  label: string;
  addons: {
    backups: { price: PriceObject };
  };
  network_out: number;
  memory: number;
  transfer: number;
  vcpus: number;
}

export interface PriceObject {
  monthly: number;
  hourly: number;
}

export type RuaTypeClass =
  | 'nanode'
  | 'standard'
  | 'dedicated'
  | 'highmem'
  | 'gpu';
