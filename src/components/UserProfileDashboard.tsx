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
  Video,
  MailCheck,
  Camera,
  BarChart2,
  Zap
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from './ui/chart';

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
    profileCompletion: {
        title: "Complete Your Profile",
        description: "You have a few steps left to get the most out of NIVI.",
        steps: {
            email: "Verify Email",
            photo: "Add Profile Photo",
            preferences: "Set Preferences"
        },
        button: "Go to Profile"
    },
    quickAccess: {
      title: "Quick Access",
      selfHelp: "Self-Help Library",
      booking: "Book a Session",
      community: "Peer Community",
      chatbot: "AI Chatbot"
    },
    recentActivity: {
        title: "Your Recent Activity",
        description: "Your mood score over the last 7 days.",
        moodScore: "Mood Score"
    },
    discoverMore: {
        title: "Discover More",
        peerSupport: "Peer Support",
        peerSupportDesc: "Connect with a supportive community.",
        selfHelp: "Self-Help Library",
        selfHelpDesc: "Explore articles, videos, and exercises.",
        crisisSupport: "Crisis Support",
        crisisSupportDesc: "Immediate help is available 24/7."
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
    profileCompletion: {
        title: "अपनी प्रोफाइल पूरी करें",
        description: "NIVI का अधिकतम लाभ उठाने के लिए आपके कुछ ही कदम बचे हैं।",
        steps: {
            email: "ईमेल सत्यापित करें",
            photo: "प्रोफ़ाइल फ़ोटो जोड़ें",
            preferences: "प्राथमिकताएँ निर्धारित करें"
        },
        button: "प्रोफ़ाइल पर जाएं"
    },
    quickAccess: {
      title: "त्वरित पहुँच",
      selfHelp: "स्व-सहायता लाइब्रेरी",
      booking: "सत्र बुक करें",
      community: "साथी समुदाय",
      chatbot: "AI चैटबॉट"
    },
    recentActivity: {
        title: "आपकी हाल की गतिविधि",
        description: "पिछले 7 दिनों में आपका मूड स्कोर।",
        moodScore: "मूड स्कोर"
    },
    discoverMore: {
        title: "और जानें",
        peerSupport: "साथी सहायता",
        peerSupportDesc: "एक सहायक समुदाय से जुड़ें।",
        selfHelp: "स्व-सहायता लाइब्रेरी",
        selfHelpDesc: "लेख, वीडियो और व्यायाम देखें।",
        crisisSupport: "संकट सहायता",
        crisisSupportDesc: "तत्काल सहायता 24/7 उपलब्ध है।"
    }
  }
};

const activityData = [
  { day: "Mon", mood: 7 },
  { day: "Tue", mood: 6 },
  { day: "Wed", mood: 8 },
  { day: "Thu", mood: 7 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
];

const chartConfig = {
  mood: {
    label: "Mood",
    color: "hsl(var(--primary))",
  },
};

export default function UserProfileDashboard({ language, onNavigate }: UserProfileDashboardProps) {
  const t = translations[language as keyof typeof translations];
  const profileCompletionPercentage = 75;

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
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

            {/* Recent Activity */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <BarChart2 className="w-5 h-5 mr-2 text-primary" />
                        {t.recentActivity.title}
                    </CardTitle>
                    <CardDescription>{t.recentActivity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="fillMood" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-mood)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-mood)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                            <Tooltip content={<ChartTooltipContent indicator="line" />} />
                            <Area
                                dataKey="mood"
                                type="natural"
                                fill="url(#fillMood)"
                                stroke="var(--color-mood)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
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

            {/* Complete Your Profile Card */}
            <Card className="rounded-2xl border-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  {t.profileCompletion.title}
                </CardTitle>
                <CardDescription>{t.profileCompletion.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={profileCompletionPercentage} className="h-2 rounded-full" />
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center"><MailCheck className="w-4 h-4 mr-2 text-green-500"/> <span>{t.profileCompletion.steps.email}</span></div>
                    <div className="flex items-center"><Camera className="w-4 h-4 mr-2 text-gray-400"/> <span>{t.profileCompletion.steps.photo}</span></div>
                    <div className="flex items-center"><Settings className="w-4 h-4 mr-2 text-gray-400"/> <span>{t.profileCompletion.steps.preferences}</span></div>
                </div>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => onNavigate('profile')}>
                  {t.profileCompletion.button}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Discover More */}
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t.discoverMore.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Peer Support Card */}
                <Card className="rounded-2xl border-accent/20 shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
                            <Users className="w-6 h-6 text-blue-600"/>
                        </div>
                        <CardTitle>{t.discoverMore.peerSupport}</CardTitle>
                        <CardDescription>{t.discoverMore.peerSupportDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="link" className="p-0 text-primary" onClick={() => onNavigate('peersupport')}>
                            Join Community <ArrowRight className="w-4 h-4 ml-1"/>
                        </Button>
                    </CardContent>
                </Card>
                {/* Self Help Card */}
                <Card className="rounded-2xl border-accent/20 shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                         <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-2">
                            <BookOpen className="w-6 h-6 text-green-600"/>
                        </div>
                        <CardTitle>{t.discoverMore.selfHelp}</CardTitle>
                        <CardDescription>{t.discoverMore.selfHelpDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="link" className="p-0 text-primary" onClick={() => onNavigate('selfhelp')}>
                            Explore Resources <ArrowRight className="w-4 h-4 ml-1"/>
                        </Button>
                    </CardContent>
                </Card>
                {/* Crisis Support Card */}
                <Card className="rounded-2xl border-accent/20 shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader>
                         <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-2">
                            <Zap className="w-6 h-6 text-red-600"/>
                        </div>
                        <CardTitle>{t.discoverMore.crisisSupport}</CardTitle>
                        <CardDescription>{t.discoverMore.crisisSupportDesc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="link" className="p-0 text-primary" onClick={() => onNavigate('crisis')}>
                            Get Help Now <ArrowRight className="w-4 h-4 ml-1"/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}