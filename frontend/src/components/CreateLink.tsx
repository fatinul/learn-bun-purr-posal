import { useState } from 'react';
import { api } from '../utils/api';

const LIMITS = {
  title: 18,
  sender: 15,
  receiver: 15,
  message: 130
};

export default function CreateLink() {
  const [title, setTitle] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    // Reset back to "Copy" after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    const baseUrl = window.location.origin;

    try {
      const data = await api.create(title, sender, receiver, message);
      const path = new URL(data.link).pathname;
      setGeneratedLink(`${baseUrl}${path}`);
    } catch (error) {
      console.error("Failed to generate link:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4 relative overflow-hidden">

      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 bg-cat-checkered pointer-events-none opacity-30" />

      {/* MAIN CONTAINER (Scaled for Mobile) */}
      <div className="flex shadow-2xl items-stretch relative z-10 scale-75 sm:scale-90 md:scale-100 transition-transform rounded-[2rem] overflow-hidden">

        {/* LEFT BOX: INPUT FORM */}
        <div className="bg-white w-80 min-h-[400px] rounded-l-[2rem] flex flex-col p-8 border-4 border-r-0 border-orange-500">
          <h1 className="text-xl font-black text-orange-400 mb-6 tracking-tighter">
            😼 The PURR-posal
          </h1>
          <div className="space-y-4 flex-1">
            {/* TITLE INPUT */}
            <div className="relative">
              <input
                className="w-full p-2 border-b-2 border-orange-100 focus:border-orange-500 outline-none transition-colors text-sm pr-12"
                placeholder="Happy..."
                maxLength={LIMITS.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="absolute right-0 bottom-2 text-[10px] font-black text-orange-300 opacity-50 uppercase">
                {title.length}/{LIMITS.title}
              </span>
            </div>

            {/* SENDER INPUT */}
            <div className="relative">
              <input
                className="w-full p-2 border-b-2 border-orange-100 focus:border-orange-500 outline-none transition-colors text-sm pr-12"
                placeholder="From..."
                maxLength={LIMITS.sender}
                onChange={(e) => setSender(e.target.value)}
              />
              <span className="absolute right-0 bottom-2 text-[10px] font-black text-orange-300 opacity-50 uppercase">
                {sender.length}/{LIMITS.sender}
              </span>
            </div>

            {/* RECEIVER INPUT */}
            <div className="relative">
              <input
                className="w-full p-2 border-b-2 border-orange-100 focus:border-orange-500 outline-none transition-colors text-sm pr-12"
                placeholder="To..."
                maxLength={LIMITS.receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
              <span className="absolute right-0 bottom-2 text-[10px] font-black text-orange-300 opacity-50 uppercase">
                {receiver.length}/{LIMITS.receiver}
              </span>
            </div>

            {/* MESSAGE TEXTAREA */}
            <div className="relative">
              <textarea
                className="w-full p-2 border-2 border-orange-50 rounded-xl focus:border-orange-500 outline-none transition-colors text-sm h-24 resize-none"
                placeholder="Your secret message..."
                maxLength={LIMITS.message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span className={`absolute right-2 bottom-2 text-[10px] font-black uppercase transition-colors
      ${message.length >= LIMITS.message ? 'text-orange-600' : 'text-orange-300 opacity-50'}`}>
                {message.length}/{LIMITS.message}
              </span>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            className="hover:-rotate-1 cursor-pointer w-full bg-orange-500 text-white font-black uppercase tracking-widest py-3 rounded-xl mt-4 hover:bg-orange-400 transition-all shadow-md active:scale-95"
          >
            Generate
          </button>
        </div>

        {/* RIGHT BOX: RESULT & KO-FI, MAE (The Door) */}
        <div className="bg-orange-500 w-48 rounded-r-[2rem] relative flex flex-col items-center justify-between py-8 px-4 border-l border-orange-400">

          {/* TOP SECTION: LINK RESULT */}
          <div className="w-full">
            <p className="text-[9px] font-black text-orange-300 uppercase tracking-widest mb-2 text-center">Your Link</p>
            {generatedLink ? (
              <div className="flex flex-col gap-2">
                <div className="bg-orange-900/50 p-2 rounded-lg border border-orange-400/30">
                  <p className="font-mono text-[10px] text-white break-all leading-tight opacity-80">
                    {generatedLink}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`hover:-rotate-1 w-full font-black uppercase text-[10px] py-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-95 shadow-sm
    ${copied
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-orange-600 hover:bg-orange-50'
                    }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center border-2 border-dashed border-orange-100/40 rounded-lg">
                <span className="text-orange-100 text-[10px] font-bold uppercase italic">Waiting...</span>
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: DONATION */}
          <div className="w-full flex flex-col items-center gap-2">
            <p className="text-[9px] font-black text-orange-300 uppercase tracking-widest text-center">Support Me</p>
            <div className='flex flex-row gap-2'>
              <a
                href="https://ko-fi.com/Q5Q31TPY85"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 bg-white rounded-2xl hover:bg-pink-50 transition-all hover:-rotate-6 shadow-lg"
              >
                <img
                  src="${window.location.origin}/kofi_symbol.svg"
                  alt="Ko-fi"
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                />
              </a>
              {/* MAYBANK MAE */}
              <button
                onClick={() => setShowQR(true)}
                className="group relative flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-2xl hover:bg-yellow-300 transition-all hover:rotate-6 shadow-lg cursor-pointer"
              >
                <span className="font-black text-[10px] text-yellow-900">MAE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MAE QR MODAL */}
      {showQR && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300"
          onClick={() => setShowQR(false)} // Close when clicking background
        >
          {/* Backdrop Blur */}
          <div className="absolute inset-0 bg-orange-900/60 backdrop-blur-sm" />

          {/* Modal Card */}
          <div
            className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center max-w-xs w-full border-8 border-yellow-400 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the QR itself
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white border-4 border-yellow-400 rounded-full font-black text-yellow-600 hover:scale-110 transition-transform shadow-lg"
            >
              ✕
            </button>

            <div className="bg-yellow-400 px-4 py-1 rounded-full mb-4">
              <p className="text-[10px] font-black text-yellow-900 uppercase">Maybank MAE</p>
            </div>

            <div className="bg-white p-2 rounded-2xl border-4 border-orange-50">
              <img
                src={`${window.location.origin}/MAE_QR.png`}
                alt="Maybank QR"
                className="w-48 h-48 object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 bg-orange-50 p-3 rounded-2xl w-full border border-orange-100">
              <p className="text-[9px] text-orange-400 font-bold uppercase tracking-tight text-center mb-1">
                Verify Recipient Name:
              </p>
              <p className="text-[12px] text-orange-900 font-black text-center">
                Muhammad Fatinul Haziq
              </p>
            </div>

            <p className="mt-4 text-[11px] font-bold text-orange-400 text-center leading-tight">
              Thank you for the treats! <br /> 🥣✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
