import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ResultsScreenProps {
  results: {
    totalScore: number;
    answers: number[];
    timestamp: string;
  } | null;
  onSelfHelp: () => void;
  onBooking: () => void;
  onChatbot: () => void;
  onCrisis: () => void;
  language: string;
}

const translations = {
  en: {
    title: "Your Assessment Results",
    subtitle: "A snapshot of your current wellbeing",
    resultTitle: "Your Wellbeing Level",
    recommendations: "Recommended Next Steps",
    selfHelp: "Explore Self-Help Resources",
    selfHelpDesc: "Access guided meditation, wellness videos, and coping strategies.",
    bookCounselor: "Book a Counselor Session",
    bookCounselorDesc: "Schedule a confidential session with a licensed mental health professional.",
    chatSupport: "Chat with AI Support",
    chatSupportDesc: "Get immediate guidance and first-aid mental health support.",
    crisisHelp: "Get Immediate Help",
    crisisHelpDesc: "24/7 confidential support for crisis situations.",
    safetyNote: "It looks like you're going through a very difficult time. Please know that you're not alone and immediate help is available.",
    insights: "Key Insights",
    strained: {
      level: "Strained",
      tagline: "You’re carrying stress. It’s light now, but don’t ignore it.",
      insight: "Your results suggest you are experiencing some mild stress. Proactive self-care can be very beneficial."
    },
    struggling: {
      level: "Struggling",
      tagline: "You’re struggling more than you should. It’s time to seek help.",
      insight: "Your results indicate you are facing significant distress. Connecting with a professional could provide valuable support."
    },
    critical: {
      level: "Critical",
      tagline: "This is serious. You are not alone — reach out now.",
      insight: "Your results show a critical level of distress. It is highly recommended to seek immediate professional help."
    }
  },
  hi: {
    title: "आपके मूल्यांकन के परिणाम",
    subtitle: "आपकी वर्तमान भलाई का एक स्नैपशॉट",
    resultTitle: "आपकी भलाई का स्तर",
    recommendations: "अनुशंसित अगले कदम",
    selfHelp: "स्व-सहायता संसाधन देखें",
    selfHelpDesc: "निर्देशित ध्यान, कल्याण वीडियो और मुकाबला रणनीतियों तक पहुंचें।",
    bookCounselor: "परामर्शदाता सत्र बुक करें",
    bookCounselorDesc: "लाइसेंस प्राप्त मानसिक स्वास्थ्य पेशेवर के साथ गोपनीय सत्र निर्धारित करें।",
    chatSupport: "AI सहायता के साथ चैट करें",
    chatSupportDesc: "तत्काल मार्गदर्शन और प्राथमिक चिकित्सा मानसिक स्वास्थ्य सहायता प्राप्त करें।",
    crisisHelp: "तत्काल सहायता प्राप्त करें",
    crisisHelpDesc: "संकट की स्थितियों के लिए 24/7 गोपनीय सहायता।",
    safetyNote: "ऐसा लगता है कि आप बहुत कठिन समय से गुजर रहे हैं। कृपया जानें कि आप अकेले नहीं हैं और तत्काल सहायता उपलब्ध है।",
    insights: "मुख्य अंतर्दृष्टि",
    strained: {
      level: "तनावग्रस्त",
      tagline: "आप तनाव महसूस कर रहे हैं। यह अभी हल्का है, लेकिन इसे नज़रअंदाज़ न करें।",
      insight: "आपके परिणाम बताते हैं कि आप कुछ हल्के तनाव का अनुभव कर रहे हैं। सक्रिय आत्म-देखभाल बहुत फायदेमंद हो सकती है।"
    },
    struggling: {
      level: "संघर्षरत",
      tagline: "आप जितना चाहिए उससे ज़्यादा संघर्ष कर रहे हैं। मदद लेने का समय आ गया है।",
      insight: "आपके परिणाम बताते हैं कि आप महत्वपूर्ण संकट का सामना कर रहे हैं। किसी पेशेवर से जुड़ना बहुमूल्य सहायता प्रदान कर सकता है।"
    },
    critical: {
      level: "गंभीर",
      tagline: "यह गंभीर है। आप अकेले नहीं हैं — अभी संपर्क करें।",
      insight: "आपके परिणाम संकट का एक गंभीर स्तर दिखाते हैं। तत्काल पेशेवर मदद लेने की अत्यधिक अनुशंसा की जाती है।"
    }
  }
};

