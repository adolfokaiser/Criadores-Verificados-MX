
import { User, BreederProfile, Litter, Conversation, Message } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'comprador@example.com', nombre: 'Juan Pérez', role: 'USER', avatarUrl: 'https://picsum.photos/seed/u1/100' },
  { id: 'u2', email: 'criador@example.com', nombre: 'María Criadora', role: 'BREEDER', avatarUrl: 'https://picsum.photos/seed/u2/100' },
  { id: 'u3', email: 'admin@criadores.mx', nombre: 'Admin Master', role: 'ADMIN', avatarUrl: 'https://picsum.photos/seed/u3/100' },
];

export const mockBreeders: BreederProfile[] = [
  {
    id: 'b1',
    userId: 'u2',
    nombreComercial: 'Criadero del Valle',
    nombreResponsable: 'María Criadora',
    estado: 'Estado de México',
    ciudad: 'Toluca',
    direccionAproximada: 'Cerca de Paseo Tollocan',
    telefonoOculto: '5512345678',
    emailContactoOculto: 'valle@example.com',
    razasOfrecidas: ['Golden Retriever', 'Border Collie'],
    descripcion: 'Somos un criadero familiar comprometido con la salud y bienestar de nuestros ejemplares.',
    fotos: ['https://picsum.photos/seed/b1-1/800/600', 'https://picsum.photos/seed/b1-2/800/600'],
    verificacionStatus: 'VERIFIED',
    verificacionEvidencia: [{ tipo: 'Certificado FCM', url: '#' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'b2',
    userId: 'u4', // hypothetical
    nombreComercial: 'Caninos Reales',
    nombreResponsable: 'Ricardo Rocha',
    estado: 'Jalisco',
    ciudad: 'Zapopan',
    direccionAproximada: 'Zona Real',
    telefonoOculto: '3398765432',
    emailContactoOculto: 'reales@example.com',
    razasOfrecidas: ['Pastor Alemán'],
    descripcion: 'Especialistas en líneas de trabajo y compañía.',
    fotos: ['https://picsum.photos/seed/b2-1/800/600'],
    verificacionStatus: 'PENDING',
    verificacionEvidencia: [{ tipo: 'Registro Prefijo', url: '#' }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockLitters: Litter[] = [
  {
    id: 'l1',
    breederId: 'b1',
    raza: 'Golden Retriever',
    fechaNacimiento: '2024-01-15',
    disponibilidad: 'Disponible',
    descripcion: 'Hermosa camada de 5 cachorros, listos para entrega en marzo.',
    fotos: ['https://picsum.photos/seed/l1-1/600/400'],
    estado: 'Estado de México',
    ciudad: 'Toluca'
  }
];

export const mockConversations: Conversation[] = [];
export const mockMessages: Message[] = [];
