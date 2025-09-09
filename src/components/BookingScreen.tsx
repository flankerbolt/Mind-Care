import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import MultiStepBookingScreen from './MultiStepBookingScreen';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  Phone,
  Star,
  MapPin,
  Shield,
  CheckCircle,
  User,
  Languages,
  Search,
  Filter,
  Users,
  Heart,
  Zap,
  Award,
  UserCheck,
  Calendar as CalIcon,
  Download,
  ArrowLeft,
  FileText,
  CreditCard,
  ChevronRight
} from 'lucide-react';

interface BookingScreenProps {
  language: string;
  setLanguage?: (lang: string) => void;
}

// Type definitions for our data
interface Counselor {
  id: number;
  name: string;
  title: string;
  rating: number;
  experience: string;
  languages: string[];
  specializations: string[];
  nextAvailable: string;
  image: string;
  sessionTypes: string[];
  verified: boolean;
  bio: string;
}

interface GroupSession {
  id: number;
  title: string;
  facilitator: string;
  date: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  fee: string;
  description: string;
}

interface Booking {
    id: number;
    counselor: string;
    date: string;
    time: string;
    type: string;
    status: "upcoming" | "completed" | "cancelled";
    sessionId: string;
}

interface CounselorCardProps {
  counselor: Counselor;
  onViewProfile: (counselor: Counselor) => void;
}

interface GroupSessionCardProps {
  session: GroupSession;
}


