import { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function CompletionModal({ isOpen, onClose, onConfirm, taskTitle }) {
  const [checks, setChecks] = useState({
    quality: false,
    results: false,
    clean: false
  });

  useEffect(() => {
    if (isOpen) {
      setChecks({ quality: false, results: false, clean: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allChecked = checks.quality && checks.results && checks.clean;

  const handleToggle = (key) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistItems = [
    { key: 'quality', label: 'I have double-checked the quality of my work' },
    { key: 'results', label: 'All expected outcomes have been achieved' },
    { key: 'clean', label: 'I have cleaned up any temporary files or notes' }
  ];

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-2xl p-6 w-full max-w-[440px] shadow-2xl relative border border-cream-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-cream-400 hover:text-peach-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-peach-100 rounded-full flex items-center justify-center mb-4 text-peach-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-ink">Ready to finish?</h2>
          <p className="text-ink-mid text-sm mt-1 px-4">
            You're about to mark <span className="font-semibold text-peach-600">"{taskTitle}"</span> as completed. Please confirm these points first:
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {checklistItems.map(item => (
            <label 
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${checks[item.key] ? 'bg-peach-100 border-peach-200' : 'bg-cream-100 border-cream-200 hover:border-peach-200'}`}
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-5 h-5 border-2 border-cream-400 rounded-md checked:bg-peach-400 checked:border-peach-400 transition-all cursor-pointer"
                  checked={checks[item.key]}
                  onChange={() => handleToggle(item.key)}
                />
                <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
              </div>
              <span className={`text-sm font-medium ${checks[item.key] ? 'text-ink' : 'text-ink-mid'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-cream-200 text-ink font-medium rounded-xl hover:bg-cream-300 transition-colors"
          >
            Not yet
          </button>
          <button 
            disabled={!allChecked}
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 font-medium rounded-xl transition-all ${allChecked ? 'bg-peach-400 text-peach-50 hover:bg-peach-600' : 'bg-cream-300 text-cream-500 cursor-not-allowed'}`}
          >
            Yes, I'm done
          </button>
        </div>
      </div>
    </div>
  );
}
