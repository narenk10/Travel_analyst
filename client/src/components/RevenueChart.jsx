const chartWidth = 520
const chartHeight = 164
const chartPadding = { top: 12, right: 12, bottom: 24, left: 12 }

function RevenueChart({ data }) {
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const points = data.map((item, index) => ({
    ...item,
    x: chartPadding.left + (index / (data.length - 1)) * innerWidth,
    y: chartPadding.top + innerHeight - (item.value / 100) * innerHeight,
  }))
  const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const area = `${line} L ${points.at(-1).x} ${chartHeight - chartPadding.bottom} L ${points[0].x} ${chartHeight - chartPadding.bottom} Z`

  return (
    <section className="panel chart-panel" aria-labelledby="revenue-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">PORTFOLIO TREND</p>
          <h2 id="revenue-heading">Revenue over time</h2>
          <p className="panel-subtitle">Monthly revenue across all active packages</p>
        </div>
        <span className="chart-legend"><span /> Revenue</span>
      </div>
      <div className="chart-summary"><strong>₹2.30 Cr</strong><span className="positive-chip">↑ 12.8%</span></div>
      <svg className="revenue-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Revenue trend increases from May to December">
        {[0, 1, 2].map((lineIndex) => {
          const y = chartPadding.top + (innerHeight / 2) * lineIndex
          return <line key={lineIndex} x1={chartPadding.left} x2={chartWidth - chartPadding.right} y1={y} y2={y} className="chart-gridline" />
        })}
        <path d={area} className="chart-area" />
        <path d={line} className="chart-line" />
        {points.map((point) => (
          <g key={point.month}>
            <circle cx={point.x} cy={point.y} r="3.5" className="chart-point" />
            <text x={point.x} y={chartHeight - 3} textAnchor="middle" className="chart-label">{point.month}</text>
          </g>
        ))}
      </svg>
    </section>
  )
}

export default RevenueChart
