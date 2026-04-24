export function getComplexityScore(description = '', priority = 'medium') {
  const len = description.trim().length;
  const lengthScore = Math.min(Math.ceil(len / 40), 6);
  const priorityBonus = { low: 0, medium: 2, high: 4 }[priority] ?? 2;
  return Math.min(lengthScore + priorityBonus, 10);
}

export default function WeightBadge({ description, priority }) {
  const score = getComplexityScore(description, priority);
  
  let label = 'Medium';
  let bgClass = 'bg-cream-200';
  let textClass = 'text-ink-mid';

  if (score <= 3) {
    label = 'Light';
    bgClass = 'bg-peach-100';
    textClass = 'text-peach-600';
  } else if (score >= 7) {
    label = 'Heavy';
    bgClass = 'bg-peach-400';
    textClass = 'text-ink';
  }

  return (
    <div className={`px-2 py-1 flex items-center rounded-full text-xs font-medium ${bgClass} ${textClass}`}>
      <span className="mr-1">⚖</span> Weight: {score}/10 · {label}
    </div>
  );
}
