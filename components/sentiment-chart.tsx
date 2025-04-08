"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function SentimentChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // This would typically fetch data from an API
    // For demo purposes, we're generating random data
    const generateData = () => {
      const days = 30
      const result = []

      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - (days - i - 1))

        result.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          positive: Math.floor(Math.random() * 30) + 50,
          neutral: Math.floor(Math.random() * 20) + 20,
          negative: Math.floor(Math.random() * 15) + 5,
        })
      }

      return result
    }

    setData(generateData())
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="positive" stroke="#4ade80" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="neutral" stroke="#94a3b8" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="negative" stroke="#f87171" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

