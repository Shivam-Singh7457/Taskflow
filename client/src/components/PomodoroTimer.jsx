import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const totalTime = 1500;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  
  // Circle geometry for SVG
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center mt-12 bg-cream-50 p-8 rounded-2xl border border-cream-200 shadow-sm">
      <div className="relative w-72 h-72 flex items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
          <circle
            cx="130" cy="130" r={radius}
            stroke="#FFE8DC" strokeWidth="12" fill="none"
          />
          <circle
            cx="130" cy="130" r={radius}
            stroke="#F4956A" strokeWidth="12" fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-[2.5rem] font-bold text-ink tracking-tight font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-peach-400 hover:bg-peach-600 text-peach-50 rounded-xl font-medium transition-colors w-32"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-cream-200 text-ink-mid hover:text-ink hover:border-peach-200 rounded-xl font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
