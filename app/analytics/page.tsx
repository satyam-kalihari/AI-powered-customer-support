"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SentimentChart } from "@/components/sentiment-chart"
import { TicketStats } from "@/components/ticket-stats"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Insights and metrics for your customer support">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Tickets" value="1,284" change="+12%" trend="up" description="vs. previous month" />
            <MetricCard
              title="Avg. Response Time"
              value="2.4 hrs"
              change="-18%"
              trend="down"
              description="vs. previous month"
            />
            <MetricCard
              title="Resolution Rate"
              value="94.2%"
              change="+3.5%"
              trend="up"
              description="vs. previous month"
            />
            <MetricCard
              title="Customer Satisfaction"
              value="4.8/5"
              change="+0.3"
              trend="up"
              description="vs. previous month"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Customer sentiment trends over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SentimentChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Categories</CardTitle>
                <CardDescription>Distribution of tickets by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketStats />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Sentiment Analysis</CardTitle>
              <CardDescription>In-depth analysis of customer sentiment across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed sentiment analysis dashboard would be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Team Performance</CardTitle>
              <CardDescription>Metrics and KPIs for your support team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support team performance dashboard would be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Trends</CardTitle>
              <CardDescription>Long-term trends and patterns in your support data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Support trends dashboard would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}

function MetricCard({ title, value, change, trend, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs">
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

