import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { api } from '../utils/api';

// Type definition for the love message data
interface LoveData {
  title: string;
  receiver: string;
  sender: string;
  message: string;
}

// --- LOVE BOX PAGE ---
export default function LoveBox() {
  const { token } = useParams();
  const [data, setData] = useState<LoveData | null>(null);
  const [position, setPosition] = useState('middle');
  const [isAccepted, setIsAccepted] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [showPaw, setShowPaw] = useState(false);

  useEffect(() => {
    if (token) {
      api.getLove(token).then(setData);
    }
  }, [token]);

  const handleNo = () => {
    // 1. Immediate feedback: slider moves and box shakes
    setShouldShake(true);
    setPosition('right');

    // Generate random timings (in milliseconds)
    const reactionDelay = Math.floor(Math.random() * 1000) + 100;
    const stayDuration = Math.floor(Math.random() * 1000) + 400;

    // 2. The "Thinking" Delay
    setTimeout(() => {
      setShouldShake(false);
      setShowPaw(true);

      // 3. The "Stay" Duration (how long the paw stays out)
      setTimeout(() => {
        setShowPaw(false);
        setPosition('middle');
      }, stayDuration);

    }, reactionDelay);
  };

  const handleYes = () => {
    setPosition('left');

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ea580c', '#f43f5e']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ea580c', '#f43f5e']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    setTimeout(() => {
      setIsAccepted(true);
      frame(); // Starts the continuous burst as the box opens
    }, 400);
  };

  if (!data) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-orange-50 p-4">


      <div className="absolute inset-0 bg-cat-checkered pointer-events-none opacity-50" />


      <div className={`flex shadow-2xl items-stretch relative z-10 scale-75 sm:scale-90 md:scale-100 transition-transform rounded-[2rem] overflow-hidden 
      ${shouldShake ? 'animate-shake' : ''}`}>
        <div className="w-80 h-80 relative z-10">
          {/* THE MESSAGE DIV (Bottom Layer) */}
          <div className="absolute inset-0 bg-orange-900 rounded-l-[2rem] flex flex-col items-center justify-center p-6 text-center border-4 border-r-0 border-orange-500 shadow-inner">
            <h2 className="text-5xl mb-4 animate-wiggle">🐱</h2>
            <p className="text-2xl font-bold text-orange-600 animate-wiggle">{data.title}</p>
            <p className="text-lg font-medium text-orange-400 mt-2 italic px-4">
              "{data.message}"
            </p>
          </div>

          {/* THE SWITCH DIV (Top Layer / Cover) */}
          <div
            className={`absolute inset-0 bg-orange-500 rounded-l-3xl flex flex-col items-center justify-center p-6 text-white text-center transition-all duration-700 ease-in-out z-20 overflow-hidden
        ${isAccepted ? 'opacity-0 -translate-y-10 scale-130 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'}`}
          >
            <p className="text-white text-2xl font-medium font-serif italic capitalize mb-1 opacity-90">
              For {data.receiver}.
            </p>

            {/* The Switch Control */}
            <div className="bg-orange-700 w-48 h-12 rounded-full relative p-1 flex items-center">
              <div className={`absolute w-20 h-10 bg-white rounded-full transition-all duration-300 shadow-md flex items-center justify-center z-20
          ${position === 'left' ? 'left-1' : position === 'right' ? 'left-[calc(100%-84px)]' : 'left-1/2 -translate-x-1/2'}`}>
                <span className="text-orange-600 font-bold uppercase text-xs font-black">Open</span>
              </div>
              <button onClick={handleYes} className="z-30 flex-1 h-full cursor-pointer"></button>
              <button onClick={handleNo} className="z-30 flex-1 h-full cursor-pointer"></button>
            </div>

            <div className="flex justify-between w-40 mt-2 text-xs font-black opacity-60 uppercase tracking-widest">
              <span>Yes</span>
              <span>No</span>
            </div>

            {/* THE CAT PAW */}
            <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-40
  ${showPaw ? 'right-0' : '-right-40'}`}>
              <div className="relative -rotate-90 scale-90">
                {/* Main Paw Arm - Changed to bg-orange-400 with a darker orange border */}
                <div className="w-14 h-40 bg-orange-400 rounded-t-full shadow-xl border-t-4 border-orange-500 relative overflow-hidden">

                  {/* Subtle Orange Stripes */}
                  <div className="absolute top-10 left-0 w-full h-2 bg-orange-500/20 rotate-12"></div>
                  <div className="absolute top-16 left-0 w-full h-2 bg-orange-500/20 -rotate-12"></div>

                  {/* Main Large Pad (The "Heart" of the paw) */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-8 bg-pink-300 rounded-full shadow-inner"></div>

                  {/* Toe Beans - Slightly darker pink for better contrast on orange */}
                  <div className="absolute top-1 left-2 w-3 h-3 bg-pink-300 rounded-full shadow-inner"></div>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-300 rounded-full shadow-inner"></div>
                  <div className="absolute top-1 right-2 w-3 h-3 bg-pink-300 rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* THE INSIDE VOID (Hidden under Right Box) */}
        <div className="absolute right-0 w-32 h-80 bg-orange-900 rounded-r-3xl z-0 shadow-inner overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/41 to-transparent"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-20 h-13 bg-orange-400">
          </div>
        </div>

        {/* RIGHT BOX: THE CAT SECURITY ROOM */}
        <div
          className={`bg-orange-600 w-32 h-80 rounded-r-3xl relative flex items-center justify-center border-l border-orange-400 z-50 transition-transform duration-500 ease-out
    ${showPaw ? 'translate-x-5' : 'translate-x-0'}`}
        >
          {/* The Text Container */}
          <div className="rotate-90 whitespace-nowrap text-white text-[10px] font-black uppercase opacity-50 tracking-[0.2em] pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-medium">{data.sender}</p>
              <p>CAT SECURITY</p>
            </div>
          </div>

          {/* The Handle */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-700 rounded-full opacity-40"></div>
        </div>
      </div>
    </div >
  );
};
