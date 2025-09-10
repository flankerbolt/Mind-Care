import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Brain, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface AssessmentScreenProps {
  onComplete: (results: any) => void;
  language: string;
}

const translations = {
  en: {
    title: "NIVI Self-Assessment",
    subtitle: "Understanding your current wellbeing",
    description: "Please answer these questions honestly based on your feelings over the last 2 weeks. This helps us provide personalized support.",
    questionHeader: "Question",
    options: [
      "Rarely or never",
      "Sometimes",
      "Often",
      "Almost every day"
    ],
    next: "Next",
    previous: "Previous",
    complete: "See My Results",
    confidential: "Confidential & Secure"
  },
  hi: {
    title: "NIVI स्व-मूल्यांकन",
    subtitle: "आपकी वर्तमान भलाई को समझना",
    description: "कृपया पिछले 2 हफ्तों में अपनी भावनाओं के आधार पर इन सवालों का ईमानदारी से जवाब दें। यह हमें व्यक्तिगत सहायता प्रदान करने में मदद करता है।",
    questionHeader: "प्रश्न",
    options: [
      "शायद ही कभी या कभी नहीं",
      "कभी-कभी",
      "अक्सर",
      "लगभग हर दिन"
    ],
    next: "अगला",
    previous: "पिछला",
    complete: "मेरे परिणाम देखें",
    confidential: "गोपनीय और सुरक्षित"
  }
};

const assessmentQuestions = {
  en: [
    // Emotional Well-being
    "In the past 2 weeks, how often have you felt weighed down by sadness or emptiness?",
    "How often do you feel anxious, restless, or unable to relax?",
    "Do you feel hopeful about your future?",
    "How often do you feel lonely, even when people are around you?",
    // Academic & Daily Functioning
    "Do you find it hard to concentrate on studies or tasks?",
    "How do you feel about your academic/career pressure right now?",
    "How often do you avoid tasks because you feel you can’t handle them?",
    "How satisfied are you with your sleep in the past 2 weeks?",
    // Physical Symptoms
    "How often have you been bothered by unexplained aches, headaches, or stomach issues?",
    "How would you rate your energy levels recently?",
    "Have you noticed significant changes in your appetite (eating much more or less)?",
    "How often do you feel like you’re just “going through the motions” without meaning?",
    // Risk & Crisis Indicators
    "Have you had thoughts like “I don’t want to exist anymore”?",
    "Have you ever thought of hurting yourself when things feel unbearable?",
    "In the past 2 weeks, how often did you feel that life is not worth living?",
    "If given a choice right now, how strongly do you wish to escape everything?"
  ],
  hi: [
    // Emotional Well-being
    "पिछले 2 हफ्तों में, आप कितनी बार उदासी या खालीपन से बोझिल महसूस करते हैं?",
    "आप कितनी बार चिंतित, बेचैन, या आराम करने में असमर्थ महसूस करते हैं?",
    "क्या आप अपने भविष्य के बारे में आशान्वित महसूस करते हैं?",
    "आप कितनी बार अकेला महसूस करते हैं, तब भी जब आपके आस-पास लोग होते हैं?",
    // Academic & Daily Functioning
    "क्या आपको पढ़ाई या कार्यों पर ध्यान केंद्रित करना मुश्किल लगता है?",
    "आप अभी अपने शैक्षणिक/करियर दबाव के बारे में कैसा महसूस करते हैं?",
    "आप कितनी बार कार्यों से बचते हैं क्योंकि आपको लगता है कि आप उन्हें संभाल नहीं सकते?",
    "पिछले 2 हफ्तों में आप अपनी नींद से कितने संतुष्ट हैं?",
    // Physical Symptoms
    "आप कितनी बार अस्पष्टीकृत दर्द, सिरदर्द, या पेट की समस्याओं से परेशान हुए हैं?",
    "आप हाल ही में अपने ऊर्जा स्तर को कैसे रेट करेंगे?",
    "क्या आपने अपनी भूख में महत्वपूर्ण बदलाव देखे हैं (बहुत अधिक या कम खाना)?",
    "आप कितनी बार महसूस करते हैं कि आप बिना किसी मतलब के बस 'गतिविधियों से गुजर रहे हैं'?",
    // Risk & Crisis Indicators
    "क्या आपके मन में ऐसे विचार आए हैं जैसे 'मैं अब और अस्तित्व में नहीं रहना चाहता'?",
    "क्या आपने कभी असहनीय लगने पर खुद को चोट पहुँचाने के बारे में सोचा है?",
    "पिछले 2 हफ्तों में, आपने कितनी बार महसूस किया कि जीवन जीने लायक नहीं है?",
    "यदि अभी एक विकल्प दिया जाए, तो आप हर चीज से कितनी दृढ़ता से बचना चाहते हैं?"
  ]
};

export default function AssessmentScreen({ onComplete, language }: AssessmentScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(16).fill(-1));
  
  const totalQuestions = 16;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  
  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  const canProceed = answers[currentStep] !== -1;
  
  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = answers.reduce((sum, answer) => sum + (answer >= 0 ? answer : 0), 0);
      
      onComplete({
        totalScore,
        answers,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.subtitle}
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {t.description}
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t.confidential}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t.questionHeader} {currentStep + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        {/* Question Card */}
        <Card className="rounded-2xl border-accent/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base leading-relaxed">
              {assessmentQuestions[language as keyof typeof assessmentQuestions][currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentStep]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              {t.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {index}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-xl"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t.previous}
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-primary'
                    : index === currentStep
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="rounded-xl"
          >
            {currentStep === totalQuestions - 1 ? t.complete : t.next}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}