import { useMemo, useState } from 'react'
import MetricCard from './components/MetricCard.jsx'
import Navigation from './components/Navigation.jsx'
import OpportunityList from './components/OpportunityList.jsx'
import PackageTable from './components/PackageTable.jsx'
import RevenueChart from './components/RevenueChart.jsx'
import { metrics, opportunities, packages, revenue } from './data.js'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All regions')
  const [plannedOpportunities, setPlannedOpportunities] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [packageItems, setPackageItems] = useState(packages)
  const [editingPackage, setEditingPackage] = useState(null)
  const [editDraft, setEditDraft] = useState(null)
  const [notice, setNotice] = useState('')

  const filteredPackages = useMemo(
    () =>
      packageItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
        const matchesRegion = region === 'All regions' || item.region === region
        return matchesSearch && matchesRegion
      }),
    [packageItems, region, search],
  )

  const navigateTo = (page) => {
    setActivePage(page)
    document.getElementById(page.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const togglePlanned = (id) => {
    setPlannedOpportunities((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const startEditingPackage = (item) => {
    setEditingPackage(item)
    setEditDraft({ ...item })
    setNotice('')
  }

  const updateEditDraft = (event) => {
    const { name, value } = event.target
    setEditDraft((current) => ({ ...current, [name]: value }))
  }

  const savePackage = (event) => {
    event.preventDefault()
    const updatedPackage = { ...editDraft, score: Number(editDraft.score) }
    setPackageItems((current) =>
      current.map((item) => item.id === editingPackage.id ? updatedPackage : item),
    )
    setSelectedPackage((current) => current?.id === updatedPackage.id ? updatedPackage : current)
    setNotice(`${updatedPackage.name} was updated.`)
    setEditingPackage(null)
    setEditDraft(null)
  }

  const deletePackage = (item) => {
    if (!window.confirm(`Delete "${item.name}" from the package list?`)) {
      return
    }

    setPackageItems((current) => current.filter((packageItem) => packageItem.id !== item.id))
    setSelectedPackage((current) => current?.id === item.id ? null : current)
    setNotice(`${item.name} was deleted.`)
  }

  return (
    <div className="app-shell">
      <Navigation activePage={activePage} onNavigate={navigateTo} />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Travel analytics</div>
          <div className="user-profile">
            <span className="status-dot" aria-hidden="true" />
            <span>All systems operational</span>
            <span className="avatar" aria-label="Naren">N</span>
          </div>
        </header>

        <section className="page-content" id="overview">
          <div className="page-heading">
            <div>
              <p className="eyebrow">MONDAY, 26 OCTOBER 2026</p>
              <h1>Good morning, Naren <span aria-hidden="true">✦</span></h1>
              <p className="subtitle">Here&apos;s how your travel portfolio is performing this month.</p>
            </div>
            <button className="button button-primary" onClick={() => navigateTo('Opportunities')} type="button">
              View recommendations <span aria-hidden="true">→</span>
            </button>
          </div>

          <section className="metric-grid" aria-label="Portfolio summary">
            {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
          </section>

          <div className="analytics-grid">
            <RevenueChart data={revenue} />
            <section className="panel opportunity-panel" id="opportunities" aria-labelledby="opportunity-heading">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">YOUR NEXT BEST MOVE</p>
                  <h2 id="opportunity-heading">Growth opportunities</h2>
                </div>
                <span className="count-badge">{opportunities.length}</span>
              </div>
              <OpportunityList
                items={opportunities}
                planned={plannedOpportunities}
                onTogglePlanned={togglePlanned}
              />
            </section>
          </div>

          <PackageTable
            items={filteredPackages}
            totalCount={packageItems.length}
            search={search}
            region={region}
            onSearch={setSearch}
            onRegionChange={setRegion}
            onSelect={setSelectedPackage}
            onEdit={startEditingPackage}
            onDelete={deletePackage}
          />
          <p className="visually-hidden" role="status" aria-live="polite">{notice}</p>
          <footer className="footer-note">Travel Analyst <span>·</span> Insights for better journeys</footer>
        </section>
      </main>

      {selectedPackage && (
        <div className="modal-backdrop" onClick={() => setSelectedPackage(null)} role="presentation">
          <section
            className="package-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={() => setSelectedPackage(null)} aria-label="Close details">×</button>
            <p className="eyebrow">{selectedPackage.region} · PACKAGE DETAILS</p>
            <h2 id="package-modal-title">{selectedPackage.name}</h2>
            <p className="subtitle">A quick look at the current package signals.</p>
            <div className="detail-grid">
              <div><span>Bookings</span><strong>{selectedPackage.bookings}</strong></div>
              <div><span>Revenue</span><strong>{selectedPackage.revenue}</strong></div>
              <div><span>Satisfaction</span><strong>{selectedPackage.satisfaction} / 5</strong></div>
              <div><span>Value score</span><strong>{selectedPackage.score} / 100</strong></div>
            </div>
          </section>
        </div>
      )}

      {editingPackage && editDraft && (
        <div className="modal-backdrop" onClick={() => setEditingPackage(null)} role="presentation">
          <section
            className="package-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-package-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setEditingPackage(null)}
              aria-label="Close edit form"
            >×</button>
            <p className="eyebrow">PACKAGE MANAGEMENT</p>
            <h2 id="edit-package-title">Edit package</h2>
            <form className="package-edit-form" onSubmit={savePackage}>
              <label>
                Package name
                <input name="name" value={editDraft.name} onChange={updateEditDraft} required maxLength="120" />
              </label>
              <label>
                Region
                <input name="region" value={editDraft.region} onChange={updateEditDraft} required maxLength="80" />
              </label>
              <label>
                Bookings
                <input name="bookings" type="number" min="0" step="1" value={editDraft.bookings} onChange={updateEditDraft} required />
              </label>
              <label>
                Revenue
                <input name="revenue" value={editDraft.revenue} onChange={updateEditDraft} required maxLength="30" />
              </label>
              <label>
                Satisfaction
                <input name="satisfaction" type="number" min="0" max="5" step="0.1" value={editDraft.satisfaction} onChange={updateEditDraft} required />
              </label>
              <label>
                Value score
                <input name="score" type="number" min="0" max="100" step="1" value={editDraft.score} onChange={updateEditDraft} required />
              </label>
              <div className="edit-form-actions">
                <button className="edit-cancel-button" type="button" onClick={() => setEditingPackage(null)}>Cancel</button>
                <button className="edit-save-button" type="submit">Save changes</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
