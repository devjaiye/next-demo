import React from 'react'
import { X } from 'lucide-react';


export default function Preference() {
  return (
            <div>
                {/* Profile Preferences Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-8 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Profile Preferences</h2>
                  <p className="text-blue-50">
                    Changing your preferences will change the type of jobs you see and get recommendations for.
                  </p>
                </div>

                {/* What Matters to You */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">What Matters to You</h3>
                      <p className="text-sm text-gray-600 mt-1">Choose your top 5 priorities for your new role</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {['Challenging work', 'Recognition and Reward', 'Career Advancement', 'Great Tech & Tools', 'Development and Progression'].map((priority) => (
                      <button
                        key={priority}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Preference */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Company Preference</h3>
                      <p className="text-sm text-gray-600 mt-1">Industry and company preference</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      What size of company would you like to work?
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select company size</option>
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>501+ employees</option>
                    </select>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      You can select multiple company sizes
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['Fintech', 'Edutech', 'Consulting'].map((industry) => (
                        <button
                          key={industry}
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Language Proficiency */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Language Proficiency</h3>
                      <p className="text-sm text-gray-600 mt-1">Choose the languages you are proficient in</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Select Language
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select Language</option>
                      <option>English</option>
                      <option>French</option>
                      <option>Spanish</option>
                      <option>Arabic</option>
                      <option>German</option>
                      <option>Portuguese</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {['English', 'French', 'Spanish', 'Arabic', 'German', 'Portuguese'].map((language) => (
                      <button
                        key={language}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Income Expectation */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Income Expectation</h3>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Income Duration
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Select Income Duration</option>
                        <option>Hourly</option>
                        <option>Monthly</option>
                        <option>Annually</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Currency
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Select Currency</option>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>NGN - Nigerian Naira</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Desired Income Range
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="min"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="max"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Preference */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Work Preference</h3>
                      <p className="text-sm text-gray-600 mt-1">Select the type of workplace structure you like to work in</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="space-y-6 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Work Preference
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Work Preference</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        How soon can you start working?
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>2 Weeks</option>
                        <option>Immediately</option>
                        <option>1 Month</option>
                        <option>2 Months</option>
                        <option>3+ Months</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        What is your availability for work?
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Contract</option>
                        <option>Freelance</option>
                      </select>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {['Remote', 'Hybrid'].map((type) => (
                        <button
                          key={type}
                          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Location</h3>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Save
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        City of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Where do you want to receive offers from?
                      </label>
                      <input
                        type="text"
                        placeholder="3 Selections"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['United Kingdom', 'USA', 'Canada'].map((country) => (
                          <span
                            key={country}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium"
                          >
                            {country}
                            <button className="hover:bg-blue-100 rounded-full p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        What countries do you have the legal right to work?
                      </label>
                      <input
                        type="text"
                        placeholder="3 Selections"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['United Kingdom', 'USA', 'Canada'].map((country) => (
                          <span
                            key={country}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium"
                          >
                            {country}
                            <button className="hover:bg-blue-100 rounded-full p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
  )
}
