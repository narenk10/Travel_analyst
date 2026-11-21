import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import App from './App.jsx'

jest.mock('./components/RevenueChart.jsx', () => function RevenueChartMock() {
  return <div data-testid="revenue-chart" />
})

afterEach(() => {
  jest.restoreAllMocks()
})

function renderDashboard() {
  return render(<App />)
}

describe('Travel Analyst dashboard', () => {
  it('renders portfolio metrics and all package rows', () => {
    renderDashboard()

    expect(screen.getByText('Portfolio revenue')).toBeInTheDocument()
    expect(screen.getByText('₹2.30 Cr')).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /Himalayan Trek/ })).toBeInTheDocument()
    expect(screen.getByText(/Showing 5 of 5 packages/)).toBeInTheDocument()
  })

  it('filters packages by a case-insensitive name search', () => {
    renderDashboard()
    fireEvent.change(screen.getByRole('textbox', { name: 'Search packages' }), {
      target: { value: 'coastal' },
    })

    expect(screen.getByRole('row', { name: /Coastal Calm/ })).toBeInTheDocument()
    expect(screen.queryByRole('row', { name: /Himalayan Trek/ })).not.toBeInTheDocument()
    expect(screen.getByText(/Showing 1 of 5 packages/)).toBeInTheDocument()
  })

  it('filters packages by region', () => {
    renderDashboard()
    fireEvent.change(screen.getByLabelText('Filter by region'), {
      target: { value: 'Kerala' },
    })

    expect(screen.getByRole('row', { name: /Backwater Escape/ })).toBeInTheDocument()
    expect(screen.queryByRole('row', { name: /Himalayan Trek/ })).not.toBeInTheDocument()
    expect(screen.getByText(/Showing 1 of 5 packages/)).toBeInTheDocument()
  })

  it('opens and closes the selected package details', () => {
    renderDashboard()
    fireEvent.click(screen.getAllByRole('button', { name: 'Details' })[0])

    expect(screen.getByRole('dialog')).toHaveTextContent('Himalayan Trek')

    fireEvent.click(screen.getByRole('button', { name: 'Close details' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('saves edited package fields and announces the update', () => {
    renderDashboard()
    fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0])
    fireEvent.change(screen.getByLabelText('Package name'), {
      target: { value: 'Himalayan Summer Trek' },
    })
    fireEvent.change(screen.getByLabelText('Value score'), {
      target: { value: '96' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(screen.getByRole('row', { name: /Himalayan Summer Trek/ })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Himalayan Summer Trek was updated.')
  })

  it('deletes a package when deletion is confirmed', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    renderDashboard()

    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])

    expect(window.confirm).toHaveBeenCalledWith('Delete "Himalayan Trek" from the package list?')
    expect(screen.queryByRole('row', { name: /Himalayan Trek/ })).not.toBeInTheDocument()
    expect(screen.getByText(/Showing 4 of 4 packages/)).toBeInTheDocument()
  })

  it('keeps a package when deletion is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false)
    renderDashboard()

    fireEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0])

    expect(screen.getByRole('row', { name: /Himalayan Trek/ })).toBeInTheDocument()
    expect(screen.getByText(/Showing 5 of 5 packages/)).toBeInTheDocument()
  })

  it('toggles a growth opportunity between planned and unplanned', () => {
    renderDashboard()
    const addPlanButton = screen.getAllByRole('button', { name: 'Add plan' })[0]

    fireEvent.click(addPlanButton)
    expect(screen.getByRole('button', { name: 'Added ✓' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Added ✓' }))
    expect(screen.getAllByRole('button', { name: 'Add plan' })[0]).toHaveAttribute('aria-pressed', 'false')
  })
})
