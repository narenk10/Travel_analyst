const pages = [
  { label: 'Overview', icon: '◫' },
  { label: 'Packages', icon: '⌑' },
  { label: 'Opportunities', icon: '✳' },
]

function Navigation({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={() => onNavigate('Overview')}>
        <span className="brand-mark" aria-hidden="true">T</span>
        <span>travel<span className="brand-light">analyst</span></span>
      </a>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="Main navigation">
        {pages.map((page) => (
          <button
            className={`nav-item ${activePage === page.label ? 'active' : ''}`}
            key={page.label}
            onClick={() => onNavigate(page.label)}
            type="button"
          >
            <span className="nav-icon" aria-hidden="true">{page.icon}</span>
            {page.label}
            {page.label === 'Opportunities' && <span className="nav-count">2</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon" aria-hidden="true">✦</span>
          <strong>Need a hand?</strong>
          <p>Explore tips to get more from your data.</p>
          <a href="#packages" onClick={() => onNavigate('Packages')}>Explore insights <span aria-hidden="true">→</span></a>
        </div>
        <div className="workspace-user">
          <span className="avatar">N</span>
          <span><strong>Naren K</strong><small>Travel team</small></span>
          <span className="user-menu" aria-hidden="true">···</span>
        </div>
      </div>
    </aside>
  )
}

export default Navigation
