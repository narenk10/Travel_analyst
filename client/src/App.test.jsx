import { fireEvent, render, screen } from '@testing-library/react'
import App from './App.jsx'

jest.mock('./components/RevenueChart.jsx', () => function RevenueChartMock() {
  return <div data-testid="revenue-chart" />
})

function renderLogin() {
  return render(<App />)
}

function enterCredentials(name, password = 'demo-password') {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: name } })
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } })
  fireEvent.click(screen.getByRole('button', { name: /continue/i }))
}

describe('Travel Analyst login', () => {
  it('renders required name and password fields', () => {
    renderLogin()

    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Password')).toBeRequired()
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('Name').form).not.toBeValid()
  })

  it('does not submit when the name is missing', () => {
    renderLogin()
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'demo-password' } })

    expect(screen.getByLabelText('Name').form).not.toBeValid()
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('does not submit when the password is missing', () => {
    renderLogin()
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Asha' } })

    expect(screen.getByLabelText('Name').form).not.toBeValid()
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('rejects names containing only whitespace', () => {
    renderLogin()
    enterCredentials('   ')

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your name.')
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('trims the name and shows it in the dashboard after sign-in', () => {
    renderLogin()
    enterCredentials('  Asha Rao  ')

    expect(screen.getByRole('heading', { name: /Good morning, Asha Rao/ })).toBeInTheDocument()
    expect(screen.getByLabelText('Asha Rao')).toHaveTextContent('A')
  })

  it('does not retain or display the password on the dashboard', () => {
    renderLogin()
    enterCredentials('Asha Rao', 'private-demo-value')

    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument()
    expect(screen.queryByText('private-demo-value')).not.toBeInTheDocument()
  })

  it('signs out and resets the login form', () => {
    renderLogin()
    enterCredentials('Asha Rao')
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }))

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Password')).toHaveValue('')
  })
})
