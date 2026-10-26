function MetricCard({ label, value, suffix, change, icon, tone }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <span className={`metric-icon ${tone}`} aria-hidden="true">{icon}</span>
      </div>
      <div className="metric-value">{value}<span className="metric-suffix">{suffix}</span></div>
      <p className="metric-change"><span aria-hidden="true">↑</span> {change} <span className="comparison">vs. previous period</span></p>
    </article>
  )
}

export default MetricCard
