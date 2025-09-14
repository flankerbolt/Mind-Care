// src/App.tsx

import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Globe, Heart, Brain, Calendar, BookOpen, MessageCircle, BarChart3, AlertTriangle, Users, LogIn, User, FileText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

// Import all screen components
import LoginScreen from './components/LoginScreen';
import OnboardingScreen from './components/OnboardingScreen';
import UserProfileDashboard from './components/UserProfileDashboard';
import AssessmentScreen from './components/AssessmentScreen';
import ResultsScreen from './components/ResultsScreen';
import SelfHelpScreen from './components/SelfHelpScreen';
import ChatbotScreen from './components/ChatbotScreen';
import BookingScreen from './components/BookingScreen';
import ProfileScreen from './components/ProfileScreen';
import AdminDashboard from './components/AdminDashboard';
import CrisisScreen from './components/CrisisScreen';
import PeerSupportScreen from './components/PeerSupportScreen';

// Define a type for the user object for better type safety
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  institution: string;
  gender?: string;
  yearOfStudy?: string;
  profilePhoto?: string | null;
  is2FAEnabled?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  sessionReminders?: boolean;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [language, setLanguage] = useState('en');
  
  // State for authentication and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [hasOnboarded, setHasOnboarded] = useState(false);

  // --- Demo Handlers ---

  const handleSignIn = (credentials: any) => {
    // For demo purposes, we'll create a mock user obj
    const mockUser: User = {
      id: 1,
      name: 'Priya Sharma', // Default name
      email: credentials.email,
      phone: '+91 98765 43210', // Default phone
      institution: 'Delhi University', // Default institution
    };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    setHasOnboarded(true);
    setCurrentScreen('dashboard');
  };

  const handleRegister = (userData: any) => {
    // For demo purposes, we'll use the registration data directly
    const newUser: User = {
      id: Date.now(), // Create a unique ID
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      institution: userData.institution,
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setHasOnboarded(false); // New user, so show onboarding
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const screens = {
    login: <LoginScreen
      onSignIn={handleSignIn}
      onRegister={handleRegister}
      language={language}
      setLanguage={setLanguage}
    />,
    onboarding: <OnboardingScreen
      onNext={handleOnboardingComplete}
      language={language}
      setLanguage={setLanguage}
    />,
    dashboard: <UserProfileDashboard
      language={language}
      onNavigate={setCurrentScreen}
      userName={currentUser?.name}
      userInstitution={currentUser?.institution}
      userEmail={currentUser?.email}
      profilePhoto={currentUser?.profilePhoto}
    />,
    assessment: <AssessmentScreen onComplete={(results) => {
      setAssessmentResults(results);
      setCurrentScreen('results');
    }} language={language} />,
    results: <ResultsScreen
      results={assessmentResults}
      onSelfHelp={() => setCurrentScreen('selfhelp')}
      onBooking={() => setCurrentScreen('booking')}
      onChatbot={() => setCurrentScreen('chatbot')}
      onCrisis={() => setCurrentScreen('crisis')}
      onTakeAssessment={() => setCurrentScreen('assessment')}
      language={language}
    />,
    selfhelp: <SelfHelpScreen language={language} />,
    chatbot: <ChatbotScreen language={language} onCrisis={() => setCurrentScreen('crisis')} />,
    booking: <BookingScreen language={language} setLanguage={setLanguage} />,
    profile: currentUser ? (
        <ProfileScreen 
          language={language} 
          setLanguage={setLanguage} 
          user={currentUser}
          onUpdateUser={setCurrentUser}
        />
    ) : null,
    peersupport: <PeerSupportScreen language={language} />,
    admin: <AdminDashboard />,
    crisis: <CrisisScreen language={language} setLanguage={setLanguage} onBack={() => setCurrentScreen('dashboard')} />
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'assessment', label: 'Assessment', icon: Brain },
    { id: 'results', label: 'Result', icon: FileText },
    { id: 'selfhelp', label: 'Resources', icon: BookOpen },
    { id: 'peersupport', label: 'Community', icon: Users },
    { id: 'booking', label: 'Booking Session', icon: Calendar },
    { id: 'chatbot', label: 'Chat Support', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (!isLoggedIn) {
    return screens.login;
  }

  if (!hasOnboarded) {
      return screens.onboarding;
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #ffffff 50%, #F0F9FF 100%)' }}>
        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                     style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">NIVI</h1>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentScreen(item.id)}
                      className={`group relative flex items-center justify-start overflow-hidden rounded-2xl transition-all duration-300 ease-in-out h-10 px-3
                        ${isActive
                          ? 'w-48 shadow-lg'
                          : 'w-10 hover:w-48 hover:bg-violet-100'
                        }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-black' : 'text-violet-600 group-hover:text-violet-700'}`} />
                        <span className={`whitespace-nowrap text-sm font-medium transition-opacity duration-300
                          ${isActive ? 'text-black opacity-100' : 'text-black opacity-0 group-hover:opacity-100' }
                          `}
                        >
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center space-x-3">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={() => setCurrentScreen('crisis')}
                            size="icon"
                            className="rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
                        >
                            <AlertTriangle className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>SOS</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            size="icon"
                            className="rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
                        >
                            <LogIn className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Logout</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            className="rounded-2xl font-medium border-gray-300 hover:bg-gray-50"
                        >
                            <Globe className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>हिन्दी</p>
                    </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-primary/10 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
          <div className="flex justify-around py-3">
            {[navigationItems[0], navigationItems[1], navigationItems[4], navigationItems[6]].map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)'
                  } : {}}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
            <Button
              size="sm"
              onClick={() => setCurrentScreen('crisis')}
              className="flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-2xl text-white shadow-md transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs font-medium">SOS</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="pb-20 md:pb-8">
          {screens[currentScreen as keyof typeof screens]}
        </main>
      </div>
    </TooltipProvider>
  );
}
