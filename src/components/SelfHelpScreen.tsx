import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
// removed Tabs component to implement custom category pills
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Video, Headphones, Search, Clock, Star, Download, Heart } from 'lucide-react';
import vid1 from '../../Resouces/Vidio/vid1.png';
import vid2 from '../../Resouces/Vidio/vid2.jpg';
import vid3 from '../../Resouces/Vidio/vid3.jpg';
import vid4 from '../../Resouces/Vidio/vid4.png';
import vid5 from '../../Resouces/Vidio/vid5.png';
import aud1 from '../../Resouces/Audio/aud1.jpg';
import aud2 from '../../Resouces/Audio/aud2.jpg';
import aud3 from '../../Resouces/Audio/aud3.jpg';
import aud4 from '../../Resouces/Audio/aud4.jpg';
import aud5 from '../../Resouces/Audio/aud5.jpg';
import art1 from '../../Resouces/Artical/art1.jpg';
import art2 from '../../Resouces/Artical/art2.jpg';
import art3 from '../../Resouces/Artical/art3.jpg';
import art4 from '../../Resouces/Artical/art4.png';
import art5 from '../../Resouces/Artical/art5.jpg';

type ResourceType = 'video' | 'audio' | 'article';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  duration?: string;
  rating: number;
  tags: string[];
  image: string;
  url: string;
  downloadUrl?: string;
  popular?: boolean;
  recent?: boolean;
}

const translations = {
  en: {
    title: 'Self-Help Library',
    subtitle: 'Evidence-based resources for your wellbeing journey',
    search: 'Search resources...',
    categories: { all: 'All Resources', videos: 'Videos', audios: 'Audio', articles: 'Articles' },
    tags: { anxiety: 'Anxiety', depression: 'Depression', stress: 'Stress', mindfulness: 'Mindfulness', sleep: 'Sleep', relationships: 'Relationships', selfcare: 'Self Care' },
    popular: 'Popular Resources',
    recent: 'Recently Added',
    free: 'Free',
    readMore: 'Read more',
    readLess: 'Read less'
  },
  hi: {
    title: 'स्व-सहायता पुस्तकालय',
    subtitle: 'आपकी कल्याण यात्रा के लिए प्रमाण-आधारित संसाधन',
    search: 'संसाधन खोजें...',
    categories: { all: 'सभी संसाधन', videos: 'वीडियो', audios: 'ऑडियो', articles: 'लेख' },
    tags: { anxiety: 'चिंता', depression: 'अवसाद', stress: 'तनाव', mindfulness: 'सचेतना', sleep: 'नींद', relationships: 'रिश्ते', selfcare: 'आत्म देखभाल' },
    popular: 'लोकप्रिय संसाधन',
    recent: 'हाल ही में जोड़े गए',
    free: 'मुफ्त',
    readMore: 'लंबा पढ़ें',
    readLess: 'कम पढ़ें'
  }
} as const;

