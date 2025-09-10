import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    ArrowRight,
    BookOpen,
    Calendar,
    Heart,
    MessageCircle,
    Settings,
    Users,
    Video,
    BarChart2,
    TrendingUp,
    BadgeCheck, // Verified icon
    Building,   // Institution icon
    AtSign,     // Username/Email icon
    User as UserIcon, // Icon for Personal Information
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from './ui/chart';

interface UserProfileDashboardProps {
    language: string;
    onNavigate: (screen: string) => void;
}

const translations = {
    en: {
        welcome: "Welcome back, Samir!",
        subtitle: "Here's your personalized mental wellness dashboard.",
        personalInfo: {
            title: "Personal Information", // Title added
            name: "Samir Shaw",
            institution: "Kolkata University",
            username: "@samir_shaw",
            edit: "Edit Profile"
        },
        upcoming: {
            title: "Upcoming Sessions",
            counselor: "Dr. Priya Sharma",
            date: "Tomorrow, 2:00 PM",
            join: "Join Video Call"
        },
        recommendations: {
            title: "Recommended For You",
            resource: "5-Minute Breathing Exercise",
            counselor: "Book a session with Dr. Priya Sharma",
            community: "Join the Anxiety Support Group"
        },
        recentActivity: {
            title: "Your Recent Activity",
            description: "Your mood score over the last 7 days.",
            moodStats: {
                average: "Avg Mood",
                highest: "Highest Mood",
                lowest: "Lowest Mood"
            }
        },
        quickAccess: {
            title: "Quick Access",
            selfHelp: "Self-Help Library",
            booking: "Book a Session",
            community: "Peer Community",
            chatbot: "AI Chatbot"
        },
    },
    hi: {
        welcome: "वापसी पर स्वागत है, समीर!",
        subtitle: "यह आपका व्यक्तिगत मानसिक स्वास्थ्य डैशबोर्ड है।",
        personalInfo: {
            title: "व्यक्तिगत जानकारी", // Title added
            name: "समीर शॉ",
            institution: "कोलकाता विश्वविद्यालय",
            username: "@samir_shaw",
            edit: "प्रोफ़ाइल संपादित करें"
        },
        upcoming: {
            title: "आगामी सत्र",
            counselor: "डॉ. प्रिया शर्मा",
            date: "कल, दोपहर 2:00 बजे",
            join: "वीडियो कॉल में शामिल हों"
        },
        recommendations: {
            title: "आपके लिए अनुशंसित",
            resource: "5 मिनट का श्वास व्यायाम",
            counselor: "डॉ. प्रिया शर्मा के साथ एक सत्र बुक करें",
            community: "चिंता सहायता समूह में शामिल हों"
        },
        recentActivity: {
            title: "आपकी हाल की गतिविधि",
            description: "पिछले 7 दिनों में आपका मूड स्कोर।",
            moodStats: {
                average: "औसत मूड",
                highest: "उच्चतम मूड",
                lowest: "न्यूनतम मूड"
            }
        },
        quickAccess: {
            title: "त्वरित पहुँच",
            selfHelp: "स्व-सहायता लाइब्रेरी",
            booking: "सत्र बुक करें",
            community: "साथी समुदाय",
            chatbot: "AI चैटबॉट"
        },
    }
};

const activityData = [
    { day: "Mon", mood: 7 }, { day: "Tue", mood: 6 }, { day: "Wed", mood: 8 },
    { day: "Thu", mood: 7 }, { day: "Fri", mood: 9 }, { day: "Sat", mood: 8 },
    { day: "Sun", mood: 7 },
];

const chartConfig = {
    mood: { label: "Mood", color: "hsl(var(--primary))" },
};

