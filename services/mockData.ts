
import { User, BreederProfile, Litter, Conversation, Message, Article } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'comprador@example.com', nombre: 'Juan Pérez', role: 'USER', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  { id: 'u2', email: 'criador@example.com', nombre: 'María Criadora', role: 'BREEDER', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'u3', email: 'admin@criadores.mx', nombre: 'Admin Master', role: 'ADMIN', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
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
    descripcion: 'Dedicados a la crianza selectiva de perros de compañía y deporte. Nuestros ejemplares cuentan con pruebas de salud de caderas y codos.',
    fotos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    verificacionStatus: 'VERIFIED',
    verificacionEvidencia: [{ tipo: 'Certificado FCM', url: '#' }],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'criadero-del-valle',
    responseTimeAvgSeconds: 3600,
    responseRate30d: 98,
    lastActiveAt: new Date().toISOString()
  },
  {
    id: 'b2',
    userId: 'u4',
    nombreComercial: 'Reino Husky',
    nombreResponsable: 'Ricardo Rocha',
    estado: 'Nuevo León',
    ciudad: 'Monterrey',
    direccionAproximada: 'Cumbres',
    telefonoOculto: '8119876543',
    emailContactoOculto: 'husky@example.com',
    razasOfrecidas: ['Husky Siberiano'],
    descripcion: 'Especialistas en la raza Husky con enfoque en temperamento equilibrado y belleza. Sociabilización temprana garantizada.',
    fotos: ['https://images.unsplash.com/photo-1537151625747-7ae88ef56b9d?w=800'],
    verificacionStatus: 'VERIFIED',
    verificacionEvidencia: [{ tipo: 'Registro Prefijo', url: '#' }],
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'reino-husky',
    responseTimeAvgSeconds: 14400,
    responseRate30d: 85,
    lastActiveAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'b3',
    userId: 'u5',
    nombreComercial: 'Poodles de Gala',
    nombreResponsable: 'Elena Martínez',
    estado: 'Ciudad de México',
    ciudad: 'Álvaro Obregón',
    direccionAproximada: 'San Ángel',
    telefonoOculto: '5522334455',
    emailContactoOculto: 'poodles@example.com',
    razasOfrecidas: ['Poodle'],
    descripcion: 'Criamos Poodles miniatura y toy con altos estándares de salud y estética. Libres de enfermedades genéticas comunes.',
    fotos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800'],
    verificacionStatus: 'VERIFIED',
    verificacionEvidencia: [{ tipo: 'Aval Médico', url: '#' }],
    createdAt: '2023-11-10T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'poodles-de-gala',
    responseTimeAvgSeconds: 1800,
    responseRate30d: 100,
    lastActiveAt: new Date().toISOString()
  },
  {
    id: 'b4',
    userId: 'u6',
    nombreComercial: 'Bulldogs Reales',
    nombreResponsable: 'Sergio Ramos',
    estado: 'Jalisco',
    ciudad: 'Guadalajara',
    direccionAproximada: 'Zapopan Norte',
    telefonoOculto: '3311223344',
    emailContactoOculto: 'bulldogs@example.com',
    razasOfrecidas: ['Bulldog Francés'],
    descripcion: 'Dedicación exclusiva al Bulldog Francés. Criados en ambiente familiar para una socialización perfecta.',
    fotos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    verificacionStatus: 'VERIFIED',
    verificacionEvidencia: [{ tipo: 'Certificado FCM', url: '#' }],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: new Date().toISOString(),
    slug: 'bulldogs-reales',
    responseTimeAvgSeconds: 43200,
    responseRate30d: 70,
    lastActiveAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const mockLitters: Litter[] = [
  {
    id: 'l1',
    breederId: 'b1',
    raza: 'Golden Retriever',
    fechaNacimiento: '2024-01-15',
    disponibilidad: 'Disponible',
    descripcion: 'Hermosa camada de 5 cachorros dorados. Padres a la vista con pruebas de salud.',
    fotos: ['https://images.unsplash.com/photo-1591768793355-74d7ca73a056?w=600'],
    estado: 'Estado de México',
    ciudad: 'Toluca'
  },
  {
    id: 'l2',
    breederId: 'b2',
    raza: 'Husky Siberiano',
    fechaNacimiento: '2024-02-10',
    disponibilidad: 'Disponible',
    descripcion: 'Cachorros manto gris y blanco con ojos azules. Se entregan vacunados y desparasitados.',
    fotos: ['https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600'],
    estado: 'Nuevo León',
    ciudad: 'Monterrey'
  },
  {
    id: 'l3',
    breederId: 'b3',
    raza: 'Poodle',
    fechaNacimiento: '2024-03-01',
    disponibilidad: 'Disponible',
    descripcion: 'Camada miniatura color apricot. Listos para su nuevo hogar en mayo.',
    fotos: ['https://images.unsplash.com/photo-1591769225440-811ad7d62ca2?w=600'],
    estado: 'Ciudad de México',
    ciudad: 'Álvaro Obregón'
  }
];

export const mockArticles: Article[] = [
  {
    id: 'a1',
    titulo: 'Cómo detectar estafas',
    slug: 'detectar-estafas',
    resumen: 'Aprende a identificar las señales rojas en anuncios sospechosos.',
    bodyMd: '1. Desconfía de precios demasiado bajos.\n2. Nunca deposites sin ver a los padres.\n3. Pide una videollamada en vivo con el criador.\n4. Verifica que el criador use este directorio para contactarte.',
    icono: 'ShieldAlert'
  },
  {
    id: 'a2',
    titulo: 'Preguntas clave al criador',
    slug: 'preguntas-clave',
    resumen: 'Lo que debes preguntar antes de visitar un criadero.',
    bodyMd: '- ¿Cuáles son las pruebas de salud de los padres?\n- ¿Puedo conocer el lugar de crianza?\n- ¿Qué garantías de salud ofreces por escrito?\n- ¿A qué edad entregas a los cachorros?',
    icono: 'HelpCircle'
  },
  {
    id: 'a3',
    titulo: 'Salud y Genética',
    slug: 'salud-genetica',
    resumen: 'Importancia de las pruebas de salud en los padres.',
    bodyMd: 'Un criador ético siempre realiza pruebas genéticas para evitar enfermedades como la displasia de cadera, atrofia de retina o problemas cardíacos específicos de la raza.',
    icono: 'Dna'
  },
  {
    id: 'a4',
    titulo: 'Contrato de Adquisición',
    slug: 'contrato-responsable',
    resumen: 'Por qué siempre debes exigir un documento firmado.',
    bodyMd: 'El contrato protege tanto al criador como al comprador, especificando garantías de salud, política de devolución y responsabilidades de tenencia responsable.',
    icono: 'ShieldCheck'
  },
  {
    id: 'a5',
    titulo: 'Socialización Temprana',
    slug: 'socializacion',
    resumen: 'La clave para un perro adulto equilibrado.',
    bodyMd: 'Los primeros meses son vitales. Un cachorro debe estar expuesto a ruidos, personas y superficies antes de las 12 semanas para evitar miedos futuros.',
    icono: 'Heart'
  }
];

export const mockConversations: Conversation[] = [];
export const mockMessages: Message[] = [];