const resources: Resource[] = [
  // videos: user-provided 5 videos (use Resouces/Vidio thumbnails)
  { id: 'v1', title: 'Box Breathing Technique: 3-Minute Guide', description: 'Guided Mindfulness Meditation — Stress and Anxiety Release', type: 'video', duration: '3 min', rating: 4.8, tags: ['mindfulness','anxiety'], image: vid1, url: 'https://youtu.be/Q4UG3PMSk6k', popular: true },
  { id: 'v2', title: '🔥 Morning Energy Boost – 20 Minute Full Body Workout for Everyone', description: 'Start your day feeling energized and focused with this beginner-friendly, full-body routine. In just 20 minutes you’ll wake up your muscles, improve circulation, and release feel-good endorphins – perfect for students juggling classes, assignments and exams. No equipment needed, can be done right in your room or hostel.', type: 'video', duration: '20:44', rating: 4.7, tags: ['energy','exercise'], image: vid2, url: 'https://youtu.be/f-HHP669qRs' },
  { id: 'v3', title: '🧘 10 Minute Study Break Stretch – Moderate Yoga Flow', description: 'Give your mind and body a quick reset during long study sessions. This 10-minute moderate yoga flow gently releases tension in your neck, shoulders, and back while improving blood flow to keep your focus sharp. Perfect for between classes or right before exams.', type: 'video', duration: '10:30', rating: 4.7, tags: ['stretch','yoga'], image: vid3, url: 'https://youtu.be/J4zzVCJorwE' },
  { id: 'v4', title: '🧠 Psychologists Debunk 25 Mental-Health Myths', description: 'Ever wondered which “facts” about mental health are actually myths? In this video, expert psychologists break down 25 common misconceptions about mental health, stigma, therapy, and self-care — helping students separate truth from misinformation and take better care of themselves.', type: 'video', duration: '17:09', rating: 4.6, tags: ['mental-health','education'], image: vid4, url: 'https://youtu.be/Ii5m8Ta1iBY' },
  { id: 'v5', title: '🌱 8 Things You Can Do To Improve Your Mental Health', description: 'Small, consistent actions can make a huge difference in how you feel. This video shares 8 practical, science-backed tips you can start today to boost your mood, reduce stress, and build resilience — perfect for busy students.', type: 'video', duration: '6:09', rating: 4.6, tags: ['selfcare','tips'], image: vid5, url: 'https://youtu.be/3QIfkeA6HBY' },

  // audios: user-provided 5 audio resources (use Resouces/Audio thumbnails)
  { id: 'a1', title: '🎧 Focus & Calm – 40 Hz Binaural Beats', description: 'Boost your concentration, mental clarity, and emotional balance with 40 Hz gamma-wave audio. This frequency is linked with:\nSharper focus & improved memory\nReduced stress & anxiety\nDeeper relaxation during breaks\nEnhanced creativity and problem-solving\nUse it for 10–20 minutes during study, work, or before sleep to reset your mind and improve productivity.', type: 'audio', duration: '1 min 40 sec', rating: 4.8, tags: ['focus','mindfulness'], image: aud1, url: 'https://youtu.be/Z8ANihFXlgU', popular: true },
  { id: 'a2', title: '🎧 Deep Relaxation – 6 Hz Binaural Beats (Theta Waves)', description: 'Unwind and recharge with 6 Hz theta-wave audio, designed to promote deep relaxation and mild meditation — perfect for stress relief and calming the mind.\nBenefits:\nEncourages deep relaxation & stress reduction\nSupports mild meditation and emotional balance\nHelps ease tension before sleep or after study/work sessions\nUsage: Listen for 10–20 minutes before bed or during breaks to reset and refresh.', type: 'audio', duration: '10 hour', rating: 4.7, tags: ['relaxation','sleep'], image: aud2, url: 'https://youtu.be/NVlxJRihpdE' },
  { id: 'a3', title: '🎧 Natural Harmony – 432 Hz “Natural” Music', description: 'Immerse yourself in 432 Hz music, often described as more “natural” and heart-centered. While anecdotal, many listeners find it soothing and supportive for emotional balance.\nBenefits:\nEncourages a calm, centered mood\nMay help with emotional regulation and stress reduction. Creates a gentle backdrop for mindfulness or creative work\nUsage: Play softly in the background while reading, journaling, or practicing self-help exercises.', type: 'audio', duration: '5 hour', rating: 4.6, tags: ['nature','calm'], image: aud3, url: 'https://youtu.be/_V-Fj0Y8Izg' },
  { id: 'a4', title: 'Brown Noise / Pink Noise', description: 'Benefits of Brown & Pink Noise:\nCalms racing thoughts and reduces stress\nMasks background distractions for better focus\nHelps improve concentration while working or studying\nSupports deeper, more restful sleep', type: 'audio', duration: '11:59:59', rating: 4.5, tags: ['focus','sleep'], image: aud4, url: 'https://youtu.be/YOcjt-Ietj4' },
  { id: 'a5', title: 'Nature Soundscape - Rain, Ocean, Forest', description: 'Benefits of Nature Soundscapes (Rain, Ocean, Forest):\n\nReduces Stress & Anxiety: The soothing sounds of rain, ocean waves, and forest ambiance can lower cortisol levels, promoting relaxation and reducing stress. \nwellness design consultants.\nEnhances Sleep Quality: Listening to nature sounds before bedtime can improve sleep quality by creating a calming environment, aiding in falling asleep faster and staying asleep longer.', type: 'audio', duration: '8 hour', rating: 4.6, tags: ['nature','sleep'], image: aud5, url: 'https://youtu.be/4LeyBbDBvQQ' },

  // articles: user-provided 5 articles (use Resouces/Artical thumbnails)
  { id: 'r1', title: 'How to De-Stress Before Exams?', description: 'Exams often bring a lot of pressure—deadlines, expectations, fear of failure. But you don’t have to let stress control you. De-stressing isn’t about erasing worry; it’s about managing it so you can stay calm, focused, and perform your best.', type: 'article', rating: 4.6, tags: ['stress'], image: art1, url: 'https://www.wikihow.com/Deal-With-Exam-Stress', downloadUrl: '/Resouces/Artical/art1.pdf', popular: true },
  { id: 'r2', title: 'Mindfulness Made Simple: 5-Minute Practices for Busy Students', description: 'Mindfulness means being fully present — noticing your thoughts, feelings, and surroundings without judging them. As a student, even a few minutes of mindfulness can help you calm anxiety, focus better, and feel balanced throughout your day.', type: 'article', rating: 4.5, tags: ['mindfulness'], image: art2, url: 'https://neurolaunch.com/5-minute-mindfulness-activities-for-students/', downloadUrl: '/Resouces/Artical/art2.pdf' },
  { id: 'r3', title: 'Digital Detox: Managing Social Media & Sleep', description: 'In our hyperconnected age, constant exposure to screens—social media, news feeds, messages—can drain your mental energy, disrupt sleep, and increase anxiety. Doing a digital detox means setting boundaries around your device use to improve mental well-being and rest.', type: 'article', rating: 4.7, tags: ['sleep','digital'], image: art3, url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11871965/', downloadUrl: '/Resouces/Artical/art3.pdf' },
  { id: 'r4', title: 'How to Recognize Early Signs of Burnout', description: 'Burnout is more than just feeling tired—it’s when stress becomes chronic, affecting your mental, emotional, and physical health. Recognizing burnout early helps you take action before it deeply impacts your life.', type: 'article', rating: 4.6, tags: ['selfcare'], image: art4, url: 'https://www.verywellhealth.com/signs-of-burnout-8683361', downloadUrl: '/Resouces/Artical/art4.pdf' },
  { id: 'r5', title: 'How to Talk to Friends about Mental Health & Recognize Red Flags', description: 'Talking openly about mental health with friends can feel scary, but it helps build trust and support. Knowing how to start the conversation, what signs to look out for, and when a friend might need professional help are skills worth having.', type: 'article', rating: 4.4, tags: ['relationships','mental-health'], image: art5, url: 'https://www.buoyhealth.com/learn/mental-health-red-flags', downloadUrl: '/Resouces/Artical/art5.pdf' }
];

export default function SelfHelpScreen({ language = 'en' }: { language?: 'en' | 'hi' }) {
  const t = translations[language as 'en' | 'hi'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ResourceType>('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const filteredResources = resources.filter(r => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'all' || r.type === selectedCategory;
    const matchesTag = !selectedTag || r.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const popularResources = resources.filter(r => r.popular).slice(0, 5);
  const recentResources = resources.filter(r => r.recent).slice(0, 5);

  const toggleExpand = (id: string) => setExpandedIds(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const Icon = resource.type === 'video' ? Video : resource.type === 'audio' ? Headphones : BookOpen;
    const expanded = expandedIds.includes(resource.id);
    const halfLen = Math.ceil(resource.description.length / 2);
    const displayedDesc = expanded ? resource.description : (resource.description.length > halfLen ? resource.description.slice(0, halfLen).trim() + '...' : resource.description);
    return (
      <Card className="overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-32">
          <ImageWithFallback src={resource.image} alt={resource.title} className="w-full h-full object-cover rounded-t-2xl" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-foreground border-0 inline-flex items-center gap-2"><Icon className="w-3 h-3" /> <span className="text-xs capitalize">{resource.type}</span></Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-foreground border-0 text-xs">Free</Badge>
          </div>
        </div>

    <CardContent className="p-3">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
      <p className={`text-sm text-muted-foreground mb-2`}>{displayedDesc}</p>
              {!expanded && (
                <div className="text-right">
                  <button className="text-sm text-orange-500 underline" onClick={() => toggleExpand(resource.id)}>{t.readMore}</button>
                </div>
              )}
              {expanded && (
                <div className="mt-2 text-right">
                  <button className="text-sm text-primary underline" onClick={() => toggleExpand(resource.id)}>{t.readLess}</button>
                </div>
              )}

              <div className="flex items-center gap-3 mt-3">
                {resource.type !== 'article' && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" />{resource.duration}</div>}
                <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-yellow-400" />{resource.rating}</div>
              </div>
            </div>

            <div className="w-28 flex flex-col items-stretch gap-2">
              <Button size="sm" className="flex-1 rounded-xl" onClick={() => window.open(resource.url, '_blank')}>
                {resource.type === 'article' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Listen'}
              </Button>
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" className="rounded-xl">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => { if (resource.downloadUrl) window.open(resource.downloadUrl, '_blank'); else window.open(resource.url, '_blank'); }}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const VideoCard = ({ resource }: { resource: Resource }) => {
    const expanded = expandedIds.includes(resource.id);
    const halfLen = Math.ceil(resource.description.length / 2);
    const displayedDesc = expanded ? resource.description : (resource.description.length > halfLen ? resource.description.slice(0, halfLen).trim() + '...' : resource.description);
    return (
      <Card className="overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-32">
          <ImageWithFallback src={resource.image} alt={resource.title} className="w-full h-full object-cover rounded-t-2xl" />
        </div>
        <CardContent className="p-3">
          <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
          <p className={`text-sm text-muted-foreground mb-3`}>{displayedDesc}</p>
          {!expanded ? (
            <div className="text-right mb-3">
              <button className="text-sm text-orange-500 underline" onClick={() => toggleExpand(resource.id)}>{t.readMore}</button>
            </div>
          ) : (
            <div className="text-right mb-3">
              <button className="text-sm text-primary underline" onClick={() => toggleExpand(resource.id)}>{t.readLess}</button>
            </div>
          )}

          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3"><Clock className="w-4 h-4" />{resource.duration}</div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" />{resource.rating}</div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 rounded-xl" onClick={() => window.open(resource.url, '_blank')}>Watch</Button>
            <Button size="sm" variant="outline" className="rounded-xl"><Heart className="w-4 h-4" /></Button>
            <Button size="sm" variant="outline" className="rounded-xl"><Download className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AudioCard = ({ resource }: { resource: Resource }) => {
    const expanded = expandedIds.includes(resource.id);
    const halfLen = Math.ceil(resource.description.length / 2);
    const displayedDesc = expanded ? resource.description : (resource.description.length > halfLen ? resource.description.slice(0, halfLen).trim() + '...' : resource.description);
    return (
      <Card className="overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-32">
          <ImageWithFallback src={resource.image} alt={resource.title} className="w-full h-full object-cover rounded-t-2xl" />
        </div>
        <CardContent className="p-3">
          <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
          <p className={`text-sm text-muted-foreground mb-3`}>{displayedDesc}</p>
          {!expanded ? (
            <div className="text-right mb-3">
              <button className="text-sm text-orange-500 underline" onClick={() => toggleExpand(resource.id)}>{t.readMore}</button>
            </div>
          ) : (
            <div className="text-right mb-3">
              <button className="text-sm text-primary underline" onClick={() => toggleExpand(resource.id)}>{t.readLess}</button>
            </div>
          )}

          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3"><Clock className="w-4 h-4" />{resource.duration}</div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" />{resource.rating}</div>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" className="flex-1 rounded-xl" onClick={() => window.open(resource.url, '_blank')}>Listen</Button>
            <Button size="sm" variant="outline" className="rounded-xl"><Heart className="w-4 h-4" /></Button>
            <Button size="sm" variant="outline" className="rounded-xl"><Download className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-3"><BookOpen className="w-6 h-6 text-white" /></div>
          <h1 className="text-3xl font-semibold">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={t.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>

          <div className="mt-4 flex gap-3">
            {['all','video','audio','article'].map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat as any)} className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-white text-primary ring-2 ring-pink-400' : 'bg-muted text-muted-foreground'}`}>
                {cat === 'all' ? t.categories.all : cat === 'video' ? t.categories.videos : cat === 'audio' ? t.categories.audios : t.categories.articles}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(t.tags).map(([key, label]) => (
              <Badge key={key} className={`cursor-pointer ${selectedTag === key ? 'bg-accent text-white' : ''}`} onClick={() => setSelectedTag(selectedTag === key ? '' : key)}>{label}</Badge>
            ))}
            {selectedTag && <Button variant="ghost" size="sm" onClick={() => setSelectedTag('')}>Clear</Button>}
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{searchTerm ? `Search Results for "${searchTerm}"` : 'Resources'}</h2>
            <span className="text-sm text-muted-foreground">{filteredResources.length} resources found</span>
          </div>
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-muted-foreground" /></div>
              <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(r => <div key={r.id}>{r.type === 'video' ? <VideoCard resource={r} /> : r.type === 'audio' ? <AudioCard resource={r} /> : <ResourceCard resource={r} />}</div>)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
