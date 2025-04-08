import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Ticket, TrendingUp, AlertCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TicketList } from "@/components/ticket-list"
import { SentimentChart } from "@/components/sentiment-chart"
import { RecentChats } from "@/components/recent-chats"
import { TicketStats } from "@/components/ticket-stats"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor and manage your customer support operations." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">-4% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chat Sessions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Customer sentiment trends over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SentimentChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Latest support tickets requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketList />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Chat Sessions</CardTitle>
                <CardDescription>Latest customer interactions with the AI chatbot</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentChats />
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ticket Statistics</CardTitle>
                <CardDescription>Breakdown of tickets by category and status</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TicketStats />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          {/* Ticket management content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>Manage and respond to all customer support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ticket management interface would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Support Analytics</CardTitle>
              <CardDescription>Detailed analytics and insights about your customer support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Detailed analytics dashboard would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-4">
          {/* Chatbot configuration content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Configuration</CardTitle>
              <CardDescription>Configure and train your AI chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Chatbot configuration interface would be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

