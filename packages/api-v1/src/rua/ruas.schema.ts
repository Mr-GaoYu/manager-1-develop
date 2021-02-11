import { array, boolean, lazy, mixed, number, object, string } from 'yup';

const stackscript_data = array().of(object()).nullable(true);

export const ruaInterfaceItemSchema = object({
  id: number().required('Interface ID is required.')
}).default(undefined);

export const ruaInterfaceSchema = lazy((obj?: Record<any, any>) =>
  typeof obj === 'undefined'
    ? object().notRequired()
    : object(Object.keys(obj).map((_) => ruaInterfaceItemSchema))
);

export const ResizeRuaDiskSchema = object({
  size: number().required('Size is required.').min(1)
});

export const UpdateRuaPasswordSchema = object({
  password: string().required('Password is required.')
});

export const CreateRuaSchema = object({
  type: string().ensure().required('Plan is required.'),
  region: string().ensure().required('Region is required.'),
  stackscript_id: number().notRequired(),
  backup_id: number().notRequired(),
  swap_size: number().notRequired(),
  image: string().notRequired(),
  authorized_keys: array().of(string()).notRequired(),
  backups_enabled: boolean().notRequired(),
  stackscript_data,
  booted: boolean().notRequired(),
  label: string()
    .transform((v) => (v === '' ? undefined : v))
    .notRequired()
    .min(3, 'Label must contain between 3 and 32 characters.')
    .max(32, 'Label must contain between 3 and 32 characters.'),
  tags: array().of(string()).notRequired(),
  private_ip: boolean().notRequired(),
  authorized_users: array().of(string()).notRequired(),
  root_pass: string().when('image', {
    is: (value: string) => Boolean(value),
    then: string().required(
      'You must provide a root password when deploying from an image.'
    ),
    otherwise: string().notRequired()
  }),
  interfaces: ruaInterfaceSchema
});

const alerts = object({
  cpu: number()
    .typeError('CPU Usage must be a number')
    .min(0, 'Must be between 0 and 4800')
    .max(4800, 'Must be between 0 and 4800'),
  network_in: number(),
  network_out: number(),
  transfer_quota: number(),
  io: number()
}).notRequired();

const schedule = object({
  day: mixed().oneOf(
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    'Invalid day value.'
  ),
  window: mixed().oneOf(
    [
      'W0',
      'W2',
      'W4',
      'W6',
      'W8',
      'W10',
      'W12',
      'W14',
      'W16',
      'W18',
      'W20',
      'W22',
      'W24'
    ],
    'Invalid schedule value.'
  )
});

const backups = object({
  schedule,
  enabled: boolean()
});

export const UpdateRuaSchema = object({
  label: string()
    .transform((v) => (v === '' ? undefined : v))
    .notRequired()
    .min(3, 'Label must contain between 3 and 32 characters.')
    .max(32, 'Label must contain between 3 and 32 characters.'),
  tags: array().of(string()).notRequired(),
  watchdog_enabled: boolean().notRequired(),
  alerts,
  backups
});

const SSHKeySchema = object({
  id: number(),
  label: string(),
  ssh_key: string(),
  created: string()
});

export const RebuildRuaSchema = object().shape({
  image: string().required('An image is required.'),
  root_pass: string().required('Password is required.'),
  authorized_keys: array().of(SSHKeySchema),
  authorized_users: array().of(string()),
  stackscript_id: number().notRequired(),
  stackscript_data,
  booted: boolean().notRequired()
});
