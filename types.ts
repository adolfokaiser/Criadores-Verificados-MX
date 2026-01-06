
export type UserRole = 'USER' | 'BREEDER' | 'ADMIN';

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  nombre: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface VerificationEvidence {
  tipo: string;
  url: string;
}

export interface BreederProfile {
  id: string;
  userId: string;
  nombreComercial: string;
  nombreResponsable: string;
  estado: string;
  ciudad: string;
  direccionAproximada: string;
  telefonoOculto: string; // Only for internal use/admin
  emailContactoOculto: string; // Only for internal use/admin
  razasOfrecidas: string[];
  descripcion: string;
  fotos: string[];
  verificacionStatus: VerificationStatus;
  verificacionEvidencia: VerificationEvidence[]; // Only Admin can see
  createdAt: string;
  updatedAt: string;
}

export interface Litter {
  id: string;
  breederId: string;
  raza: string;
  fechaNacimiento?: string;
  disponibilidad: 'Disponible' | 'Reservado' | 'No disponible';
  descripcion: string;
  fotos: string[];
  estado: string;
  ciudad: string;
}

export interface Conversation {
  id: string;
  userId: string;
  breederId: string;
  lastMessage?: string;
  updatedAt: string;
  breederName: string;
  userName: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}
