/**
 * Tipos del dominio de planes y entitlements.
 */

export type PlanInterval = "MONTHLY" | "YEARLY";

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: PlanInterval;
  isActive: boolean;
  entitlements: Entitlement[];
  createdAt: string;
}

export interface Entitlement {
  id: string;
  key: string;
  name: string;
  description?: string;
  limit?: number; // null = unlimited
}

export interface CreatePlanRequest {
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: PlanInterval;
  entitlementIds: string[];
}
