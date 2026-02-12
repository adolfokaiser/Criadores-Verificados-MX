
import { User, BreederProfile, Litter, Conversation, Message, Article } from '../types';

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
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'criadero-del-valle',
    responseTimeAvgSeconds: 3600, // 1 hora
    responseRate30d: 95,
    lastActiveAt: new Date().toISOString()
  },
  {
    id: 'b2',
    userId: 'u4',
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
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'caninos-reales',
    responseTimeAvgSeconds: 86400, // 24 horas
    responseRate30d: 60,
    lastActiveAt: new Date(Date.now() - 172800000).toISOString() // hace 2 días
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

export const mockArticles: Article[] = [
  {
    id: 'a1',
    titulo: 'Cómo detectar estafas',
    slug: 'detectar-estafas',
    resumen: 'Aprende a identificar las señales rojas en anuncios sospechosos.',
    bodyMd: 'Contenido extenso sobre estafas...',
    icono: 'ShieldAlert'
  },
  {
    id: 'a2',
    titulo: 'Preguntas clave al criador',
    slug: 'preguntas-clave',
    resumen: 'Lo que debes preguntar antes de visitar un criadero.',
    bodyMd: 'Lista de preguntas...',
    icono: 'HelpCircle'
  },
  {
    id: 'a3',
    titulo: 'Salud y Genética',
    slug: 'salud-genetica',
    resumen: 'Importancia de las pruebas de salud en los padres.',
    bodyMd: 'Información genética...',
    icono: 'Dna'
  }
];

export const mockConversations: Conversation[] = [];
export const mockMessages: Message[] = [];
