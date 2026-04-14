import React from 'react';
import { ShieldCheck, Info, Scale, Copyright, Globe, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const NamingSystem: React.FC = () => {
  const { t } = useLanguage();

  const rules = [
    {
      layer: t('Akademik İsim'),
      status: t('✅ Özgün, telif riski yok'),
      rule: t('Her yerde serbestçe kullanılabilir'),
      icon: <BookOpen className="text-blue-600" size={20} />,
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      layer: t('SEGRİ Metaforu'),
      status: t('✅ Özgün, SEGRİ markasına ait'),
      rule: t('Tarihsel figürler (Mimar Sinan, Alp Arslan vb.) telif koruması altında değil. Coğrafi isimler (Boğaz, Kapadokya, Ağrı, Çatalhöyük) kamu malı'),
      icon: <Globe className="text-teal-600" size={20} />,
      bg: 'bg-teal-50',
      border: 'border-teal-100'
    },
    {
      layer: t('Pop-Kültür İlhamı'),
      status: t('⚠️ Tescilli ticari markalar'),
      rule: t('Asla birincil isim olarak kullanılmaz. Sadece "ilham kaynağı" referansı olarak parantez içinde veya açıklayıcı metinde. Ticari materyallerde (reklam, ücretli içerik) kullanılmaz. Blog/sosyal medyada "X\'i düşünün" formatında kullanılabilir'),
      icon: <AlertTriangle className="text-amber-600" size={20} />,
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fintech-coral to-fintech-amber"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-fintech-charcoal tracking-tight">{t('Üçlü İsimlendirme Sistemi')}</h1>
            <p className="text-gray-500 mt-1 font-medium">{t('SEGRİ marka mimarisi ve terminoloji standartları.')}</p>
          </div>
          <div className="p-3 bg-red-50 text-fintech-coral rounded-2xl border border-red-100">
            <ShieldCheck size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section className="space-y-6">
            <h3 className="text-xl font-black text-fintech-charcoal flex items-center gap-3">
              <Copyright size={24} className="text-fintech-coral" />
              {t('Telif ve Marka Kuralları')}
            </h3>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-fintech-gray border-b border-gray-200">
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Katman')}</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Telif Durumu')}</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Kural')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rules.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${item.bg}`}>
                            {item.icon}
                          </div>
                          <span className="font-black text-fintech-charcoal text-sm">{item.layer}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-gray-700">{item.status}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-gray-600 leading-relaxed font-medium max-w-md">
                          {item.rule}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-fintech-charcoal flex items-center gap-3">
              <Scale size={24} className="text-fintech-coral" />
              {t('Telif ve kullanım karşılaştırması')}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {t('Üçlü isimlendirme sistemindeki her katmanın telif durumu, güvenli kullanım alanları ve kısıtlamaları.')}
            </p>
            
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-fintech-gray border-b border-gray-200">
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest w-1/4"></th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Akademik İsim')}</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('SEGRİ Metaforu')}</th>
                    <th className="p-4 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Pop-Kültür İlhamı')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-black text-fintech-charcoal text-xs uppercase tracking-wider bg-gray-50/50">{t('Telif Durumu')}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                        <CheckCircle2 size={16} />
                        {t('Güvenli')}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t('Özgün isimler, telif riski yok')}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                        <CheckCircle2 size={16} />
                        {t('Güvenli')}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t('Tarihsel figürler ve coğrafi isimler kamu malı')}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                        <AlertTriangle size={16} />
                        {t('Riskli')}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{t('Tescilli ticari markalar (Marvel/Disney, Tolkien Estate, Lucasfilm)')}</p>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-black text-fintech-charcoal text-xs uppercase tracking-wider bg-gray-50/50">{t('Örnekler')}</td>
                    <td className="p-4">
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {t('Hızlanan, Potansiyel, Yapılandır, Keşif, Vizyon-yenilikçi, Cesur-lider')}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {t('Boğaz Akıntısı, Kapadokya Havası, Ağrı Ateşi, Çatalhöyük Tohumu, Mimar Sinan, Alp Arslan, Yunus Emre')}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-gray-600 font-medium leading-relaxed italic">
                        {t('Iron Man, Black Panther, Captain America, Spider-Man, Gandalf, Aragorn, Frodo, Han Solo')}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-md hover-card relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-fintech-teal"></div>
              <h4 className="font-black text-fintech-charcoal mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-fintech-teal" />
                {t('Neden Üçlü İsimlendirme?')}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {t('SEGRİ, karmaşık akademik verileri popüler kültür metaforları ve tarihsel figürlerle birleştirerek daha anlaşılır ve akılda kalıcı bir dil oluşturur. Bu yapı, hem bilimsel derinliği korur hem de kullanıcı dostu bir deneyim sunar.')}
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-md hover-card relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-fintech-coral"></div>
              <h4 className="font-black text-fintech-charcoal mb-4 flex items-center gap-2">
                <Scale size={20} className="text-fintech-coral" />
                {t('Kullanım Rehberi')}
              </h4>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fintech-coral mt-1.5 shrink-0"></span>
                  {t('Resmi raporlarda akademik isimler önceliklidir.')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fintech-coral mt-1.5 shrink-0"></span>
                  {t('Sunumlarda SEGRİ metaforları (Mimar Sinan vb.) kullanılabilir.')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-fintech-coral mt-1.5 shrink-0"></span>
                  {t('Pop-kültür referansları sadece yardımcı açıklama olarak yer almalıdır.')}
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
        <Info size={20} className="text-amber-600 flex-shrink-0 mt-1" />
        <p className="text-xs text-amber-900 font-bold leading-relaxed">
          {t('Bu kurallar SEGRİ marka bütünlüğünü korumak ve yasal riskleri minimize etmek amacıyla oluşturulmuştur. Herhangi bir ticari kullanım öncesi merkez ofis onayı gereklidir.')}
        </p>
      </div>
    </div>
  );
};

export default NamingSystem;
