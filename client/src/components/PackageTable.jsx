function PackageTable({ items, search, region, onSearch, onRegionChange, onSelect }) {
  return (
    <section className="panel package-panel" id="packages" aria-labelledby="package-heading">
      <div className="table-heading">
        <div>
          <p className="eyebrow">EXPLORE YOUR PORTFOLIO</p>
          <h2 id="package-heading">Package performance</h2>
          <p className="panel-subtitle">Compare your top packages and spot what is working.</p>
        </div>
        <div className="table-controls">
          <label className="search-control">
            <span className="visually-hidden">Search packages</span>
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search packages" />
          </label>
          <label>
            <span className="visually-hidden">Filter by region</span>
            <select value={region} onChange={(event) => onRegionChange(event.target.value)}>
              <option>All regions</option>
              <option>Goa</option>
              <option>Kerala</option>
              <option>Rajasthan</option>
              <option>Jammu &amp; Kashmir</option>
              <option>Himachal Pradesh</option>
            </select>
          </label>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th>PACKAGE</th><th>REGION</th><th>BOOKINGS</th><th>REVENUE</th><th>RATING</th><th>VALUE SCORE</th><th /></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name}>
                <td><span className="package-avatar" aria-hidden="true">{item.name.charAt(0)}</span><strong>{item.name}</strong></td>
                <td>{item.region}</td>
                <td>{item.bookings}</td>
                <td>{item.revenue}</td>
                <td><span className="rating">★</span> {item.satisfaction}</td>
                <td><span className="score-value">{item.score}</span><span className="score-track"><span style={{ width: `${item.score}%` }} /></span></td>
                <td><button className="details-button" type="button" onClick={() => onSelect(item)}>Details <span aria-hidden="true">→</span></button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="empty-state" colSpan="7">No packages match your search. Try another name or region.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="results-note">Showing {items.length} of 5 packages <span>·</span> Monthly data</p>
    </section>
  )
}

export default PackageTable
