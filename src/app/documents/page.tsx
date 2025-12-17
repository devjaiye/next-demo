"use client"
import React, { useState } from 'react';
import { User, Building2, Plus, FileText, X, Upload, Eye, Search } from 'lucide-react';

// --- Types ---

interface Document {
  id: string;
  name: string;
  size: string;
  dateSigned: string;
  type: 'personal' | 'company';
}

// --- Mock Data ---

const MOCK_DOCUMENTS: Document[] = [
  { id: '1', name: 'Contract', size: '200 KB', dateSigned: 'Jan 4, 2022', type: 'company' },
  { id: '2', name: 'Rate Agreement', size: '200 KB', dateSigned: 'Jan 4, 2022', type: 'company' },
  { id: '3', name: 'NDA_Signed.pdf', size: '1.2 MB', dateSigned: 'Dec 12, 2021', type: 'company' },
  { id: '4', name: 'Identification_Card.jpg', size: '4.5 MB', dateSigned: 'Nov 20, 2021', type: 'personal' },
];

// --- Components ---

const UploadDocumentModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean; onClose: () => void; onUpload: (doc: any) => void }) => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = () => {
    // Simulate file selection
    setSelectedFile('new_document.pdf');
  };

  const handleSubmit = () => {
    if (title && selectedFile) {
      onUpload({ title, fileName: selectedFile });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-900">Upload Document</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Add Document</label>
            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Upload size={18} />
                  </div>
                  <div>
                      <p className="text-sm font-bold text-slate-700">{selectedFile || 'Click to Upload'}</p>
                      <p className="text-xs text-slate-400">{selectedFile ? 'File selected' : '{Supported Format here}'}</p>
                  </div>
                </div>
                <button 
                  onClick={handleFileSelect}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Select File
                </button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentsView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);

  const handleUpload = (doc: any) => {
    const newDoc: Document = {
      id: Math.random().toString(),
      name: doc.title || doc.fileName,
      size: '150 KB', // Mock size
      dateSigned: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'personal'
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      <UploadDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpload={handleUpload}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-slate-600 mb-4">
                <User size={20} />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">Personal Documents</p>
              <h3 className="text-3xl font-bold text-slate-900">20</h3>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-slate-600 mb-4">
                <Building2 size={20} />
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">Documents from your company</p>
              <h3 className="text-3xl font-bold text-slate-900">42</h3>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">All Documents</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Upload Document
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-xs uppercase text-slate-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">File name</th>
                    <th className="px-6 py-4">Date Signed</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">{doc.name}</p>
                            <p className="text-xs text-slate-400">{doc.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {doc.dateSigned}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 font-bold text-sm hover:text-blue-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {documents.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                        No documents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DocumentsView;
