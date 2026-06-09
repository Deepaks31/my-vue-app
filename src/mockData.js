// Generates mock order data

const statuses = [
  { text: 'Pending', color: 'warning' },
  { text: 'Completed', color: 'success' },
  { text: 'Refunded', color: 'error' }
]

const names = [
  { name: 'Esther Kiehn', img: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { name: 'Denise Kuhn', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Clint Hoppe', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Darin Deckow', img: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { name: 'Jacquelyn Robel', img: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'Erin Bins', img: 'https://randomuser.me/api/portraits/women/66.jpg' },
  { name: 'Gretchen Quitz', img: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { name: 'Stewart Kulas', img: 'https://randomuser.me/api/portraits/men/88.jpg' },
]

export const generateOrders = (count) => {
  const orders = []
  for (let i = 0; i < count; i++) {
    const id = 1000 + i
    const statusObj = statuses[Math.floor(Math.random() * statuses.length)]
    const user = names[Math.floor(Math.random() * names.length)]
    
    orders.push({
      id: `#ORD${id}`,
      customer: user.name,
      avatar: user.img,
      date: `1${Math.floor(Math.random() * 8 + 1)} Dec 2024`,
      status: statusObj.text,
      statusColor: statusObj.color,
      amount: `$${(Math.random() * 500 + 10).toFixed(2)}`,
      payment: Math.random() > 0.3 ? 'Paid' : 'Unpaid',
      items: [
        { product: 'Premium Subscription', qty: 1, price: '$99.00' },
        { product: 'Consulting Hour', qty: 2, price: '$150.00' }
      ]
    })
  }
  // Reverse so newest is first
  return orders.reverse()
}

export const allOrders = generateOrders(240)
