
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Github, 
  ExternalLink, 
  Linkedin, 
  Mail, 
  BookOpen, 
  CheckCircle2, 
  Info,
  UserPlus,
  Users,
  Send
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Academic {
  id: string;
  name: string;
  title: string;
  institution: string;
  researchAreas: string[];
  contributionType: string;
  links: {
    orcid?: string;
    linkedin?: string;
    personal?: string;
  };
}

const academics: Academic[] = [
  {
    id: '1',
    name: 'Prof. Dr. Ahmet Yılmaz',
    title: 'Prof. Dr.',
    institution: 'İstanbul Teknik Üniversitesi',
    researchAreas: ['Girişimcilik Finansmanı', 'İnovasyon Yönetimi'],
    contributionType: 'Metodoloji Tasarımı',
    links: {
      orcid: '0000-0001-2345-6789',
      linkedin: 'https://linkedin.com/in/ahmetyilmaz',
      personal: 'https://itu.edu.tr/ahmetyilmaz'
    }
  },
  {
    id: '2',
    name: 'Doç. Dr. Ayşe Demir',
    title: 'Doç. Dr.',
    institution: 'Orta Doğu Teknik Üniversitesi',
    researchAreas: ['Girişimcilik Ekolojisi', 'Bölgesel Kalkınma'],
    contributionType: 'Metodoloji Validasyonu',
    links: {
      orcid: '0000-0002-3456-7890',
      linkedin: 'https://linkedin.com/in/aysedemir'
    }
  },
  {
    id: '3',
    name: 'Dr. Öğr. Üyesi Mehmet Can',
    title: 'Dr. Öğr. Üyesi',
    institution: 'Boğaziçi Üniversitesi',
    researchAreas: ['Psikometri', 'Veri Analizi'],
    contributionType: 'Normalizasyon ve Ağırlıklandırma',
    links: {
      orcid: '0000-0003-4567-8901',
      personal: 'https://boun.edu.tr/mehmetcan'
    }
  }
];

const researchAreaOptions = [
  'Girişimcilik Finansmanı',
  'Pazarlama',
  'İnovasyon',
  'Veri Bilimi',
  'Psikometri',
  'Girişimcilik Ekolojisi',
  'Ölçekleme',
  'Sürdürülebilirlik'
];

