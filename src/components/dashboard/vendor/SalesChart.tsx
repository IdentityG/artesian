'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const SalesChart = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')

  // Mock data
  const data = [
    { name: 'Mon', sales: 4200, orders: 12 },
    { name: 'Tue', sales: 3800, orders: 10 },
    { name: 'Wed', sales: 5100, orders: 15 },
    { name: 'Thu', sales: 4600, orders: 13 },
    { name: 'Fri', sales: 6200, orders: 18 },
    { name: 'Sat', sales: 7800, orders: 22 },
    { name: 'Sun', sales: 5400, orders: 16 },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
        <div className="flex items-center gap-2">
          {/* Period Selector */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            {['week', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                chartType === 'line'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                chartType === 'bar'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#f07617"
              strokeWidth={2}
              dot={{ fill: '#f07617' }}
              name="Sales (ETB)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e' }}
              name="Orders"
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#f07617" name="Sales (ETB)" />
            <Bar dataKey="orders" fill="#22c55e" name="Orders" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default SalesChart