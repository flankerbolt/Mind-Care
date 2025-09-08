import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import {
  Heart,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Shield,
  UserPlus,
  Globe,
  CheckCircle
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const translations = {
  en: {
    welcome: "Welcome to Mind Care",
    subtitle: "Your safe space for mental wellness",
    description: "Join thousands of students who trust Mind Care for confidential mental health support.",
    login: "Sign In",
    register: "Create Account",
    email: "Email Address",
    phone: "Phone Number",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    institution: "Institution",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signUp: "Sign Up",
    signIn: "Sign In",
    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP",
    enterOtp: "Enter 6-digit OTP",
    privacyNotice: "By signing up, you agree to our privacy-first approach. Your data is encrypted and anonymous.",
    secureLogin: "🔒 Secure & Confidential",
    features: {
      anonymous: "Anonymous Support",
      secure: "End-to-End Security",
      available: "24/7 Available"
    },
    loginMethods: {
      email: "Email",
      phone: "Phone + OTP"
    },
    errors: {
      invalidEmail: "Please enter a valid email address.",
      passwordRequired: "Password is required.",
      passwordLength: "Password must be 8-20 characters long.",
      passwordComplexity: "Password must include uppercase, lowercase, number, and special character.",
      passwordMismatch: "Passwords do not match.",
      nameRequired: "Full name is required.",
      institutionRequired: "Institution is required."
    }
  },
  hi: {
    welcome: "Mind Care में आपका स्वागत है",
    subtitle: "मानसिक स्वास्थ्य के लिए आपका सुरक्षित स्थान",
    description: "हजारों छात्रों में शामिल हों जो गोपनीय मानसिक स्वास्थ्य सहायता के लिए Mind Care पर भरोसा करते हैं।",
    login: "साइन इन करें",
    register: "खाता बनाएं",
    email: "ईमेल पता",
    phone: "फोन नंबर",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    institution: "संस्थान",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "खाता नहीं है?",
    hasAccount: "पहले से खाता है?",
    signUp: "साइन अप करें",
    signIn: "साइन इन करें",
    sendOtp: "OTP भेजें",
    verifyOtp: "OTP सत्यापित करें",
    enterOtp: "6-अंकीय OTP दर्ज करें",
    privacyNotice: "साइन अप करके, आप हमारे गोपनीयता-प्राथमिक दृष्टिकोण से सहमत हैं। आपका डेटा एन्क्रिप्टेड और गुमनाम है।",
    secureLogin: "🔒 सुरक्षित और गोपनीय",
    features: {
      anonymous: "गुमनाम सहायता",
      secure: "एंड-टू-एंड सुरक्षा",
      available: "24/7 उपलब्ध"
    },
    loginMethods: {
      email: "ईमेल",
      phone: "फोन + OTP"
    },
    errors: {
        invalidEmail: "कृपया एक मान्य ईमेल पता दर्ज करें।",
        passwordRequired: "पासवर्ड आवश्यक है।",
        passwordLength: "पासवर्ड 8-20 अक्षरों का होना चाहिए।",
        passwordComplexity: "पासवर्ड में अपरकेस, लोअरकेस, नंबर और विशेष वर्ण शामिल होना चाहिए।",
        passwordMismatch: "पासवर्ड मेल नहीं खाते।",
        nameRequired: "पूरा नाम आवश्यक है।",
        institutionRequired: "संस्थान आवश्यक है।"
    }
  }
};

export default function LoginScreen({ onLogin, language, setLanguage }: LoginScreenProps) {
  const t = translations[language as keyof typeof translations];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: '',
    otp: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8 || password.length > 20) {
      return t.errors.passwordLength;
    }
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!re.test(password)) {
      return t.errors.passwordComplexity;
    }
    return '';
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSendOTP = () => {
    // Mock OTP sending
    setOtpSent(true);
  };

  const handleLogin = () => {
    const newErrors = { email: '', password: '', confirmPassword: '', fullName: '', institution: ''};
    if (loginMethod === 'email') {
      if (!formData.email || !validateEmail(formData.email)) {
        newErrors.email = t.errors.invalidEmail;
      }
      if (!formData.password) {
        newErrors.password = t.errors.passwordRequired;
      }
    }
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
        onLogin();
    }
  };

  const handleRegister = () => {
    const newErrors = { email: '', password: '', confirmPassword: '', fullName: '', institution: ''};
    if (!formData.fullName) newErrors.fullName = t.errors.nameRequired;
    if (!formData.institution) newErrors.institution = t.errors.institutionRequired;
    if (!validateEmail(formData.email)) newErrors.email = t.errors.invalidEmail;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.errors.passwordMismatch;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(x => x === '')) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #F0F9FF 100%)' }}>

      <div className="absolute top-6 right-6">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40 rounded-2xl border-white/50 bg-white/80 backdrop-blur-sm">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिंदी</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
                 style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold text-gray-800">
              {t.welcome}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
            <p className="text-gray-500 max-w-sm mx-auto">
              {t.description}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {Object.values(t.features).map((feature, index) => (
            <div key={index} className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-white/50">
              {feature}
            </div>
          ))}
        </div>

        <Card className="rounded-3xl shadow-2xl border-white/50 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100/80">
                <TabsTrigger value="login" className="rounded-2xl font-medium">
                  {t.login}
                </TabsTrigger>
                <TabsTrigger value="register" className="rounded-2xl font-medium">
                  {t.register}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setLoginMethod('email')}
                    className="rounded-2xl font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t.loginMethods.email}
                  </Button>
                  <Button
                    variant={loginMethod === 'phone' ? 'default' : 'outline'}
                    onClick={() => setLoginMethod('phone')}
                    className="rounded-2xl font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.loginMethods.phone}
                  </Button>
                </div>

                <div className="space-y-4">
                  {loginMethod === 'email' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="login-email">{t.email}</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="student@university.edu"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="rounded-2xl border-gray-200 bg-gray-50/50"
                        />
                         {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">{t.password}</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                      </div>
                    </>
                  ) : (
                    <>
                       <div className="space-y-2">
                        <Label htmlFor="login-phone">{t.phone}</Label>
                        <Input
                          id="login-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="rounded-2xl border-gray-200 bg-gray-50/50"
                        />
                      </div>

                      {!otpSent ? (
                        <Button
                          onClick={handleSendOTP}
                          className="w-full rounded-2xl font-medium"
                          style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
                        >
                          {t.sendOtp}
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="otp">{t.enterOtp}</Label>
                          <Input
                            id="otp"
                            placeholder="123456"
                            value={formData.otp}
                            onChange={(e) => handleInputChange('otp', e.target.value)}
                            className="rounded-2xl border-gray-200 bg-gray-50/50 text-center text-2xl tracking-widest"
                            maxLength={6}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {loginMethod === 'email' && (
                  <div className="text-right">
                    <Button variant="link" className="text-primary p-0 h-auto font-medium">
                      {t.forgotPassword}
                    </Button>
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  className="w-full h-12 rounded-2xl font-medium text-lg text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}
                >
                  {t.signIn}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t.fullName}</Label>
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                     {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-institution">{t.institution}</Label>
                    <Input
                      id="register-institution"
                      placeholder="University Name"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="rounded-2xl border-gray-200 bg-gray-50/50"
                    />
                    {errors.institution && <p className="text-red-500 text-xs">{errors.institution}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                      />
                       <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                    </div>
                     {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                       <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="rounded-2xl border-gray-200 bg-gray-50/50 pr-12"
                      />
                       <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                     {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {t.privacyNotice}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  className="w-full h-12 rounded-2xl font-medium text-lg text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {t.signUp}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>{t.secureLogin}</span>
          </p>
        </div>
      </div>
    </div>
  );
}