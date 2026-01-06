
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import BreederProfileView from './views/BreederProfileView';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import BreederDashboard from './views/BreederDashboard';
import AdminDashboard from './views/AdminDashboard';
import UserProfileView from './views/UserProfileView';
import { User } from './types';
import { api } from './services/api';

type View = 'home' | 'search' | 'breeder-profile' | 'messages' | 'profile' | 'login' | 'dashboard-breeder' | 'dashboard-admin' | 'dashboard-user';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedBreederId, setSelectedBreederId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();

  const handleNavigate = (view: string) => {
    if (view === 'profile') {
      if (!currentUser) {
        setCurrentView('login');
      } else if (currentUser.role === 'BREEDER') {
        setCurrentView('dashboard-breeder');
      } else if (currentUser.role === 'ADMIN') {
        setCurrentView('dashboard-admin');
      } else {
        setCurrentView('dashboard-user'); 
      }
      return;
    }

    if (view === 'messages' && !currentUser) {
      setCurrentView('login');
      return;
    }

    setCurrentView(view as View);
  };

  const handleBreederSelect = (id: string) => {
    setSelectedBreederId(id);
    setCurrentView('breeder-profile');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'BREEDER') setCurrentView('dashboard-breeder');
    else if (user.role === 'ADMIN') setCurrentView('dashboard-admin');
    else if (user.role === 'USER') setCurrentView('dashboard-user');
    else setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleContactBreeder = async (breederId: string) => {
    if (!currentUser) {
      setCurrentView('login');
      return;
    }
    const conv = await api.getOrCreateConversation(currentUser.id, breederId);
    setSelectedChatId(conv.id);
    setCurrentView('messages');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onSearch={() => setCurrentView('search')} />;
      case 'search':
        return <SearchView onSelectBreeder={handleBreederSelect} />;
      case 'breeder-profile':
        return (
          <BreederProfileView 
            breederId={selectedBreederId!} 
            currentUser={currentUser}
            onContact={handleContactBreeder}
            onLogin={() => setCurrentView('login')}
          />
        );
      case 'messages':
        return currentUser ? (
          <ChatView 
            currentUser={currentUser} 
            onBack={() => setCurrentView('home')} 
            selectedConversationId={selectedChatId}
          />
        ) : <LoginView onSuccess={handleLoginSuccess} />;
      case 'login':
        return <LoginView onSuccess={handleLoginSuccess} />;
      case 'dashboard-breeder':
        return currentUser ? <BreederDashboard currentUser={currentUser} onLogout={handleLogout} /> : <LoginView onSuccess={handleLoginSuccess} />;
      case 'dashboard-admin':
        return currentUser ? <AdminDashboard currentUser={currentUser} onLogout={handleLogout} /> : <LoginView onSuccess={handleLoginSuccess} />;
      case 'dashboard-user':
        return currentUser ? <UserProfileView user={currentUser} onLogout={handleLogout} /> : <LoginView onSuccess={handleLoginSuccess} />;
      default:
        return <HomeView onSearch={() => setCurrentView('search')} />;
    }
  };

  return (
    <Layout 
      user={currentUser} 
      onNavigate={handleNavigate} 
      currentView={currentView}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
