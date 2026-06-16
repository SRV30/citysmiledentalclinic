import React, { useEffect, useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { createPortal } from 'react-dom';

const CertificateModal = ({ isOpen, onClose, imageUrl, title }) => {
  const [zoom, setZoom] = useState(1);
  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Disable scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h3 id="modal-title" className="text-lg font-bold text-slate-900 ml-2">
            {title || 'Certificate of Registration'}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleZoom}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              title={zoom === 1 ? "Zoom In" : "Zoom Out"}
            >
              {zoom === 1 ? <ZoomIn className="w-5 h-5" /> : <ZoomOut className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-500 transition-colors"
              title="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto p-4 bg-slate-50 flex items-start justify-center">
          <div
            className={`transition-all duration-300 ease-in-out cursor-zoom-in ${zoom > 1 ? 'w-[180%] md:w-[150%] max-w-none' : 'w-full h-full'}`}
            onClick={toggleZoom}
          >
            <img
              src={imageUrl}
              alt={title || "Medical Certificate"}
              className={`w-full h-auto object-contain rounded-lg shadow-lg bg-white mx-auto`}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
            <p className="text-xs text-slate-400 mr-auto flex items-center gap-1">
                <Maximize2 className="w-3 h-3" /> Click image to zoom
            </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;