export default function UserProfileDashboard({ language, onNavigate }: UserProfileDashboardProps) {
    const t = translations[language as keyof typeof translations];
    const [profileCompletion] = useState(100);

    // Calculate mood statistics
    const moods = activityData.map(d => d.mood);
    const avgMood = (moods.reduce((a, b) => a + b, 0) / moods.length).toFixed(1);
    const highestMood = Math.max(...moods);
    const lowestMood = Math.min(...moods);

    return (
        <div className="min-h-screen bg-background p-4 pb-20">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-foreground">{t.welcome}</h1>
                        <p className="text-md text-muted-foreground">{t.subtitle}</p>
                    </div>
                    {/* The icons that were here have been removed */}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recommendations */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Heart className="w-5 h-5 mr-2 text-primary" />
                                    {t.recommendations.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Recommendation Items */}
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <p className="text-sm">{t.recommendations.resource}</p>
                                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => onNavigate('selfhelp')}>
                                        Start <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <p className="text-sm">{t.recommendations.counselor}</p>
                                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => onNavigate('booking')}>
                                        Book <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <p className="text-sm">{t.recommendations.community}</p>
                                    <Button size="sm" variant="outline" className="rounded-lg" onClick={() => onNavigate('peersupport')}>
                                        Join <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity & Mood Stats */}
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <BarChart2 className="w-5 h-5 mr-2 text-primary" />
                                    {t.recentActivity.title}
                                </CardTitle>
                                <CardDescription>{t.recentActivity.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                {/* Mood Stats */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline p-3 bg-muted/50 rounded-lg">
                                        <span className="text-sm text-muted-foreground">{t.recentActivity.moodStats.average}</span>
                                        <span className="text-2xl font-bold text-primary">{avgMood}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline p-3 bg-muted/50 rounded-lg">
                                        <span className="text-sm text-muted-foreground">{t.recentActivity.moodStats.highest}</span>
                                        <span className="text-2xl font-bold text-green-500">{highestMood}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline p-3 bg-muted/50 rounded-lg">
                                        <span className="text-sm text-muted-foreground">{t.recentActivity.moodStats.lowest}</span>
                                        <span className="text-2xl font-bold text-red-500">{lowestMood}</span>
                                    </div>
                                </div>
                                {/* Mood Chart */}
                                <div>
                                    <ChartContainer config={chartConfig} className="h-[180px] w-full">
                                        <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="fillMood" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--color-mood)" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="var(--color-mood)" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                            <Tooltip content={<ChartTooltipContent indicator="line" />} />
                                            <Area dataKey="mood" type="natural" fill="url(#fillMood)" stroke="var(--color-mood)" stackId="a" />
                                        </AreaChart>
                                    </ChartContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - UPDATED COMBINED CARD */}
                    <Card className="rounded-2xl shadow-sm lg:col-span-1 h-full">
                        <CardContent className="p-0 flex flex-col h-full">
                            {/* Personal Info Section */}
                            <div className="p-6 flex flex-col items-center text-center">
                                <h3 className="flex items-center text-lg font-semibold mb-4">
                                    <UserIcon className="w-5 h-5 mr-2 text-primary" />
                                    {t.personalInfo.title}
                                </h3>
                                <div className="relative mb-4">
                                    <Avatar className="w-24 h-24 text-3xl">
                                        <AvatarImage src="https://github.com/shadcn.png" alt={t.personalInfo.name} />
                                        <AvatarFallback>SS</AvatarFallback>
                                    </Avatar>
                                    {profileCompletion === 100 && (
                                        <BadgeCheck className="absolute top-1 right-1 w-6 h-6 text-green-500 fill-white" />
                                    )}
                                </div>
                                <div className="space-y-1 mb-4">
                                    <h2 className="text-xl font-bold">{t.personalInfo.name}</h2>
                                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                                        <Building className="w-4 h-4" />
                                        <p className="text-sm">{t.personalInfo.institution}</p>
                                    </div>
                                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                                        <AtSign className="w-4 h-4" />
                                        <p className="text-sm">{t.personalInfo.username}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full rounded-lg" onClick={() => onNavigate('profile')}>
                                    {t.personalInfo.edit}
                                </Button>
                            </div>

                            {/* Separator */}
                            <hr className="w-11/12 mx-auto" />

                            {/* Upcoming Session Section */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div className="space-y-5">
                                    <h3 className="flex items-center text-lg font-semibold">
                                        <Calendar className="w-5 h-5 mr-2 text-primary" />
                                        {t.upcoming.title}
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-16 h-16">
                                            <AvatarFallback className="bg-primary/20 text-lg font-semibold">PS</AvatarFallback>
                                            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=PriyaSharma&backgroundColor=a8d8ff,b6e3f4,c0aede,d1d4f4,ffd5dc,ffdfbf&backgroundType=gradientLinear" alt={t.upcoming.counselor} />
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg">{t.upcoming.counselor}</p>
                                            <p className="text-md text-muted-foreground">{t.upcoming.date}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full rounded-lg text-base py-3 mt-4">
                                    <Video className="w-5 h-5 mr-2" />
                                    {t.upcoming.join}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Access */}
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">{t.quickAccess.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-24 flex-col space-y-2 rounded-lg" onClick={() => onNavigate('selfhelp')}>
                            <BookOpen className="w-6 h-6 text-primary" />
                            <span className="text-xs text-center">{t.quickAccess.selfHelp}</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col space-y-2 rounded-lg" onClick={() => onNavigate('booking')}>
                            <Calendar className="w-6 h-6 text-primary" />
                            <span className="text-xs text-center">{t.quickAccess.booking}</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col space-y-2 rounded-lg" onClick={() => onNavigate('peersupport')}>
                            <Users className="w-6 h-6 text-primary" />
                            <span className="text-xs text-center">{t.quickAccess.community}</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col space-y-2 rounded-lg" onClick={() => onNavigate('chatbot')}>
                            <MessageCircle className="w-6 h-6 text-primary" />
                            <span className="text-xs text-center">{t.quickAccess.chatbot}</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}