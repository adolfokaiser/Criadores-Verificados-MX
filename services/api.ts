
import { 
  User, BreederProfile, Litter, Conversation, Message, VerificationStatus, Article, BreederStats 
} from '../types';
import { mockUsers, mockBreeders, mockLitters, mockConversations, mockMessages, mockArticles } from './mockData';

// Simulated DB state
let users = [...mockUsers];
let breeders = [...mockBreeders];
let litters = [...mockLitters];
let conversations = [...mockConversations];
let messages = [...mockMessages];

export const api = {
  // Auth
  login: async (email: string): Promise<User | null> => {
    await new Promise(r => setTimeout(r, 800));
    return users.find(u => u.email === email) || null;
  },

  // Breeders
  getBreeders: async (filters?: { breed?: string, state?: string, quickFilter?: string, sortBy?: string }): Promise<BreederProfile[]> => {
    let results = breeders.filter(b => b.verificacionStatus === 'VERIFIED' || b.verificacionStatus === 'PENDING');
    
    if (filters?.breed) {
      results = results.filter(b => b.razasOfrecidas.includes(filters.breed!));
    }
    if (filters?.state) {
      results = results.filter(b => b.estado === filters.state);
    }

    // Quick Filters
    if (filters?.quickFilter === 'verified') {
      results = results.filter(b => b.verificacionStatus === 'VERIFIED');
    } else if (filters?.quickFilter === 'fast-response') {
      results = results.filter(b => (b.responseTimeAvgSeconds || 0) < 43200); // < 12h
    } else if (filters?.quickFilter === 'available') {
      const activeBreederIds = litters.filter(l => l.disponibilidad === 'Disponible').map(l => l.breederId);
      results = results.filter(b => activeBreederIds.includes(b.id));
    }

    // Sorting
    if (filters?.sortBy === 'recent') {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters?.sortBy === 'trust') {
      results.sort((a, b) => (b.responseRate30d || 0) - (a.responseRate30d || 0));
    }
    
    return results;
  },

  getBreederById: async (id: string): Promise<BreederProfile | null> => {
    return breeders.find(b => b.id === id) || null;
  },

  getBreederByUserId: async (userId: string): Promise<BreederProfile | null> => {
    return breeders.find(b => b.userId === userId) || null;
  },

  // Contenido Educativo
  getArticles: async (): Promise<Article[]> => {
    return mockArticles;
  },

  // Estadísticas (Simuladas)
  getBreederStats: async (breederId: string): Promise<BreederStats> => {
    return {
      profileViews30d: Math.floor(Math.random() * 500) + 50,
      chatStarts30d: Math.floor(Math.random() * 50) + 5,
      messagesReceived30d: Math.floor(Math.random() * 200) + 20,
    };
  },

  // Litters
  getLitters: async (breederId?: string): Promise<Litter[]> => {
    if (breederId) return litters.filter(l => l.breederId === breederId);
    return litters;
  },

  saveLitter: async (data: Omit<Litter, 'id'>): Promise<Litter> => {
    const newLitter = { ...data, id: Math.random().toString(36).substr(2, 9) };
    litters.push(newLitter);
    return newLitter;
  },

  // Chat
  getConversations: async (userId: string, role: string): Promise<Conversation[]> => {
    if (role === 'BREEDER') {
      const breeder = breeders.find(b => b.userId === userId);
      return conversations.filter(c => c.breederId === breeder?.id);
    }
    return conversations.filter(c => c.userId === userId);
  },

  getMessages: async (conversationId: string): Promise<Message[]> => {
    return messages.filter(m => m.conversationId === conversationId);
  },

  sendMessage: async (conversationId: string, senderId: string, text: string): Promise<Message> => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId,
      text,
      createdAt: new Date().toISOString()
    };
    messages.push(newMessage);
    
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.lastMessage = text;
      conv.updatedAt = new Date().toISOString();
    }
    
    return newMessage;
  },

  getOrCreateConversation: async (userId: string, breederId: string): Promise<Conversation> => {
    let conv = conversations.find(c => c.userId === userId && c.breederId === breederId);
    if (!conv) {
      const user = users.find(u => u.id === userId);
      const breeder = breeders.find(b => b.id === breederId);
      conv = {
        id: Math.random().toString(36).substr(2, 9),
        userId,
        breederId,
        userName: user?.nombre || 'Usuario',
        breederName: breeder?.nombreComercial || 'Criador',
        updatedAt: new Date().toISOString()
      };
      conversations.push(conv);
    }
    return conv;
  },

  // Moderation
  getPendingBreeders: async (): Promise<BreederProfile[]> => {
    return breeders.filter(b => b.verificacionStatus === 'PENDING');
  },

  updateVerificationStatus: async (id: string, status: VerificationStatus): Promise<void> => {
    const b = breeders.find(br => br.id === id);
    if (b) b.verificacionStatus = status;
  }
};
