export type Hypervisor = 'kvm' | 'zen';

export interface LinodeSpecs {
  disk: number;
  memory: number;
  vcpus: number;
  transfer: number;
  gpus: number;
}

export interface LinodeAlerts {
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

export interface LinodeBackupSchedule {
  window: Window | null;
  day: Day | null;
}

export type LinodeStatus =
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

export interface LinodeBackups {
  enabled: boolean;
  schedule: LinodeBackupSchedule;
  last_successful: string | null;
}

export interface Rua {
  id: number;
  alerts: LinodeAlerts;
  backups: LinodeBackups;
  created: string;
  region: string;
  image: string | null;
  group: string;
  ipv4: string[];
  ipv6: string | null;
  label: string;
  type: null | string;
  status: LinodeStatus;
  updated: string;
  hypervisor: Hypervisor;
  specs: LinodeSpecs;
  watchdog_enabled: boolean;
  tags: string[];
}