const translations = {
  en: {
    title: "Book Counseling Sessions",
    subtitle: "Connect with licensed mental health professionals",
    tabs: {
      individual: "Individual Therapy",
      group: "Group Sessions",
      emergency: "Emergency Support",
      myBookings: "My Bookings"
    },
    individual: {
      title: "One-on-One Counseling",
      subtitle: "Private sessions with licensed therapists",
      selectCounselor: "Choose Your Counselor",
      viewProfile: "View Profile",
      bookNow: "Book Now"
    },
    group: {
      title: "Group Therapy Sessions",
      subtitle: "Join supportive group discussions",
      availableSessions: "Available Sessions",
      joinSession: "Join Session",
      participants: "participants"
    },
    emergency: {
      title: "Immediate Support",
      subtitle: "Get help when you need it most",
      available24: "Available 24/7",
      callNow: "Call Now",
      chatNow: "Chat Now"
    },
    myBookings: {
      title: "My Appointments",
      subtitle: "Manage your scheduled sessions",
      upcoming: "Upcoming",
      past: "Past",
      cancelled: "Cancelled",
      reschedule: "Reschedule",
      cancel: "Cancel",
      join: "Join Session",
      viewDetails: "View Details"
    },
    bookingDetails: {
        title: "Appointment Details",
        back: "Back to Bookings",
        counselorInfo: "Counselor Information",
        patientInfo: "Patient Information",
        bookingInfo: "Booking Information",
        priceDetails: "Price Details",
        listingPrice: "Listing Price",
        discount: "Discount",
        total: "Total Amount",
        downloadInvoice: "Download Invoice",
        status: "Status",
        date: "Date",
        time: "Time",
        mode: "Mode",
        duration: "Duration"
    },
    selectDateTime: "Select Date & Time",
    sessionDetails: "Session Details",
    bookingConfirm: "Confirm Booking",
    sessionTypes: {
      video: "Video Call",
      phone: "Phone Call",
      chat: "Text Chat",
      inPerson: "In-Person"
    },
    duration: "Duration",
    fee: "Fee",
    available: "Available",
    unavailable: "Unavailable",
    book: "Book Session",
    confidential: "100% Confidential",
    licensed: "Licensed Professional",
    languages: "Languages",
    specializations: "Specializations",
    rating: "Rating",
    experience: "Experience",
    nextAvailable: "Next Available",
    sessionType: "Session Type",
    preferredTime: "Preferred Time",
    reasonForVisit: "Reason for Visit (Optional)",
    reasonPlaceholder: "Briefly describe what you'd like to discuss...",
    confirmBooking: "Confirm Booking",
    bookingSuccess: "Booking Confirmed!",
    bookingSuccessMsg: "Your session has been scheduled. You'll receive a confirmation email with session details.",
    searchCounselors: "Search counselors...",
    filterBy: "Filter by specialty",
    today: "Today",
    thisWeek: "This Week",
    nextWeek: "Next Week"
  },
  hi: {
    title: "परामर्श सत्र बुक करें",
    subtitle: "लाइसेंस प्राप्त मानसिक स्वास्थ्य पेशेवरों से जुड़ें",
    tabs: {
      individual: "व्यक्तिगत चिकित्सा",
      group: "समूह सत्र",
      emergency: "आपातकालीन सहायता",
      myBookings: "मेरी बुकिंग"
    },
    individual: {
      title: "एक-के-साथ-एक परामर्श",
      subtitle: "लाइसेंस प्राप्त चिकित्सकों के साथ निजी सत्र",
      selectCounselor: "अपना परामर्शदाता चुनें",
      viewProfile: "प्रोफाइल देखें",
      bookNow: "अभी बुक करें"
    },
    group: {
      title: "समूह चिकित्सा सत्र",
      subtitle: "सहायक समूह चर्चा में शामिल हों",
      availableSessions: "उपलब्ध सत्र",
      joinSession: "सत्र में शामिल हों",
      participants: "प्रतिभागी"
    },
    emergency: {
      title: "तत्काल सहायता",
      subtitle: "जब आपको सबसे ज्यादा जरूरत हो तो मदद पाएं",
      available24: "24/7 उपलब्ध",
      callNow: "अभी कॉल करें",
      chatNow: "अभी चैट करें"
    },
    myBookings: {
      title: "मेरी अपॉइंटमेंट",
      subtitle: "अपने निर्धारित सत्रों का प्रबंधन करें",
      upcoming: "आगामी",
      past: "पिछले",
      cancelled: "रद्द",
      reschedule: "पुनर्निर्धारण",
      cancel: "रद्द करें",
      join: "सत्र में शामिल हों",
      viewDetails: "विवरण देखें"
    },
     bookingDetails: {
        title: "अपॉइंटमेंट विवरण",
        back: "बुकिंग पर वापस जाएं",
        counselorInfo: "परामर्शदाता की जानकारी",
        patientInfo: "मरीज की जानकारी",
        bookingInfo: "बुकिंग जानकारी",
        priceDetails: "मूल्य विवरण",
        listingPrice: "सूची मूल्य",
        discount: "छूट",
        total: "कुल राशि",
        downloadInvoice: "इनवॉइस डाउनलोड करें",
        status: "स्थिति",
        date: "तारीख",
        time: "समय",
        mode: "मोड",
        duration: "अवधि"
    },
    selectDateTime: "दिनांक और समय चुनें",
    sessionDetails: "सत्र विवरण",
    bookingConfirm: "बुकिंग की पुष्टि करें",
    sessionTypes: {
      video: "वीडियो कॉल",
      phone: "फोन कॉल",
      chat: "टेक्स्ट चैट",
      inPerson: "व्यक्तिगत मुलाकात"
    },
    duration: "अवधि",
    fee: "शुल्क",
    available: "उपलब्ध",
    unavailable: "अनुपलब्ध",
    book: "सत्र बुक करें",
    confidential: "100% गोपनीय",
    licensed: "लाइसेंस प्राप्त पेशेवर",
    languages: "भाषाएं",
    specializations: "विशेषज्ञता",
    rating: "रेटिंग",
    experience: "अनुभव",
    nextAvailable: "अगली उपलब्धता",
    sessionType: "सत्र प्रकार",
    preferredTime: "पसंदीदा समय",
    reasonForVisit: "मुलाकात का कारण (वैकल्पिक)",
    reasonPlaceholder: "संक्षेप में बताएं कि आप क्या चर्चा करना चाहते हैं...",
    confirmBooking: "बुकिंग की पुष्टि करें",
    bookingSuccess: "बुकिंग की पुष्टि हो गई!",
    bookingSuccessMsg: "आपका सत्र निर्धारित हो गया है। आपको सत्र विवरण के साथ एक पुष्टिकरण ईमेल मिलेगा।",
    searchCounselors: "परामर्शदाता खोजें...",
    filterBy: "विशेषता के अनुसार फ़िल्टर करें",
    today: "आज",
    thisWeek: "इस सप्ताह",
    nextWeek: "अगले सप्ताह"
  }
};

