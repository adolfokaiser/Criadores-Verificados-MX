
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
  telefonoOculto: string;
  emailContactoOculto: string;
  razasOfrecidas: string[];
  descripcion: string;
  fotos: string[];
  verificacionStatus: VerificationStatus;
  verificacionEvidencia: VerificationEvidence[];
  createdAt: string;
  updatedAt: string;
  // Nuevos campos para confianza y métricas
  slug?: string;
  responseTimeAvgSeconds?: number;
  responseRate30d?: number;
  lastActiveAt?: string;
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

export interface Article {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  bodyMd: string;
  icono: string;
}

export interface BreederStats {
  profileViews30d: number;
  chatStarts30d: number;
  messagesReceived30d: number;
}
