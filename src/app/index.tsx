import React, { useState } from 'react';
import { 
  MapPin, Linkedin, Edit2, Plus, FileText, Download, Upload, 
  Video, Play, Briefcase, GraduationCap, CheckCircle2, Globe, Phone, Calendar, User, 
  Share2, Clock
} from 'lucide-react';

// --- MOCK DATA ---

const SKILLS = ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Indesign', 'Adobe After Effects'];

const WORK_EXPERIENCE = [
  {
    id: 1,
    role: 'Product Designer',
    company: 'TogTard',
    period: 'May 2023 - Present',
    description: 'Worked in a team of two designers to move the low fidelity designs to high fidelity within a month upon resuming my new role. This helped with improving my wire framing skills and increased company sales by',
    industries: ['Fintech', 'Insurance']
  },
  {
    id: 2,
    role: 'Product Designer',
    company: 'Tedbree',
    period: 'May 2020 - Present',
    description: 'Worked in a team of two designers to move the low fidelity designs to high fidelity within a month upon resuming my new role. This helped with improving my wire framing skills and increased company sales by',
    industries: ['Fintech', 'Insurance']
  }
];

const EDUCATION = [
  { id: 1, degree: 'Bachelors - Applied Maths', school: 'University of Lagos', period: 'May 2016 - Mar 2021' },
  { id: 2, degree: 'Bachelors - Applied Maths', school: 'University of Lagos', period: 'May 2016 - Mar 2021' }
];