const counselors: Counselor[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    rating: 4.9,
    experience: "8 years",
    languages: ["English", "Hindi", "Marathi"],
    specializations: ["Anxiety", "Depression", "Student Counseling"],
    nextAvailable: "Today, 2:00 PM",
    image: "PS",
    sessionTypes: ["video", "phone", "chat"],
    verified: true,
    bio: "Specialized in student mental health and anxiety disorders with 8+ years of experience helping young adults navigate academic and personal challenges."
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    title: "Psychiatrist",
    rating: 4.8,
    experience: "12 years",
    languages: ["English", "Hindi"],
    specializations: ["Trauma", "PTSD", "Mood Disorders"],
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "RK",
    sessionTypes: ["video", "phone", "inPerson"],
    verified: true,
    bio: "Board-certified psychiatrist with extensive experience in trauma therapy and mood disorders. Specializes in evidence-based treatments."
  },
  {
    id: 3,
    name: "Dr. Anita Patel",
    title: "Counseling Psychologist",
    rating: 4.7,
    experience: "6 years",
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Stress Management", "Relationship Issues", "Career Counseling"],
    nextAvailable: "Today, 4:30 PM",
    image: "AP",
    sessionTypes: ["video", "chat"],
    verified: true,
    bio: "Compassionate counselor focusing on holistic approaches to stress management and personal growth for students and young professionals."
  }
];

const groupSessions: GroupSession[] = [
  {
    id: 1,
    title: "Anxiety Support Group",
    facilitator: "Dr. Priya Sharma",
    date: "Today, 6:00 PM",
    duration: "90 minutes",
    participants: 8,
    maxParticipants: 10,
    fee: "₹300",
    description: "A supportive environment to share experiences and learn coping strategies for anxiety."
  },
  {
    id: 2,
    title: "Study Stress Workshop",
    facilitator: "Dr. Anita Patel",
    date: "Tomorrow, 4:00 PM",
    duration: "60 minutes",
    participants: 12,
    maxParticipants: 15,
    fee: "₹250",
    description: "Learn effective techniques to manage academic pressure and improve study habits."
  },
  {
    id: 3,
    title: "Mindfulness & Meditation",
    facilitator: "Dr. Rajesh Kumar",
    date: "Wed, 7:00 PM",
    duration: "45 minutes",
    participants: 6,
    maxParticipants: 12,
    fee: "₹200",
    description: "Introduction to mindfulness practices for mental wellness and stress reduction."
  }
];

const emergencyContacts = [
  {
    id: 1,
    name: "Crisis Helpline",
    phone: "1800-599-0019",
    type: "24/7 Support",
    description: "Immediate support for mental health crises"
  },
  {
    id: 2,
    name: "Emergency Counselor",
    phone: "Available Now",
    type: "Video/Chat",
    description: "Connect with counselor immediately"
  }
];

const myBookings: Booking[] = [
  {
    id: 1,
    counselor: "Dr. Priya Sharma",
    date: "Dec 15, 2024",
    time: "2:00 PM",
    type: "Video Call",
    status: "upcoming",
    sessionId: "sess_001",
  },
  {
    id: 2,
    counselor: "Dr. Anita Patel",
    date: "Dec 10, 2024",
    time: "4:30 PM",
    type: "Chat",
    status: "completed",
    sessionId: "sess_002",
  }
];

