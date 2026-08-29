/**
 * Tipos del dominio de negocio (Business).
 */

export type BusinessStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "INACTIVE";

export interface Business {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: BusinessStatus;
  planId?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessRequest {
  name: string;
  slug: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
}
