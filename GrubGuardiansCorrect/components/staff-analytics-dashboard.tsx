"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUpRight, Users, Trash2, IndianRupee } from "lucide-react"
import { mockSummaryData, mockDailyFoodAnalysis, mockEfficiencyTrend } from "@/lib/mock-data"

export function StaffAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Food Waste Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSummaryData.efficiency.value}
              {mockSummaryData.efficiency.unit}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockSummaryData.efficiency.change > 0
                ? `+${mockSummaryData.efficiency.change}`
                : mockSummaryData.efficiency.change}
              {mockSummaryData.efficiency.unit} {mockSummaryData.efficiency.description}
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Portions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSummaryData.savedPortions.value}</div>
            <p className="text-xs text-muted-foreground">{mockSummaryData.savedPortions.description}</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Reduced</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSummaryData.wasteReduced.value}
              {mockSummaryData.wasteReduced.unit}
            </div>
            <p className="text-xs text-muted-foreground">{mockSummaryData.wasteReduced.description}</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSummaryData.costSavings.unit}
              {mockSummaryData.costSavings.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{mockSummaryData.costSavings.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Food Analysis Chart */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle>Daily Food Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cooked: {
                  label: "Cooked (kg)",
                  color: "hsl(var(--chart-3))", // Orange-like
                },
                wasted: {
                  label: "Wasted (kg)",
                  color: "hsl(var(--chart-2))", // Red-like
                },
                saved: {
                  label: "Saved (kg)",
                  color: "hsl(var(--chart-1))", // Green-like
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyFoodAnalysis} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="cooked" fill="var(--color-cooked)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="wasted" fill="var(--color-wasted)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="saved" fill="var(--color-saved)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Efficiency Trend Chart */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle>Efficiency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                efficiency: {
                  label: "Efficiency (%)",
                  color: "hsl(var(--chart-1))", // Green-like
                },
                waste: {
                  label: "Waste (%)",
                  color: "hsl(var(--chart-2))", // Red-like
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEfficiencyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="waste" stroke="var(--color-waste)" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