const CounselorProfileModal = ({ counselor, onClose }: { counselor: Counselor | null; onClose: () => void; }) => {
    if (!counselor) return null;

    return (
        <Dialog open={!!counselor} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{counselor.name}</DialogTitle>
                    <DialogDescription>{counselor.title}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <p>{counselor.bio}</p>
                    <div>
                        <strong>Specializations:</strong> {counselor.specializations.join(', ')}
                    </div>
                    <div>
                        <strong>Languages:</strong> {counselor.languages.join(', ')}
                    </div>
                    <div>
                        <strong>Experience:</strong> {counselor.experience}
                    </div>
                    <div>
                        <strong>Rating:</strong> {counselor.rating}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function BookingScreen({ language, setLanguage }: BookingScreenProps) {
    const t = translations[language as keyof typeof translations];
    const [activeTab, setActiveTab] = useState('individual');
    const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('all');
    const [showBookingFlow, setShowBookingFlow] = useState(false);
    const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
    const [viewingProfile, setViewingProfile] = useState<Counselor | null>(null);


  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call': return Video;
      case 'Phone Call': return Phone;
      case 'Chat': return MessageSquare;
      case 'In-Person': return MapPin;
      default: return Video;
    }
  };

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         counselor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterSpecialty === 'all' || counselor.specializations.some(spec =>
      spec.toLowerCase().includes(filterSpecialty.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  const handleCallNow = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleDownloadInvoice = (booking: Booking) => {
    const counselor = counselors.find(c => c.name === booking.counselor);
    const invoiceContent = `
      NIVI TO NEW BEGINNINGS - Session Invoice
      ================================

      Booking ID: ${booking.sessionId}
      Status: ${booking.status.toUpperCase()}

      Patient Details:
      Name: Samir Shaw (Example User)
      Email: samirshaw@example.com

      Counselor Details:
      Name: ${booking.counselor}
      Title: ${counselor?.title || 'Counselor'}

      Session Details:
      Date: ${booking.date}
      Time: ${booking.time}
      Mode: ${booking.type}
      Duration: 50 minutes

      Thank you for choosing NIVI TO NEW BEGINNINGS.
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${booking.sessionId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const CounselorCard: React.FC<CounselorCardProps> = ({ counselor, onViewProfile }) => (
    <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16 shadow-lg">
            <AvatarFallback className="text-white text-lg font-bold"
                           style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
              {counselor.image}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-xl font-bold text-gray-800">{counselor.name}</CardTitle>
              {counselor.verified && (
                <Badge className="rounded-full bg-green-100 text-green-700 border-green-200">
                  <UserCheck className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription className="text-gray-600 font-medium">{counselor.title}</CardDescription>

            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-800">{counselor.rating}</span>
              </div>
              <div className="text-gray-600 font-medium">
                {counselor.experience}
              </div>
              <Badge className="rounded-full bg-blue-100 text-blue-700 border-blue-200">
                <Award className="w-3 h-3 mr-1" />
                {t.licensed}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-gray-600 leading-relaxed">{counselor.bio}</p>

        <div>
          <div className="font-bold text-gray-800 mb-2">{t.specializations}</div>
          <div className="flex flex-wrap gap-2">
            {counselor.specializations.map((spec: string, index: number) => (
              <Badge key={index} variant="outline" className="rounded-full font-medium border-gray-300">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-800">{t.nextAvailable}</div>
            <div className="font-medium" style={{ color: '#E4004B' }}>{counselor.nextAvailable}</div>
          </div>

          <div className="flex space-x-2">
            {counselor.sessionTypes.map((type: string) => {
              const Icon = getSessionTypeIcon(t.sessionTypes[type as keyof typeof t.sessionTypes]);
              return (
                <div key={type} className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-2xl font-bold border-gray-300 hover:bg-gray-50"
            onClick={() => onViewProfile(counselor)}
          >
            {t.individual.viewProfile}
          </Button>
          <Button
            className="flex-1 rounded-2xl font-bold text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}
            onClick={() => {
              setSelectedCounselor(counselor.id);
              setShowBookingFlow(true);
            }}
          >
            {t.individual.bookNow}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const GroupSessionCard: React.FC<GroupSessionCardProps> = ({ session }) => (
    <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">{session.title}</CardTitle>
          <Badge className="rounded-full bg-green-100 text-green-700 border-green-200">
            {session.participants}/{session.maxParticipants} {t.group.participants}
          </Badge>
        </div>
        <CardDescription className="text-gray-600">{session.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold text-gray-800">Facilitator</div>
            <div className="text-gray-600">{session.facilitator}</div>
          </div>
          <div>
            <div className="font-bold text-gray-800">Duration</div>
            <div className="text-gray-600">{session.duration}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-800">{session.date}</div>
            <div className="text-2xl font-bold" style={{ color: '#E4004B' }}>{session.fee}</div>
          </div>

          <Button
            className="rounded-2xl font-bold text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' }}
            disabled={session.participants >= session.maxParticipants}
          >
            {t.group.joinSession}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showBookingFlow && selectedCounselor) {
    return (
      <MultiStepBookingScreen
        selectedCounselorId={selectedCounselor}
        language={language}
        setLanguage={setLanguage || (() => {})}
        onBack={() => {
          setShowBookingFlow(false);
          setSelectedCounselor(null);
        }}
        onBookingComplete={() => {
          setShowBookingFlow(false);
          setSelectedCounselor(null);
          setActiveTab('myBookings');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(135deg, #FDF2F8 0%, #ffffff 50%, #F0F9FF 100%)' }}>
      <CounselorProfileModal counselor={viewingProfile} onClose={() => setViewingProfile(null)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                 style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
              <CalendarIcon className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-800">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Badge className="rounded-full bg-green-100 text-green-700 border-green-200 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              {t.confidential}
            </Badge>
            <Badge className="rounded-full bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
              <UserCheck className="w-4 h-4 mr-2" />
              {t.licensed}
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-3xl bg-gray-100/80 p-2 h-auto">
            <TabsTrigger
              value="individual"
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'individual' ? { background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' } : {}}
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.tabs.individual}
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'group' ? { background: 'linear-gradient(135deg, #4A90E2 0%, #34C759 100%)' } : {}}
            >
              <Users className="w-4 h-4 mr-2" />
              {t.tabs.group}
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'emergency' ? { background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' } : {}}
            >
              <Zap className="w-4 h-4 mr-2" />
              {t.tabs.emergency}
            </TabsTrigger>
            <TabsTrigger
              value="myBookings"
              className="rounded-2xl font-bold py-3 data-[state=active]:text-white"
              style={activeTab === 'myBookings' ? { background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' } : {}}
            >
              <CalIcon className="w-4 h-4 mr-2" />
              {t.tabs.myBookings}
            </TabsTrigger>
          </TabsList>

          {/* Individual Therapy Tab */}
          <TabsContent value="individual" className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{t.individual.title}</h2>
              <p className="text-lg text-gray-600">{t.individual.subtitle}</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder={t.searchCounselors}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm h-12"
                />
              </div>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger className="w-full md:w-64 rounded-2xl border-gray-200 bg-white/80 backdrop-blur-sm h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t.filterBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="stress">Stress Management</SelectItem>
                  <SelectItem value="trauma">Trauma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Counselors Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredCounselors.map((counselor) => (
                <CounselorCard key={counselor.id} counselor={counselor} onViewProfile={setViewingProfile} />
              ))}
            </div>
          </TabsContent>

          {/* Group Therapy Tab */}
          <TabsContent value="group" className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{t.group.title}</h2>
              <p className="text-lg text-gray-600">{t.group.subtitle}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {groupSessions.map((session) => (
                <GroupSessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>

          {/* Emergency Support Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{t.emergency.title}</h2>
              <p className="text-lg text-gray-600">{t.emergency.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <Card key={contact.id} className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg"
                         style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}>
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                      <p className="text-gray-600">{contact.description}</p>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: '#FF6B6B' }}>
                      {contact.phone}
                    </div>
                    <Button
                      className="w-full rounded-2xl font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8A65 100%)' }}
                      onClick={() => handleCallNow(contact.phone)}
                    >
                      {t.emergency.callNow}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="myBookings" className="space-y-6">
            {viewingBooking ? (
                 <div className="space-y-6">
                    <Button variant="outline" onClick={() => setViewingBooking(null)} className="rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t.bookingDetails.back}
                    </Button>
                    <Card className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl font-bold text-gray-800">{t.bookingDetails.title}</CardTitle>
                                    <CardDescription>Booking ID: {viewingBooking.sessionId}</CardDescription>
                                </div>
                                <Badge className={
                                    viewingBooking.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    viewingBooking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                    'bg-red-100 text-red-700'
                                }>{viewingBooking.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center"><User className="w-4 h-4 mr-2"/>{t.bookingDetails.counselorInfo}</h3>
                                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className="text-white font-bold" style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                                                {viewingBooking.counselor.split(' ').map((n: string) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold">{viewingBooking.counselor}</p>
                                            <p className="text-sm text-gray-500">{counselors.find(c => c.name === viewingBooking.counselor)?.title}</p>
                                        </div>
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="font-semibold mb-2 flex items-center"><User className="w-4 h-4 mr-2"/>{t.bookingDetails.patientInfo}</h3>
                                    <div className="p-4 bg-gray-50 rounded-2xl space-y-2 h-full flex flex-col justify-center">
                                        <div className="flex justify-between text-sm"><span className="text-gray-500">Name:</span> <span className="font-medium">Samir Shaw (Example)</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-500">Email:</span> <span className="font-medium">samirshaw@example.com</span></div>
                                    </div>
                                </div>
                            </div>

                            <Separator/>

                             <div>
                                <h3 className="font-semibold mb-2 flex items-center"><FileText className="w-4 h-4 mr-2"/>{t.bookingDetails.bookingInfo}</h3>
                                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                    <div className="flex justify-between text-sm"><span className="text-gray-500">{t.bookingDetails.date}:</span> <span className="font-medium">{viewingBooking.date}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-gray-500">{t.bookingDetails.time}:</span> <span className="font-medium">{viewingBooking.time}</span></div>
                                    <div className="flex justify-between text-sm items-center"><span className="text-gray-500">{t.bookingDetails.mode}:</span> <span className="font-medium flex items-center gap-2">{React.createElement(getSessionTypeIcon(viewingBooking.type), {className: "w-4 h-4"})} {viewingBooking.type}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-gray-500">{t.bookingDetails.duration}:</span> <span className="font-medium">50 minutes</span></div>
                                </div>
                            </div>
                            
                            {viewingBooking.status === 'completed' && (
                                <Button onClick={() => handleDownloadInvoice(viewingBooking)} className="w-full rounded-2xl">
                                    <Download className="w-4 h-4 mr-2" />
                                    {t.bookingDetails.downloadInvoice}
                                </Button>
                            )}

                        </CardContent>
                    </Card>
                 </div>
            ) : (
                <>
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold text-gray-800">{t.myBookings.title}</h2>
                  <p className="text-lg text-gray-600">{t.myBookings.subtitle}</p>
                </div>

                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <Card key={booking.id} className="rounded-3xl border-none shadow-lg bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setViewingBooking(booking)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="text-white font-bold"
                                             style={{ background: 'linear-gradient(135deg, #E4004B 0%, #FF6B9D 100%)' }}>
                                {booking.counselor.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-gray-800">{booking.counselor}</div>
                              <div className="text-gray-600">{booking.date} at {booking.time}</div>
                              <div className="text-sm text-gray-500">{booking.type}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {booking.status === 'upcoming' ? (
                               <Badge className="bg-blue-100 text-blue-700">{t.myBookings.upcoming}</Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-600">{t.myBookings.past}</Badge>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {!myBookings.length && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">You have no bookings.</p>
                    </div>
                  )}
                </div>
                </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}