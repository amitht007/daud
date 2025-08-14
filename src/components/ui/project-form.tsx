"use client"

import { useState } from 'react'
import { projectData } from '@/data/projectData'

export default function InfrastructureForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    cloudProvider: '',
    infrastructure: [],
    projects: []
  })

  const [descriptions, setDescriptions] = useState({})
  const [openDescriptions, setOpenDescriptions] = useState({})

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMultiSelectChange = (name:string, value:string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const handleDescriptionChange = (id:string, description:string) => {
    setDescriptions(prev => ({ ...prev, [id]: description }))
  }

  const toggleDescription = (id:string) => {
    setOpenDescriptions(prev => ({ ...prev, [id]: !prev[id] }))
  }

const handleSubmit = async () => {
  const infraKV = formData.infrastructure.reduce((acc, id) => {
    acc[id] = descriptions[`infra-${id}`] || "";
    return acc;
  }, {} as Record<string, string>);

  const projectKV = formData.projects.reduce((acc, id) => {
    acc[id] = descriptions[`project-${id}`] || "";
    return acc;
  }, {} as Record<string, string>);

  const finalData = {
    clientName: formData.clientName,
    cloudProvider: formData.cloudProvider,
    infrastructure: infraKV,
    projects: projectKV
  };
  const jsonString = JSON.stringify(finalData);
  console.log("[PROJECT-FORM] Deploy Infrastructure clicked. Data:", jsonString);

  // Send to backend API to insert into requests table
  try {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    });
    const result = await res.json();
    if (res.ok) {
      alert("Request submitted successfully!");
    } else {
      alert(result.message || "Failed to submit request.");
    }
  } catch (err) {
    alert("Error submitting request.");
    console.error("[PROJECT-FORM] Error submitting request:", err);
  }
};

  const cloudProvidersOptions=projectData["cloudProviders"]
  const infrastructureOptions =projectData["infrastructure"]
  const projectOptions =projectData["project"]

  const getSelectedInfraDetails = () => {
    return formData.infrastructure.map(id => 
      infrastructureOptions.find(option => option.id === id)
    ).filter(Boolean)
  }

  const getSelectedProjectDetails = () => {
    return formData.projects.map(id => 
      projectOptions.find(option => option.id === id)
    ).filter(Boolean)
  }

  return (
    <div className="px-6 py-6 max-md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Infrastructure Setup</h1>
          <p className="text-lg text-slate-300">
            Configure your cloud infrastructure with automated provisioning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client & Cloud Provider */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center mb-4">
                <span className="text-lg mr-2">⚙️</span>
                <h2 className="text-xl font-bold text-slate-100">Basic Configuration</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Client Name *</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cloud Provider *</label>
                  <select
                    name="cloudProvider"
                    value={formData.cloudProvider}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select provider</option>
                    {cloudProvidersOptions.map(provider => (
                      <option className='' key={provider.id} value={provider.id}>{provider.label} {provider.icon}</option>
                    ))}
                    
                  </select>
                </div>
              </div>
            </div>

            {/* Infrastructure Components */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏗️</span>
                  <h2 className="text-xl font-bold text-slate-100">Infrastructure</h2>
                </div>
                {formData.infrastructure.length > 0 && (
                  <span className="text-sm bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                    {formData.infrastructure.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {infrastructureOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div
                      className={`relative p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.infrastructure.includes(option.id)
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                      onClick={() => handleMultiSelectChange('infrastructure', option.id)}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{option.icon}</div>
                        <h3 className="text-xs font-medium text-slate-100 leading-tight">
                          {option.label}
                        </h3>
                        {formData.infrastructure.includes(option.id) && (
                          <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Toggle for Infrastructure */}
                    {formData.infrastructure.includes(option.id) && (
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => toggleDescription(`infra-${option.id}`)}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          {openDescriptions[`infra-${option.id}`] ? '📝 Close Notes' : '📝 Add Notes'}
                        </button>
                        {openDescriptions[`infra-${option.id}`] && (
                          <textarea
                            placeholder="Add specifications or notes..."
                            value={descriptions[`infra-${option.id}`] || ''}
                            onChange={(e) => handleDescriptionChange(`infra-${option.id}`, e.target.value)}
                            className="w-full px-2 py-1 text-xs bg-slate-700/50 border border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            rows={2}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Types */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🚀</span>
                  <h2 className="text-xl font-bold text-slate-100">Project Types</h2>
                </div>
                {formData.projects.length > 0 && (
                  <span className="text-sm bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                    {formData.projects.length} selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {projectOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div
                      className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        formData.projects.includes(option.id)
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                      onClick={() => handleMultiSelectChange('projects', option.id)}
                    >
                      <div className="text-center">
                        <div className="text-xl mb-2">{option.icon}</div>
                        <h3 className="text-xs font-medium text-slate-100">
                          {option.label}
                        </h3>
                        {formData.projects.includes(option.id) && (
                          <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Toggle for Projects */}
                    {formData.projects.includes(option.id) && (
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => toggleDescription(`project-${option.id}`)}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          {openDescriptions[`project-${option.id}`] ? '📝 Close Notes' : '📝 Add Notes'}
                        </button>
                        {openDescriptions[`project-${option.id}`] && (
                          <textarea
                            placeholder="Add project requirements or notes..."
                            value={descriptions[`project-${option.id}`] || ''}
                            onChange={(e) => handleDescriptionChange(`project-${option.id}`, e.target.value)}
                            className="w-full px-2 py-1 text-xs bg-slate-700/50 border border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            rows={2}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Configuration Summary */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 sticky top-6">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Configuration Summary
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-slate-400">Client:</span>
                  <span className="text-slate-100 ml-2 font-medium">
                    {formData.clientName || 'Not specified'}
                  </span>
                </div>
                
                <div>
                  <span className="text-slate-400">Cloud Provider:</span>
                  <span className="text-slate-100 ml-2 font-medium">
                    {formData.cloudProvider ? formData.cloudProvider.toUpperCase() : 'Not selected'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400">Infrastructure:</span>
                  <span className="text-blue-300 ml-2 font-medium">
                    {formData.infrastructure.length} selected
                  </span>
                  {formData.infrastructure.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {getSelectedInfraDetails().map(item => (
                        <div key={item.id} className="flex items-center text-xs bg-slate-700/30 rounded px-2 py-1">
                          <span className="mr-1">{item.icon}</span>
                          <span className="text-slate-200">{item.label}</span>
                          {descriptions[`infra-${item.id}`] && (
                            <span className="ml-auto text-blue-400">📝</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-slate-400">Projects:</span>
                  <span className="text-blue-300 ml-2 font-medium">
                    {formData.projects.length} selected
                  </span>
                  {formData.projects.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {getSelectedProjectDetails().map(item => (
                        <div key={item.id} className="flex items-center text-xs bg-slate-700/30 rounded px-2 py-1">
                          <span className="mr-1">{item.icon}</span>
                          <span className="text-slate-200">{item.label}</span>
                          {descriptions[`project-${item.id}`] && (
                            <span className="ml-auto text-blue-400">📝</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                {/* Action Buttons */}
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6 mt-4">
              <h3 className="text-lg font-bold text-slate-100 mb-3">Ready to Deploy?</h3>
              <p className="text-slate-300 text-sm mb-4">
                Review your configuration and deploy your infrastructure.
              </p>
              
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Deploy Infrastructure
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ clientName: '', cloudProvider: '', infrastructure: [], projects: [] })
                    setDescriptions({})
                    setOpenDescriptions({})
                  }}
                  className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-all duration-300"
                >
                  Reset All
                </button>
              </div>
            </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  )
}