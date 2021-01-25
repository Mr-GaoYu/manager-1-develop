import Factory from 'factory.ts';
import { Domain } from '@rua/api-v1/lib/domains/types';

export const domainFactory = Factory.Sync.makeFactory<Domain>({
  domain: Factory.each((id) => `domain-${id}`),
  id: Factory.each((id) => id),
  soa_email: 'admin@example.com',
  description: 'a domain',
  ttl_sec: 1000,
  refresh_sec: 100,
  expire_sec: 100,
  retry_sec: 100
});
