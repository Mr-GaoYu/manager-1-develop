export interface Domain {
  id: number;
  domain: string;
  soa_email: string;
  description: string;
  refresh_sec: number;
  retry_sec: number;
  expire_sec: number;
  ttl_sec: number;
}
