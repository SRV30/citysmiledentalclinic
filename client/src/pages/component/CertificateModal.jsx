import React, { useEffect, useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
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
      // Small delay to ensure modal is in DOM before focusing
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
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
              aria-label={zoom === 1 ? "Zoom in on certificate" : "Zoom out of certificate"}
            >
              {zoom === 1 ? <ZoomIn className="w-5 h-5" aria-hidden="true" /> : <ZoomOut className="w-5 h-5" aria-hidden="true" />}
            </button>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
              aria-label="Close certificate modal"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto p-4 bg-slate-50 flex items-start justify-center">
          <button
            className={`transition-all duration-300 ease-in-out cursor-zoom-in block ${zoom > 1 ? 'w-[180%] md:w-[150%] max-w-none' : 'w-full h-full'}`}
            onClick={toggleZoom}
            aria-label={zoom === 1 ? "Zoom in" : "Zoom out"}
          >
            <img
              src={imageUrl}
              alt={title || "Medical Registration Certificate"}
              className={`w-full h-auto object-contain rounded-lg shadow-lg bg-white mx-auto`}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            />
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
            <p className="text-xs text-slate-400 mr-auto flex items-center gap-1" aria-hidden="true">
                <Maximize2 className="w-3 h-3" /> Click image to zoom
            </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/50"
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