const getWellbeingLevel = (score: number) => {
  if (score <= 16) return 'strained';
  if (score <= 32) return 'struggling';
  return 'critical';
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'strained': return 'bg-green-100 text-green-800 border-green-200';
    case 'struggling': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function ResultsScreen({ results, onSelfHelp, onBooking, onChatbot, onCrisis, language }: ResultsScreenProps) {
  const t = translations[language as keyof typeof translations];
  
  if (!results) {
    return <div>No results available</div>;
  }

  const { totalScore, answers } = results;
  const wellbeingLevel = getWellbeingLevel(totalScore);
  const levelInfo = t[wellbeingLevel as 'strained' | 'struggling' | 'critical'];
  
  const crisisIndicators = answers.slice(12);
  const hasRiskFactors = crisisIndicators.some(answer => answer > 1);

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Safety Alert for Critical or High Risk */}
        {(wellbeingLevel === 'critical' || hasRiskFactors) && (
          <Alert className="border-red-200 bg-red-50 rounded-2xl">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {t.safetyNote}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Result Card */}
        <Card className="rounded-2xl border-accent/20 shadow-sm text-center">
            <CardHeader>
              <CardDescription>{t.resultTitle}</CardDescription>
              <CardTitle className="flex items-center justify-center space-x-2 text-3xl">
                <Badge className={`${getLevelColor(wellbeingLevel)} rounded-full text-2xl px-4 py-2`}>
                  {levelInfo.level}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground italic">"{levelInfo.tagline}"</p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>Your Score:</span>
                  <span className="font-bold text-foreground">{totalScore} / 48</span>
              </div>
            </CardContent>
        </Card>


        {/* Key Insights */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-primary" />
              <span>{t.insights}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-start space-x-3 p-3 rounded-xl ${
              wellbeingLevel === 'strained' ? 'bg-green-50' : 
              wellbeingLevel === 'struggling' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              {wellbeingLevel === 'strained' ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> : <AlertTriangle className={`w-5 h-5 mt-0.5 ${wellbeingLevel === 'struggling' ? 'text-yellow-600' : 'text-red-600'}`} />}
              <div>
                <p className={`text-sm ${
                  wellbeingLevel === 'strained' ? 'text-green-800' :
                  wellbeingLevel === 'struggling' ? 'text-yellow-800' : 'text-red-800'
                }`}>
                  {levelInfo.insight}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Actions */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>{t.recommendations}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {/* Crisis Support - shown for critical */}
              {wellbeingLevel === 'critical' && (
                <div className="flex items-start space-x-4 p-4 border border-red-200 bg-red-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-red-800">{t.crisisHelp}</h3>
                    <p className="text-sm text-red-700 mt-1">{t.crisisHelpDesc}</p>
                  </div>
                  <Button variant="destructive" className="rounded-xl" onClick={onCrisis}>
                    {t.crisisHelp}
                  </Button>
                </div>
              )}
              
              {/* Book Counselor - shown for struggling and critical */}
              {(wellbeingLevel === 'struggling' || wellbeingLevel === 'critical') && (
                <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{t.bookCounselor}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.bookCounselorDesc}</p>
                  </div>
                  <Button onClick={onBooking} className="rounded-xl">
                    Book Session
                  </Button>
                </div>
              )}

              {/* Self-Help Resources - shown for strained */}
              {wellbeingLevel === 'strained' && (
                <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{t.selfHelp}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.selfHelpDesc}</p>
                  </div>
                  <Button onClick={onSelfHelp} variant="outline" className="rounded-xl">
                    Explore
                  </Button>
                </div>
              )}

              {/* AI Chatbot - shown for strained and struggling */}
              {(wellbeingLevel === 'strained' || wellbeingLevel === 'struggling') && (
                <div className="flex items-start space-x-4 p-4 border border-accent/20 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{t.chatSupport}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.chatSupportDesc}</p>
                  </div>
                  <Button onClick={onChatbot} variant="outline" className="rounded-xl">
                    Chat Now
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}