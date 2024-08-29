export interface Meta {
  auto_added: boolean;
  source: any; // Adjust the type based on actual data, if available
  managed_by_apps: boolean;
  managed_by_argo_tunnel: boolean;
}

export interface DNSRecord {
  content: string;
  name: string;
  type: string;
  id: string;
  comment: string | null;
  created_on: string;
  meta: Meta;
  modified_on: string;
  proxiable: boolean;
  proxied: boolean;
  tags: string[];
  ttl: number;
  zone_id: string;
  zone_name: string;
}

export type DNSRecords = DNSRecord[];
