import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CheckSquare, Clock, LogOut, X } from 'lucide-react';

export default function Sidebar({ filter, setFilter, stats, isOpen, onClose }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'all', label: 'All Tasks', icon: LayoutDashboard },
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckSquare }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[100] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-[280px] lg:w-[240px] bg-peach-100 border-r border-cream-200 flex flex-col h-screen fixed top-0 left-0 z-[110] transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-peach-600 flex items-center gap-2">
            <CheckSquare className="w-6 h-6" /> Taskflow
          </h1>
          <button onClick={onClose} className="lg:hidden text-ink-mid p-1 hover:bg-peach-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="px-4 space-y-1.5 mt-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setFilter(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-peach-400 text-peach-50 shadow-sm' : 'text-ink-mid hover:bg-peach-200'}`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 px-6 flex-1">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-peach-600/60 mb-4">Productivity</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="text-xs font-semibold text-ink">Completed</span>
                <span className="text-[10px] font-bold text-peach-600">{stats.completed}/{stats.total}</span>
              </div>
              <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-peach-400 transition-all duration-500" 
                  style={{ width: `${(stats.completed / stats.total) * 100 || 0}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cream-50 p-3 rounded-xl border border-cream-200">
                <div className="text-[10px] text-ink-mid mb-1">Pending</div>
                <div className="text-lg font-bold text-ink">{stats.pending}</div>
              </div>
              <div className="bg-cream-50 p-3 rounded-xl border border-cream-200">
                <div className="text-[10px] text-ink-mid mb-1">High Prio</div>
                <div className="text-lg font-bold text-peach-600">{stats.high}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-cream-200">
          <div className="mb-4 px-2 text-xs text-ink-mid truncate">
            {user?.email}
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-ink-mid hover:bg-peach-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
