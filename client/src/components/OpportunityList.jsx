function OpportunityList({ items, planned, onTogglePlanned }) {
  return (
    <div className="opportunity-list">
      {items.map((item) => {
        const isPlanned = planned.includes(item.id)
        return (
          <article className="opportunity-item" key={item.id}>
            <span className={`opportunity-icon ${item.color}`} aria-hidden="true">✦</span>
            <div className="opportunity-copy">
              <span className="opportunity-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="opportunity-meta">
                <span>{item.packageName}</span>
                <strong>{item.impact}</strong>
              </div>
            </div>
            <button
              className={`plan-button ${isPlanned ? 'planned' : ''}`}
              type="button"
              onClick={() => onTogglePlanned(item.id)}
              aria-pressed={isPlanned}
            >
              {isPlanned ? 'Added ✓' : 'Add plan'}
            </button>
          </article>
        )
      })}
    </div>
  )
}

export default OpportunityList
