import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Heart,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  Video
} from 'lucide-react';

// Error Fix 1: Add onNavigate to the props interface
interface UserProfileDashboardProps {
  language: string;
  onNavigate: (screen: string) => void;
}

const translations = {
  en: {
    welcome: "Welcome back, Samir!",
    subtitle: "Here's your personalized mental wellness dashboard.",
    assessmentCard: {
      title: "Your Wellbeing Score",
      status: "Strained",
      description: "Based on your last assessment on 24 Aug, 2024.",
      retake: "Retake Assessment"
    },
    recommendations: {
      title: "Recommended For You",
      resource: "5-Minute Breathing Exercise",
      counselor: "Book a session with Dr. Priya Sharma",
      community: "Join the Anxiety Support Group"
    },
    upcoming: {
      title: "Upcoming Sessions",
      counselor: "Dr. Priya Sharma",
      date: "Tomorrow, 2:00 PM",
      join: "Join Video Call"
    },
    progress: {
      title: "Your Progress",
      description: "You've completed 3 sessions and 5 self-help activities this month!",
      view: "View Detailed Progress"
    },
    quickAccess: {
      title: "Quick Access",
      selfHelp: "Self-Help Library",
      booking: "Book a Session",
      community: "Peer Community",
      chatbot: "AI Chatbot"
    }
  },
  hi: {
    welcome: "वापसी पर स्वागत है, समीर!",
    subtitle: "यह आपका व्यक्तिगत मानसिक स्वास्थ्य डैशबोर्ड है।",
    assessmentCard: {
      title: "आपकी भलाई का स्कोर",
      status: "तनावग्रस्त",
      description: "24 अगस्त, 2024 को आपके अंतिम मूल्यांकन के आधार पर।",
      retake: "पुनः मूल्यांकन करें"
    },
    recommendations: {
      title: "आपके लिए अनुशंसित",
      resource: "5 मिनट का श्वास व्यायाम",
      counselor: "डॉ. प्रिया शर्मा के साथ एक सत्र बुक करें",
      community: "चिंता सहायता समूह में शामिल हों"
    },
    upcoming: {
      title: "आगामी सत्र",
      counselor: "डॉ. प्रिया शर्मा",
      date: "कल, दोपहर 2:00 बजे",
      join: "वीडियो कॉल में शामिल हों"
    },
    progress: {
      title: "आपकी प्रगति",
      description: "आपने इस महीने 3 सत्र और 5 स्व-सहायता गतिविधियाँ पूरी की हैं!",
      view: "विस्तृत प्रगति देखें"
    },
    quickAccess: {
      title: "त्वरित पहुँच",
      selfHelp: "स्व-सहायता लाइब्रेरी",
      booking: "सत्र बुक करें",
      community: "साथी समुदाय",
      chatbot: "AI चैटबॉट"
    }
  }
};

// Error Fix 2: Accept onNavigate in the function definition
export default function UserProfileDashboard({ language, onNavigate }: UserProfileDashboardProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">{t.welcome}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Samir Shaw" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Card */}
            <Card className="rounded-2xl border-accent/20 shadow-sm bg-gradient-to-br from-primary/5 via-white to-secondary/5">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{t.assessmentCard.title}</CardTitle>
                  <CardDescription className="mt-1">{t.assessmentCard.description}</CardDescription>
                   {/* Error Fix 3: Use the onNavigate function on all buttons */}
                  <Button size="sm" className="mt-4 rounded-xl" onClick={() => onNavigate('assessment')}>
                    {t.assessmentCard.retake}
                  </Button>
                </div>
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-lg rounded-full px-4 py-2">
                    {t.assessmentCard.status}
                  </Badge>
                  <p className="font-bold text-5xl text-green-600 mt-2">12/48</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary" />
                  {t.recommendations.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <p>{t.recommendations.resource}</p>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onNavigate('selfhelp')}>
                    Start <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <p>{t.recommendations.counselor}</p>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onNavigate('booking')}>
                    Book <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <p>{t.recommendations.community}</p>
                  <Button size="sm" variant="outline" className="rounded-xl" onClick={() => onNavigate('peersupport')}>
                    Join <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Session */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  {t.upcoming.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/20">PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{t.upcoming.counselor}</p>
                    <p className="text-sm text-muted-foreground">{t.upcoming.date}</p>
                  </div>
                </div>
                <Button className="w-full rounded-xl">
                  <Video className="w-4 h-4 mr-2" />
                  {t.upcoming.join}
                </Button>
              </CardContent>
            </Card>

            {/* Your Progress */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  {t.progress.title}
                </CardTitle>
                <CardDescription>{t.progress.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={66} className="h-2 rounded-full" />
                <Button variant="link" className="p-0 h-auto mt-3 text-primary">
                  {t.progress.view}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Quick Access */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle>{t.quickAccess.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-1 rounded-2xl" onClick={() => onNavigate('selfhelp')}>
              <BookOpen />
              <span>{t.quickAccess.selfHelp}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-1 rounded-2xl" onClick={() => onNavigate('booking')}>
              <Calendar />
              <span>{t.quickAccess.booking}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-1 rounded-2xl" onClick={() => onNavigate('peersupport')}>
              <Users />
              <span>{t.quickAccess.community}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-1 rounded-2xl" onClick={() => onNavigate('chatbot')}>
              <MessageCircle />
              <span>{t.quickAccess.chatbot}</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}