const PORTFOLIO = [
  { id: 1, title: 'Web Application', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 2, title: 'Web Application', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 3, title: 'Web Application', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200' },
];

type Tab = 'Overview' | 'Resumé' | 'Preferences';

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [isAvailable, setIsAvailable] = useState(true);

  // Common card style: fill #FFFFFF, radius 16, stroke #E5E7EB, padding 16
  const cardClass = "bg-white rounded-2xl border border-gray-200 p-4";

  // --- SUB-COMPONENTS ---

  const SectionHeader = ({ title, onEdit }: { title: string, onEdit?: () => void }) => (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
      {onEdit && (
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-gray-50 transition-colors">
          <Edit2 size={12} /> Edit
        </button>
      )}
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Personal Information */}
      <section className={cardClass}>
        <SectionHeader title="Personal Information" onEdit={() => {}} />
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-slate-700">Work Availability</h3>
          </div>
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="ml-3 text-sm font-medium text-slate-700">{isAvailable ? 'Available' : 'Unavailable'}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
           <p className="text-sm text-slate-600 leading-relaxed">
             I'm a Product Designer based in Melbourne, Australia, I specialise in UI/UX design, brand strategy, and Webflow development. I'm always striving to grow and learn something new and I don't take myself too seriously...
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <User size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">Male</p>
                <p className="text-xs text-slate-500">Gender</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <Globe size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">Nigeria</p>
                <p className="text-xs text-slate-500">Country of Origin</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <MapPin size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">Yaba, 10001, Lagos, Nigeria</p>
                <p className="text-xs text-slate-500">Location</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <Clock size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">UTC +1</p>
                <p className="text-xs text-slate-500">Timezone</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <Calendar size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">04/12/1999</p>
                <p className="text-xs text-slate-500">Date Of Birth</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <Phone size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800">+234 708028020</p>
                <p className="text-xs text-slate-500">Phone Number</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-1">
                <Linkedin size={16} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">https://www.linkedin.com/in/austin...</p>
                <p className="text-xs text-slate-500">LinkedIn URL</p>
             </div>
          </div>
        </div>
      </section>

      {/* Professional Role */}
      <section className={cardClass}>
        <h3 className="text-sm font-bold text-slate-800 mb-4">Professional Role</h3>
        <div className="flex gap-8">
           <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold mb-1">Primary Role</span>
              <p className="text-sm font-bold text-slate-800">UX Designer</p>
              <p className="text-xs text-slate-500">0-2 Years Experience</p>
           </div>
           <div>
              <p className="text-sm font-bold text-slate-800 mt-6">Graphic Designer</p>
              <p className="text-xs text-slate-500">0-2 Years Experience</p>
           </div>
        </div>
      </section>

      {/* Technologies */}
      <section className={cardClass}>
        <h3 className="text-sm font-bold text-slate-800 mb-3">Technologies and Frameworks</h3>
        <div className="flex flex-wrap gap-2">
           {SKILLS.map(skill => (
             <span key={skill} className="px-3 py-1 border border-blue-200 text-blue-600 rounded-full text-xs font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                {skill}
             </span>
           ))}
        </div>
      </section>

      {/* Resume/CV */}
      <section className={cardClass}>
         <h3 className="text-sm font-bold text-slate-800 mb-4">Resumé/CV</h3>
         <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="flex items-center gap-3">
               <FileText size={24} className="text-slate-400" />
               <div>
                  <p className="text-sm font-bold text-slate-800">Rema_resume.pdf</p>
                  <p className="text-xs text-slate-400">Uploaded 24/03/25</p>
               </div>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                  <Download size={14} /> View Resume
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <Upload size={14} /> Upload New Resume
               </button>
            </div>
         </div>
      </section>

      {/* Video Resume */}
      <section className={cardClass}>
         <h3 className="text-sm font-bold text-slate-800 mb-4">Video Resumé</h3>
         <div className="relative aspect-video w-full max-w-md bg-slate-900 rounded-xl overflow-hidden group cursor-pointer shadow-md">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" alt="Video thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-slate-900 pl-1 group-hover:scale-110 transition-transform">
                  <Play size={20} fill="currentColor" />
               </div>
            </div>
         </div>
         <div className="mt-3 flex items-center justify-between max-w-md">
            <p className="text-xs text-slate-400">Recorded 07/04/25</p>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
               <Video size={14} /> Record New Video Resume
            </button>
         </div>
      </section>

      {/* Work Experience */}
      <section className={cardClass}>
         <SectionHeader title="Work Experience" onEdit={() => {}} />
         <div className="space-y-6">
            {WORK_EXPERIENCE.map(job => (
               <div key={job.id} className="flex gap-4 relative">
                  <div className="mt-1">
                     <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center shadow-sm text-slate-600">
                        <Briefcase size={14} />
                     </div>
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="text-sm font-bold text-slate-800">{job.role}</h4>
                           <p className="text-xs font-semibold text-slate-600">{job.company}</p>
                           <p className="text-xs text-slate-400 mt-0.5">{job.period}</p>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                           <Edit2 size={14} />
                        </button>
                     </div>
                     <div className="mt-2">
                        <p className="text-xs font-bold text-slate-700 mb-1">Description</p>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">{job.description}</p>
                        <div className="flex gap-2">
                           {job.industries.map(ind => (
                              <span key={ind} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                                 {ind}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors">
            <Plus size={14} /> Add New
         </button>
      </section>

      {/* Education */}
      <section className={cardClass}>
         <SectionHeader title="Education" onEdit={() => {}} />
         <div className="space-y-4">
            {EDUCATION.map(edu => (
               <div key={edu.id} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-slate-500">
                     <GraduationCap size={20} />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                     <p className="text-xs text-slate-500">{edu.school}</p>
                     <p className="text-xs text-slate-400 mt-0.5">{edu.period}</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                     <Edit2 size={14} />
                  </button>
               </div>
            ))}
         </div>
         <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors">
            <Plus size={14} /> Add New
         </button>
      </section>

      {/* Portfolio */}
      <section className={cardClass}>
         <SectionHeader title="Portfolio" onEdit={() => {}} />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.map(item => (
               <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all group">
                  <div className="h-32 bg-gray-200 relative overflow-hidden">
                     <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                     <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                     <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                        Magna feugiat praesent, fam elit massa. Blandit kong dignis sissim. Variusdo progt, tan sit massa.
                     </p>
                     <button className="mt-3 w-full py-1.5 text-xs font-bold text-slate-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                        More Details
                     </button>
                  </div>
               </div>
            ))}
         </div>
         <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors">
            <Plus size={14} /> Add New
         </button>
      </section>

    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
       {/* Banner */}
       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
             <h2 className="text-lg font-bold mb-1">Profile Preferences</h2>
             <p className="text-xs text-blue-100 mb-0">
                Changing your preferences will change the type of jobs you see and get recommendations for.
             </p>
          </div>
          {/* Visual Decoration */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 transform skew-x-12"></div>
       </div>

       {/* Form Sections */}
       {[
          { title: 'What Matters to You', desc: 'Choose your top 5 priorities for your new role', tags: ['Challenging work', 'Recognition and Reward', 'Career Advancement', 'Great Tech & Tools', 'Development and Progression'] },
          { title: 'Company Preference', desc: 'Industry and company preference', tags: ['Fintech', 'Edutech', 'Consulting'], inputs: [{label: 'What size of company would you like to work?', value: 'Select company size'}, {label: 'You can select multiple company sizes', value: '1-10 employees', isTag: true}, {label: '', value: '1000+', isTag: true}] },
          { title: 'Language Proficiency', desc: 'Choose the languages you are proficient in', inputs: [{label: 'Select Language', value: 'Select Language'}], tags: ['English', 'French', 'Spanish', 'Arabic', 'German', 'Portuguese'] },
          { title: 'Income Expectation', inputs: [{label: 'Income Duration', value: 'Select Income Duration'}, {label: 'Currency', value: 'Select Currency'}, {label: 'Desired Income Range', value: '', double: true}] },
          { title: 'Work Preference', desc: 'Select the type of workplace structure you like to work in', inputs: [{label: 'Work Preference', value: 'Work Preference'}, {label: 'How soon can you start working?', value: '2 Weeks'}, {label: 'What is your availability for work?', value: 'Full Time'}], tags: ['Remote', 'Hybrid'] },
          { title: 'Location', inputs: [{label: 'Country of Residence', value: 'Country', half: true}, {label: 'City of Residence', value: 'Country', half: true}, {label: 'Where do you want to receive offers from?', value: '3 Selections', subTags: ['United Kingdom', 'USA', 'Canada']}, {label: 'What countries do you have the legal right to work?', value: '3 Selections', subTags: ['United Kingdom', 'USA', 'Canada']}] }
       ].map((section, idx) => (
          <div key={idx} className={cardClass}>
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-sm font-bold text-slate-800">{section.title}</h3>
                   {section.desc && <p className="text-xs text-slate-500 mt-1">{section.desc}</p>}
                </div>
                <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                   Save
                </button>
             </div>

             <div className="space-y-4">
                {section.inputs?.map((input, i) => (
                   <div key={i} className={input.half ? 'inline-block w-[calc(50%-8px)] mr-4 last:mr-0' : 'block'}>
                      {input.label && <label className="block text-xs font-bold text-slate-700 mb-1.5">{input.label}</label>}
                      
                      {input.double ? (
                         <div className="flex gap-4">
                            <input type="text" placeholder="min" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
                            <input type="text" placeholder="max" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400" />
                         </div>
                      ) : (
                         <div className="relative">
                            {!input.isTag && (
                               <select className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-400 text-slate-600 appearance-none">
                                  <option>{input.value}</option>
                               </select>
                            )}
                            {input.subTags && (
                               <div className="flex gap-2 mt-2">
                                  {input.subTags.map(t => (
                                     <span key={t} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold flex items-center gap-1">
                                        {t} <span className="cursor-pointer hover:text-blue-800">×</span>
                                     </span>
                                  ))}
                               </div>
                            )}
                         </div>
                      )}
                   </div>
                ))}

                {section.tags && (
                   <div className="flex flex-wrap gap-2 mt-2">
                      {section.tags.map(tag => (
                         <span key={tag} className="px-3 py-1.5 border border-gray-200 rounded-full text-xs font-medium text-slate-600 cursor-pointer hover:border-blue-300 hover:text-blue-600 transition-colors bg-white">
                            {tag}
                         </span>
                      ))}
                   </div>
                )}
             </div>
          </div>
       ))}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-slate-900 to-blue-900">
      </div>

      <div className="px-8 pb-8">
         {/* Profile Header Info */}
         <div className="relative -mt-12 mb-8 flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 shadow-lg overflow-hidden relative z-10">
               <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-16  md:pt-0">
               <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">Rema Olufemi</h1>
                  <CheckCircle2 size={18} className="text-blue-500 fill-blue-50" />
               </div>
               <p className="text-xs text-slate-500 font-mono">AZ71008</p>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                     <MapPin size={14} /> Lagos, NG
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                     <Linkedin size={14} className="text-blue-700" />
                  </div>
               </div>
            </div>
         </div>

         {/* Tabs */}
         <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {['Overview', 'Resumé', 'Preferences'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab as Tab)}
                  className={`pb-3 text-xs font-bold whitespace-nowrap transition-all relative ${
                     activeTab === tab 
                        ? 'text-blue-600' 
                        : 'text-slate-500 hover:text-slate-700'
                  }`}
               >
                  {tab}
                  {activeTab === tab && (
                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                  )}
               </button>
            ))}
         </div>

         {/* Tab Content */}
         <div className="max-w-5xl">
            {activeTab === 'Overview' && <OverviewTab />}
            {activeTab === 'Resumé' && <OverviewTab />} {/* Reusing Overview for simplicity as requested structure is similar */}
            {activeTab === 'Preferences' && <PreferencesTab />}
         </div>

      </div>
    </div>
  );
};

export default ProfileView;