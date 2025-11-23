import React, { useState } from 'react';

type ModalType = 'ABOUT' | 'CONTACT' | 'GUIDE' | 'PRIVACY' | 'TERMS' | 'DMCA' | null;

interface ModalContentProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col relative animate-fadeIn">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-6 overflow-y-auto text-gray-300 space-y-4 leading-relaxed">
        {children}
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800/50 rounded-b-xl flex justify-end">
        <button onClick={onClose} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">Close</button>
      </div>
    </div>
  </div>
);

const InfoModals: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingModal, setPendingModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setPendingModal(type);
    setShowWarning(true);
  };

  const confirmEnter = () => {
    setShowWarning(false);
    setActiveModal(pendingModal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setPendingModal(null);
  };

  return (
    <>
      {/* Floating Info Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => openModal('ABOUT')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          aria-label="Open Information"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>

      {/* Warning/Disclaimer Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <div className="bg-gray-900 border-2 border-yellow-600/50 rounded-xl max-w-md w-full p-8 text-center shadow-2xl">
             <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-900/30 mb-4">
               <svg className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Important Notice</h3>
             <p className="text-gray-300 mb-6">
               To ensure compliance with safety policies and provide you with the most accurate information, please acknowledge that you are viewing generated content and project documentation.
             </p>
             <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setShowWarning(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmEnter}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-bold shadow-lg shadow-indigo-500/30"
                >
                  CONTINUE
                </button>
             </div>
           </div>
        </div>
      )}

      {/* Quick Links Menu in Header or Footer context, but rendered here for the modal logic */}
      <div className="hidden">
        {/* This is just to satisfy the requirement that these exist as clickable entities if needed elsewhere */}
      </div>

      {activeModal === 'ABOUT' && (
        <ModalContent title="About Doodax" onClose={closeModal}>
          <p>Welcome to <strong>doodax.com</strong>, the premier destination for LLM prompt engineering and simulation.</p>
          <p>This project creates a bridge between advanced Gemini models and local execution environments like Ollama. Created by Hsini Mohamed, this tool aims to simplify the workflow for AI developers.</p>
          <p><strong>Website:</strong> doodax.com</p>
          <p><strong>Email:</strong> hsini.web@gmail.com</p>
        </ModalContent>
      )}

      {activeModal === 'CONTACT' && (
        <ModalContent title="Contact Us" onClose={closeModal}>
          <p>We value your feedback and inquiries.</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>Email:</strong> hsini.web@gmail.com</li>
            <li><strong>Support Hours:</strong> Mon-Fri, 9am - 5pm UTC</li>
            <li><strong>Address:</strong> Doodax Digital, Tech Valley</li>
          </ul>
        </ModalContent>
      )}

      {activeModal === 'GUIDE' && (
        <ModalContent title="User Guide" onClose={closeModal}>
          <h3 className="text-lg font-semibold text-white mt-2">1. System Context</h3>
          <p>Enter the persona you want the AI to adopt. Be specific about constraints and tone.</p>
          <h3 className="text-lg font-semibold text-white mt-4">2. User Query</h3>
          <p>Input the question or task you want to test against the system context.</p>
          <h3 className="text-lg font-semibold text-white mt-4">3. Analyze</h3>
          <p>Review the generated response to refine your prompt engineering strategies.</p>
        </ModalContent>
      )}

      {activeModal === 'PRIVACY' && (
        <ModalContent title="Privacy Policy" onClose={closeModal}>
          <p>At doodax.com, we prioritize your privacy.</p>
          <p className="mt-2">1. <strong>Data Collection:</strong> We do not store your prompts or queries on our servers. All processing is done via the API and returned directly to your browser.</p>
          <p>2. <strong>Cookies:</strong> We use minimal cookies for site functionality.</p>
          <p>3. <strong>Third Parties:</strong> Interaction with Google Gemini API is subject to Google's privacy terms.</p>
        </ModalContent>
      )}

      {activeModal === 'TERMS' && (
        <ModalContent title="Terms of Service" onClose={closeModal}>
          <p>By using this simulator, you agree to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Not use the service for illegal or harmful content generation.</li>
            <li>Respect the usage limits of the underlying APIs.</li>
            <li>Acknowledge that this is a simulation tool provided "as-is".</li>
          </ul>
        </ModalContent>
      )}

      {activeModal === 'DMCA' && (
        <ModalContent title="DMCA Policy" onClose={closeModal}>
          <p>We respect intellectual property rights. If you believe content on doodax.com infringes your copyright, please contact us immediately at <strong>hsini.web@gmail.com</strong> with:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Identification of the copyrighted work.</li>
            <li>Description of the infringing material.</li>
            <li>Your contact information.</li>
          </ul>
        </ModalContent>
      )}

      {/* Sticky Navigation for these items */}
      <div className="fixed top-0 left-0 w-full z-30 pointer-events-none">
        <div className="container mx-auto px-4 py-2 flex justify-end">
           <div className="pointer-events-auto bg-black/50 backdrop-blur-md rounded-b-lg px-4 py-2 flex gap-4 text-xs text-gray-400">
             <button onClick={() => openModal('ABOUT')} className="hover:text-white transition">About</button>
             <button onClick={() => openModal('GUIDE')} className="hover:text-white transition">Guide</button>
             <button onClick={() => openModal('CONTACT')} className="hover:text-white transition">Contact</button>
             <button onClick={() => openModal('PRIVACY')} className="hover:text-white transition">Privacy</button>
             <button onClick={() => openModal('TERMS')} className="hover:text-white transition">Terms</button>
             <button onClick={() => openModal('DMCA')} className="hover:text-white transition">DMCA</button>
           </div>
        </div>
      </div>
    </>
  );
};

export default InfoModals;