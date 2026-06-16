import React, { useEffect, useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, ShieldCheck } from 'lucide-react';
import { createPortal } from 'react-dom';

const CertificateModal = ({ isOpen, onClose, imageUrl, title }) => {
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Disable scroll & set focus when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const toggleZoom = () => {
    setZoom(prev => (prev === 1 ? 2 : 1));
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 md:p-8 transition-all duration-300"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-[2.5rem] overflow-hidden w-full max-w-5xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] ring-1 ring-white/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <h3 id="modal-title" className="text-lg font-extrabold text-slate-900 tracking-tight">
                Verified Credential
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleZoom}
              className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
              aria-label={zoom === 1 ? "Enlarge document" : "Reset document scale"}
            >
              {zoom === 1 ? <ZoomIn className="w-5 h-5" aria-hidden="true" /> : <ZoomOut className="w-5 h-5" aria-hidden="true" />}
            </button>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-xl text-slate-500 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto p-8 bg-slate-50/50 flex items-start justify-center custom-scrollbar">
          <button
            className={`transition-all duration-500 ease-out cursor-zoom-in block outline-none ${zoom > 1 ? 'w-[180%] md:w-[150%] max-w-none' : 'w-full h-full'}`}
            onClick={toggleZoom}
            aria-label={zoom === 1 ? "Zoom in" : "Zoom out"}
          >
            <img
              src={imageUrl}
              alt={title || "Official Medical Registration Certificate"}
              className={`w-full h-auto object-contain rounded-2xl shadow-2xl bg-white mx-auto transform transition-transform duration-500`}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            />
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Maximize2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Interactive Document Viewer</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="hidden md:block text-xs font-medium text-slate-400 mr-2 italic">Official registration for Dr. Aditya Shivi</p>
                <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-500/50"
                >
                    Close Viewer
                </button>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;
