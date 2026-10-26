export const metrics = [
  { label: 'Portfolio revenue', value: '₹2.30 Cr', change: '+12.8%', icon: '₹', tone: 'green' },
  { label: 'Total bookings', value: '2,310', change: '+8.4%', icon: '↗', tone: 'blue' },
  { label: 'Avg. satisfaction', value: '4.63', suffix: '/ 5', change: '+0.2', icon: '♡', tone: 'gold' },
  { label: 'Avg. conversion', value: '17.4%', change: '+1.6%', icon: '◎', tone: 'violet' },
]

export const revenue = [
  { month: 'May', value: 32 },
  { month: 'Jun', value: 43 },
  { month: 'Jul', value: 39 },
  { month: 'Aug', value: 58 },
  { month: 'Sep', value: 51 },
  { month: 'Oct', value: 74 },
  { month: 'Nov', value: 66 },
  { month: 'Dec', value: 92 },
]

export const packages = [
  { name: 'Himalayan Trek', region: 'Himachal Pradesh', bookings: '428', revenue: '₹38.4L', satisfaction: '4.8', score: 92, trend: '+18%' },
  { name: 'Backwater Escape', region: 'Kerala', bookings: '362', revenue: '₹31.2L', satisfaction: '4.7', score: 88, trend: '+12%' },
  { name: 'Desert Heritage Trail', region: 'Rajasthan', bookings: '289', revenue: '₹27.8L', satisfaction: '4.6', score: 84, trend: '+9%' },
  { name: 'Coastal Calm', region: 'Goa', bookings: '514', revenue: '₹42.1L', satisfaction: '4.5', score: 81, trend: '+6%' },
  { name: 'Valley of Flowers', region: 'Jammu & Kashmir', bookings: '173', revenue: '₹19.6L', satisfaction: '4.9', score: 79, trend: '+14%' },
]

export const opportunities = [
  {
    id: 'himalayan-conversion',
    category: 'CONVERSION',
    title: 'Help more travelers choose Himalayan Trek',
    description: 'Strong reviews and high interest suggest the booking journey may be the next place to improve.',
    packageName: 'Himalayan Trek',
    impact: '+₹4.2L',
    color: 'sage',
  },
  {
    id: 'coastal-reviews',
    category: 'SATISFACTION',
    title: 'Turn Coastal Calm feedback into a quick win',
    description: 'Review recent guest feedback to find small service improvements before peak season.',
    packageName: 'Coastal Calm',
    impact: '+0.3 pts',
    color: 'peach',
  },
]
