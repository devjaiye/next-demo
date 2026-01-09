"use client"
import React, { useState } from 'react';
import { 
  User, Building2, Plus, FileText, X, Upload, Eye, Search, 
  Download, Share2, Printer, MoreVertical, Calendar, HardDrive 
} from 'lucide-react';

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
  { id: '1', name: 'Contract_2024.pdf', size: '200 KB', dateSigned: 'Jan 4, 2022', type: 'company' },
  { id: '2', name: 'Rate_Agreement_v2.pdf', size: '200 KB', dateSigned: 'Jan 4, 2022', type: 'company' },
  { id: '3', name: 'NDA_Signed_Final.pdf', size: '1.2 MB', dateSigned: 'Dec 12, 2021', type: 'company' },
  { id: '4', name: 'Identification_Card.jpg', size: '4.5 MB', dateSigned: 'Nov 20, 2021', type: 'personal' },
];

// --- Components ---

const DocumentPreviewModal = ({ doc, onClose }: { doc: Document | null; onClose: () => void }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{doc.name}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span>{doc.size}</span>
                <span>•</span>
                <span>{doc.dateSigned}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
              <Download size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
              <Printer size={20} />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content - Simulated Viewer */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-8 flex justify-center">
          <div className="bg-white shadow-lg w-full max-w-2xl min-h-full rounded-sm p-12 space-y-8">
            {/* Mock Document Content */}
            <div className="w-24 h-8 bg-slate-200 rounded animate-pulse mb-8" />
            
            <div className="space-y-4">
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-slate-100 rounded animate-pulse" />
            </div>

            <div className="space-y-4 pt-8">
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-slate-100 rounded animate-pulse" />
            </div>
            
            <div className="pt-16 flex justify-between items-end">
              <div className="w-32 h-20 border-b border-slate-300" /> 
              <div className="w-24 h-24 rounded-full bg-blue-50/50 border-2 border-blue-100 flex items-center justify-center -rotate-12">
                 <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Signed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between items-center">
          <div className="text-xs text-slate-400 font-medium">
             Preview Mode
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
            <Share2 size={16} /> Share Document
          </button>
        </div>
      </div>
    </div>
  );
};

const UploadDocumentModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean; onClose: () => void; onUpload: (doc: any) => void }) => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = () => {
    setSelectedFile('new_document.pdf');
  };

  const handleSubmit = () => {
    if (title && selectedFile) {
      onUpload({ title, fileName: selectedFile });
      onClose();
      // Reset
      setTitle('');
      setSelectedFile(null);
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
              placeholder="e.g. Employment Contract"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Add Document</label>
            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center justify-between group hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={18} />
                  </div>
                  <div>
                      <p className="text-sm font-bold text-slate-700">{selectedFile || 'Click to Upload'}</p>
                      <p className="text-xs text-slate-400">{selectedFile ? 'File selected' : 'PDF, DOCX, JPG up to 10MB'}</p>
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
            disabled={!title || !selectedFile}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentsView: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);

  const handleUpload = (doc: any) => {
    const newDoc: Document = {
      id: Math.random().toString(),
      name: doc.title,
      size: '150 KB', 
      dateSigned: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: 'personal'
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      {/* Modals */}
      <UploadDocumentModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUpload={handleUpload}
      />
      
      <DocumentPreviewModal 
        doc={viewingDoc} 
        onClose={() => setViewingDoc(null)} 
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Personal Documents</p>
                <h3 className="text-3xl font-bold text-slate-900">{documents.filter(d => d.type === 'personal').length}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Company Documents</p>
                <h3 className="text-3xl font-bold text-slate-900">{documents.filter(d => d.type === 'company').length}</h3>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Building2 size={24} />
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">All Documents</h3>
              <div className="flex gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                 </div>
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Plus size={16} />
                  Upload
                </button>
              </div>
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
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === 'company' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-800">{doc.name}</p>
                            <p className="text-xs text-slate-400">{doc.size} • {doc.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {doc.dateSigned}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setViewingDoc(doc)}
                          className="text-blue-600 font-bold text-sm hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ml-auto"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {documents.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                            <HardDrive size={32} className="text-slate-200" />
                            <p>No documents found.</p>
                        </div>
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