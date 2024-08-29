export interface Account {
  id: string;
  name: string;
}

export interface Meta {
  cdn_only: any; // Adjust the type based on actual data, if available
  custom_certificate_quota: number;
  dns_only: any; // Adjust the type based on actual data, if available
  foundation_dns: any; // Adjust the type based on actual data, if available
  page_rule_quota: number;
  phishing_detected: boolean;
  step: number;
}

export interface Owner {
  id: string | null;
  name: string | null;
  type: string;
  email: string | null;
}

export interface Tenant {
  id: string | null;
  name: string | null;
}

export interface TenantUnit {
  id: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  frequency: string;
  is_subscribed: boolean;
  can_subscribe: boolean;
  legacy_id: string;
  legacy_discount: boolean;
  externally_managed: boolean;
}

export interface Zone {
  id: string;
  account: Account;
  activated_on: string;
  created_on: string;
  development_mode: number;
  meta: Meta;
  modified_on: string;
  name: string;
  name_servers: string[];
  original_dnshost: any; // Adjust the type based on actual data, if available
  original_name_servers: string[];
  original_registrar: string;
  owner: Owner;
  vanity_name_servers: any; // Adjust the type based on actual data, if available
  status: string;
  paused: boolean;
  type: string;
  tenant: Tenant;
  tenant_unit: TenantUnit;
  permissions: string[];
  plan: Plan;
}
