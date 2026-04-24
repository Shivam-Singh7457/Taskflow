import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import WeightBadge from './WeightBadge';

export default function TaskCard({ task, onUpdate, onDelete, onEdit }) {
  const isCompleted = task.status === 'completed';

  const priorityColors = {
    low: 'bg-cream-400',
    medium: 'bg-peach-400',
    high: 'bg-peach-600'
  };

  const cardStyles = {
    low: 'bg-cream-50 border-cream-200',
    medium: 'bg-peach-50 border-peach-200',
    high: 'bg-peach-100 border-peach-400'
  };

  return (
    <div className={`${cardStyles[task.priority]} border rounded-xl p-4 flex flex-col hover:shadow-md transition-all cursor-default ${isCompleted ? 'opacity-60 grayscale-[0.5]' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <button onClick={() => onDelete(task.id)} className="text-cream-400 hover:text-peach-600 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
        <span className={`${priorityColors[task.priority]} text-peach-50 text-[10px] uppercase font-bold px-2 py-1 rounded-full`}>
          {task.priority}
        </span>
      </div>

      <div className="flex-1 cursor-pointer" onClick={() => onEdit(task)}>
        <h3 className={`text-lg font-bold text-ink mb-1 leading-tight ${isCompleted ? 'line-through text-ink-mid' : ''}`}>
          {task.title}
        </h3>
        <p className="text-[13px] text-ink-mid line-clamp-2 mb-4">
          {task.description || 'No description'}
        </p>
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-mid/60 bg-cream-200/50 w-fit px-2 py-0.5 rounded-md mb-4">
          <span className="opacity-70">🕒</span>
          {new Date(task.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="flex justify-between items-end mt-auto pt-2 border-t border-cream-200/[0.3]">
        <WeightBadge description={task.description} priority={task.priority} />
        
        <button 
          onClick={() => onUpdate(task.id, { status: isCompleted ? 'pending' : 'completed' })}
          className={`flex items-center justify-center rounded-full transition-colors ${isCompleted ? 'text-peach-400' : 'text-cream-400 hover:text-peach-400'}`}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
