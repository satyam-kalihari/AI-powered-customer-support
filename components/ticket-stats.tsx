"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function TicketStats() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // This would typically fetch data from an API
    // For demo purposes, we're generating sample data
    const categoryData = [
      { name: "Account", value: 42 },
      { name: "Billing", value: 28 },
      { name: "Technical", value: 63 },
      { name: "Feature", value: 17 },
      { name: "Other", value: 11 },
    ]

    setData(categoryData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

