import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask, error, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority || 'medium');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, priority });
  };

  return (
    <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-2xl p-6 w-full max-w-[480px] shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-cream-400 hover:text-peach-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-semibold text-ink mb-6">
          {editingTask ? 'Edit Task' : 'New Task'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-peach-100 text-peach-600 rounded-lg text-xs font-medium border border-peach-200 animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Title</label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-3.5 py-2.5 text-ink focus:border-peach-400 focus:outline-none transition-colors"
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-3.5 py-2.5 text-ink focus:border-peach-400 focus:outline-none transition-colors resize-none"
              placeholder="Add details..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-3.5 py-2.5 text-ink focus:border-peach-400 focus:outline-none transition-colors"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-cream-300 text-cream-500 cursor-wait' : 'bg-peach-400 hover:bg-peach-600 text-peach-50'}`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cream-500 border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                editingTask ? 'Save Changes' : 'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
