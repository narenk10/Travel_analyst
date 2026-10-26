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

  const filteredPackages = useMemo(
    () =>
      packages.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
        const matchesRegion = region === 'All regions' || item.region === region
        return matchesSearch && matchesRegion
      }),
    [region, search],
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
            search={search}
            region={region}
            onSearch={setSearch}
            onRegionChange={setRegion}
            onSelect={setSelectedPackage}
          />
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
    </div>
  )
}

export default App