const ScientificBoard: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    department: '',
    title: '',
    researchAreas: [] as string[],
    website: '',
    proposal: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      researchAreas: prev.researchAreas.includes(area)
        ? prev.researchAreas.filter(a => a !== area)
        : [...prev.researchAreas, area]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-10">
      {/* Open Methodology Card */}
      <div className="bg-white p-10 rounded-3xl shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
                <BookOpen size={28} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-fintech-charcoal tracking-tight">
                {t('Açık Metodoloji ve Şeffaflık')}
              </h3>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              {t('🔓 Bu sistem Açık Metodoloji ile çalışmaktadır. Tüm anket formları, normalizasyon scriptleri, ağırlıklandırma tabloları ve sürüm notları halka açıktır. Bilimsel dürüstlük ve toplumsal fayda için şeffaflığı önemsiyoruz.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/segri-index/methodology" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-fintech-charcoal text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-lg active:scale-95"
              >
                <Github size={20} />
                GitHub Reposu
              </a>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100 text-xs font-black uppercase tracking-widest">
                <CheckCircle2 size={14} />
                {t('Akademik Onaylı')}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200 relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-module-validity-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10 space-y-4">
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('Sürüm Bilgisi')}</div>
                <div className="text-3xl font-black text-fintech-charcoal">v2.7.0</div>
                <div className="h-1 w-12 bg-module-validity-light rounded-full"></div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {t('Son güncelleme: 14 Nisan 2026. Metodoloji v2.7 Canonical Final sürümü, küresel inovasyon hub\'ları ve gelişmiş analitik modellerle güncellenmiştir.')}
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Academic List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-fintech-charcoal uppercase tracking-widest flex items-center gap-3">
              <Users size={24} className="text-module-validity-light" />
              {t('Katkı Yapan Akademisyenler')}
            </h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              {academics.length} {t('Üye')}
            </span>
          </div>

          <div className="p-4 bg-module-validity-light/5 rounded-2xl border border-module-validity-light/10">
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              <span className="font-black text-module-validity-light uppercase mr-2">{t('Örnek Modelleme')}:</span>
              {t('v2.7 Metodolojisi kapsamında bu kurul; Sosyal Beğenirlik (SB) düzeltme katsayıları, EEF için Winsorized Normalizasyon algoritmaları ve Lojistik Regresyon tabanlı başarı olasılığı modellerinin bilimsel geçerliliğini denetlemektedir. Her bir üye, kendi uzmanlık alanında (Psikometri, Ekonometri, İnovasyon Yönetimi) veri setlerinin güvenilirliğini (Q Factor) onaylamaktadır.')}
            </p>
          </div>

          <div className="space-y-4">
            {academics.map((academic) => (
              <motion.div 
                key={academic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:border-module-validity-light transition-all group"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:from-module-validity-light group-hover:to-module-validity-dark group-hover:text-white transition-all duration-500">
                      <GraduationCap size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-fintech-charcoal tracking-tight">{academic.name}</h4>
                      <p className="text-sm font-bold text-module-validity-light">{academic.institution}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {academic.researchAreas.map(area => (
                          <span key={area} className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gray-100">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end justify-between gap-4">
                    <div className="px-3 py-1.5 bg-module-validity-light/10 text-module-validity-light rounded-xl text-[10px] font-black uppercase tracking-widest border border-module-validity-light/20">
                      {academic.contributionType}
                    </div>
                    <div className="flex gap-3">
                      {academic.links.orcid && (
                        <a href={`https://orcid.org/${academic.links.orcid}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="ORCID">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {academic.links.linkedin && (
                        <a href={academic.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="LinkedIn">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {academic.links.personal && (
                        <a href={academic.links.personal} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-fintech-coral transition-colors" title="Personal Page">
                          <Mail size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="space-y-6">
          <div className="px-2">
            <h3 className="text-xl font-black text-fintech-charcoal uppercase tracking-widest flex items-center gap-3">
              <UserPlus size={24} className="text-fintech-coral" />
              {t('Kurula Katılın')}
            </h3>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fintech-coral/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-xl font-black text-fintech-charcoal">{t('Başvurunuz Alındı')}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {t('Değerli katkınız için teşekkür ederiz. Başvurunuz kurul tarafından incelendikten sonra tarafınıza bilgilendirme yapılacaktır.')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Ad Soyad')}</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-module-validity-light/20 outline-none transition-all"
                    placeholder="Örn: Dr. Selçuk Ergin"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Kurumsal E-posta')}</label>
                  <input 
                    required
                    type="email" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-module-validity-light/20 outline-none transition-all"
                    placeholder="ad.soyad@universite.edu.tr"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Kurum')}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-module-validity-light/20 outline-none transition-all"
                      placeholder="Üniversite"
                      value={formData.institution}
                      onChange={e => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Unvan')}</label>
                    <select 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-module-validity-light/20 outline-none transition-all appearance-none"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    >
                      <option value="">{t('Seçiniz')}</option>
                      <option value="Prof. Dr.">Prof. Dr.</option>
                      <option value="Doç. Dr.">Doç. Dr.</option>
                      <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
                      <option value="Arş. Gör.">Arş. Gör.</option>
                      <option value="Doktora Öğrencisi">{t('Doktora Öğrencisi')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Araştırma Alanları')}</label>
                  <div className="flex flex-wrap gap-2">
                    {researchAreaOptions.map(area => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleAreaToggle(area)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                          formData.researchAreas.includes(area)
                            ? 'bg-module-validity-light text-white border-module-validity-light shadow-md'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-module-validity-light'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{t('Katkı Önerisi')}</label>
                  <textarea 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-module-validity-light/20 outline-none transition-all h-24 resize-none"
                    placeholder={t('Hangi konuda destek vermek istersiniz?') || 'Hangi konuda destek vermek istersiniz?'}
                    value={formData.proposal}
                    onChange={e => setFormData({...formData, proposal: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-fintech-coral to-fintech-amber text-white rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
                >
                  <Send size={18} />
                  {t('Başvuruyu Gönder')}
                </button>
              </form>
            )}
          </div>

          <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-1" />
            <p className="text-xs text-blue-900 font-bold leading-relaxed">
              {t('Başvurunuz admin panelinde onay kuyruğuna düşer. Onaylananlar listeye eklenir ve tarafınıza bilgilendirme e-postası iletilir.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificBoard;
