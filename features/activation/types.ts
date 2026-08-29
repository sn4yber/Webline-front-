/**
 * Tipos internos de la feature de activación.
 */

export interface ActivationStep {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface ActivationFormData {
  // Step 1: Datos del negocio
  businessName: string;
  businessSlug: string;
  businessCategory: string;

  // Step 2: Datos del propietario
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;

  // Step 3: Configuración inicial
  selectedPlanId?: string;
}
