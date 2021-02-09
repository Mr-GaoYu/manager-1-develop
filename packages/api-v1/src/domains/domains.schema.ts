import { array, mixed, number, object, string, SchemaOf } from 'yup';
import { CreateDomainPayload, UpdateDomainPayload } from './types';

const domainSchemaBase = object().shape({
  domain: string().matches(
    /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
    'Domain is not valid.'
  ),
  status: mixed().oneOf(['disabled', 'active', 'edit_mode', 'has_errors']),
  tags: array(),
  description: string()
    .min(1, 'Description must be between 1 and 255 characters.')
    .max(255, 'Description must be between 1 and 255 characters.'),
  retry_sec: number(),
  master_ips: array().of(string()),
  axfr_ips: array()
    .of(string())
    .typeError('Must be a comma-separated list of IP addresses.'),
  expire_sec: number(),
  refresh_sec: number(),
  ttl_sec: number()
});

export const createDomainSchema: SchemaOf<CreateDomainPayload> = domainSchemaBase
  .shape({
    domain: string()
      .required('Domain is required.')
      .matches(
        /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
        'Domain is not valid.'
      )
  })
  .defined();

export const updateDomainSchema: SchemaOf<UpdateDomainPayload> = domainSchemaBase
  .shape({
    domainId: number(),
    soa_email: string().email('SOA Email is not valid.'),
    axfr_ips: array().of(string()),
    tags: array().of(string())
  })
  .defined();
