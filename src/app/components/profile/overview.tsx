
import React, {useState} from "react";
import { User, MapPin, Linkedin, Clock, Globe, Calendar, Phone, Edit, Video, Play, Briefcase, Plus, GraduationCap } from 'lucide-react';

export default function Overview() {
    const [isAvailable, setIsAvailable] = useState(true);

     const personalInfo = [
    { icon: User, label: "Gender", value: "Male" },
    { icon: Globe, label: "Country of Origin", value: "Nigeria" },
    { icon: MapPin, label: "Location", value: "Yaba, 10001, Lagos, Nigeria" },
    { icon: Clock, label: "Timezone", value: "UTC +1" },
    { icon: Calendar, label: "Date Of Birth", value: "04/12/1999" },
    { icon: Phone, label: "Phone Number", value: "+234 708028020" },
    { icon: Linkedin, label: "LinkedIn URL", value: "https://www.linkedin.com/in/austin..." },
  ];

   const [workExperiences, setWorkExperiences] = useState([
    {
      role: "Product Designer",
      company: "TogTard",
      date: "May 2023 - Present",
      description:
        "Worked in a team of two designers to move low fidelity designs to high fidelity within a month. This improved wireframing skills and contributed to increasing company sales.",
      tags: ["Fintech", "Insurance"],
    },
    {
      role: "Product Designer",
      company: "Tedbree",
      date: "May 2020 - Present",
      description:
        "Worked in a team of two designers to move low fidelity designs to high fidelity within a month. This helped with improving wireframing skills and boosted company performance.",
      tags: ["Fintech", "Insurance"],
    },
  ]);

    const [educationList, setEducationList] = useState([
    {
      degree: "Bachelors - Applied Maths",
      institution: "University of Lagos",
      date: "May 2016 - Mar 2021",
    },
    {
      degree: "Bachelors - Applied Maths",
      institution: "University of Lagos",
      date: "May 2016 - Mar 2021",
    },
  ]);

const [portfolioItems, setPortfolioItems] = useState([
    {
      title: "Web Application",
      description:
        "Magna feugiat praesent, fam elit massa. Blandit kong dignis sissim. Variusdo progt, tan sit massa.",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      title: "Mobile App",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      title: "E-commerce Platform",
      description:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200",
    },
  ]);

  return (
    <div>
      {/* Personal Information Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Personal Information
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>

        {/* Work Availability */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Work Availability
          </h4>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                isAvailable ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isAvailable ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-gray-700 font-medium">Available</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 leading-relaxed mb-8">
          I&apos;m a Product Designer based in Melbourne, Australia, I specialise in
          UI/UX design, brand strategy, and Webflow development. I&apos;m always
          striving to grow and learn something new and I don&apos;t take myself too
          seriously...
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="font-medium text-gray-900 truncate">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Professional Role Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Professional Role
        </h3>

        <div>
          <h4 className="text-sm font-semibold text-blue-600 mb-4">
            Primary Role
          </h4>
          <div className="flex gap-8">
            <div>
              <p className="text-lg font-bold text-gray-900">UX Designer</p>
              <p className="text-sm text-gray-500">0-2 Years Experience</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                Graphic Designer
              </p>
              <p className="text-sm text-gray-500">0-2 Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies and Frameworks Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Technologies and Frameworks
        </h3>

        <div className="flex flex-wrap gap-3">
          {[
            "Figma",
            "Adobe XD",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Adobe Indesign",
            "Adobe After Effects",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-full text-sm font-medium"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Resume/CV Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Resumé/CV</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Rema_resume.pdf</p>
              <p className="text-sm text-gray-500">Uploaded 24/03/25</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="text-sm font-medium">View Resume</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="text-sm font-medium">Upload New Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Resume Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Video Resumé</h3>

        <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video max-w-2xl">
          {/* Video Thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/api/placeholder/800/450"
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-50"
            />
            {/* Play Button Overlay */}
            <button className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Play
                className="w-8 h-8 text-gray-900 ml-1"
                fill="currentColor"
              />
            </button>
          </div>

          {/* Small Preview Image */}
          <div className="absolute bottom-4 right-4 w-48 h-32 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <img
              src="/api/placeholder/192/128"
              alt="Video preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">Recorded 07/04/25</p>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
            <Video className="w-4 h-4" />
            <span className="text-sm font-medium">Record New Video Resume</span>
          </button>
        </div>
      </div>

      {/* Work Experience Section */}
 <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {workExperiences.map((item, idx) => (
        <div
          key={idx}
          className={`relative ${idx === 0 ? "pb-8 border-b border-gray-200" : "pt-8"}`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{item.role}</h4>
                  <p className="text-base font-medium text-gray-700 mt-1">{item.company}</p>
                  <time className="text-sm text-gray-500 mt-1">{item.date}</time>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Description</h5>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full mt-8 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New</span>
      </button>
    </div>

      {/* Education Section */}
   <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Education</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {educationList.map((item, idx) => (
        <div
          key={idx}
          className={`bg-gray-50 rounded-lg p-4 mb-4 ${
            idx === educationList.length - 1 ? "" : "mb-4"
          }`}
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900">{item.degree}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add New Button */}
      <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New</span>
      </button>
    </div>

      {/* Portfolio Section */}
<div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Portfolio</h3>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Edit className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-200">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Button */}
      <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New</span>
      </button>
    </div>
    </div>
  );
}
