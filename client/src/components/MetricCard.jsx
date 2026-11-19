function MetricCard({ label, value, suffix, change, icon, tone }) {
  const isNegative = change.trim().startsWith('-')

  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <span className={`metric-icon ${tone}`} aria-hidden="true">{icon}</span>
      </div>
      <div className="metric-value">{value}<span className="metric-suffix">{suffix}</span></div>
      <p className={`metric-change ${isNegative ? 'negative' : ''}`}>
        <span aria-hidden="true">{isNegative ? '↓' : '↑'}</span> {change}{' '}
        <span className="comparison">vs. previous period</span>
      </p>
    </article>
  )
}

export default MetricCard
