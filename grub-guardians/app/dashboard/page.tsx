"use client"

import { useState, useEffect } from "react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DailyFoodAnalysisChart } from "@/components/dashboard/daily-food-analysis-chart"
import { EfficiencyTrendChart } from "@/components/dashboard/efficiency-trend-chart"
import { WasteDistributionChart } from "@/components/dashboard/waste-distribution-chart"
import { DashboardLayout } from "@/components/dashboard/layout"
import { mockSummaryData, mockFeedback, getTodayClaimedFoodCount } from "@/lib/mock-data"
import { ArrowUpRight, Users, Trash2, IndianRupee, UtensilsCrossed } from "lucide-react"
import { LogLeftoversForm } from "@/components/log-leftovers-form"
import { PushNotificationForm } from "@/components/push-notification-form"
import { FeedbackList } from "@/components/feedback-list"
// Removed import for Locator

export default function StaffDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "log-leftovers" | "push-notifications" | "view-feedback" | "settings"
  >("dashboard") // Removed "hostel-locator"
  const [claimedFoodToday, setClaimedFoodToday] = useState(0)

  useEffect(() => {
    const updateClaimedCount = () => {
      setClaimedFoodToday(getTodayClaimedFoodCount())
    }
    updateClaimedCount()
    const interval = setInterval(updateClaimedCount, 10000)
    return () => clearInterval(interval)
  }, [activeTab])

  return (
    <DashboardLayout setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Food Waste Analytics</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              title="Efficiency"
              value={`${mockSummaryData.efficiency.value}${mockSummaryData.efficiency.unit}`}
              description={`${mockSummaryData.efficiency.change > 0 ? "+" : ""}${mockSummaryData.efficiency.change}${mockSummaryData.efficiency.unit} ${mockSummaryData.efficiency.description}`}
              icon={ArrowUpRight}
              iconColorClass="text-grubGreen-500"
            />
            <KpiCard
              title="Saved Portions"
              value={mockSummaryData.savedPortions.value.toLocaleString()}
              description={mockSummaryData.savedPortions.description}
              icon={Users}
              iconColorClass="text-teal-400"
            />
            <KpiCard
              title="Waste Reduced"
              value={`${mockSummaryData.wasteReduced.value}${mockSummaryData.wasteReduced.unit}`}
              description={mockSummaryData.wasteReduced.description}
              icon={Trash2}
              iconColorClass="text-red-400"
            />
            <KpiCard
              title="Cost Savings"
              value={`${mockSummaryData.costSavings.unit}${mockSummaryData.costSavings.value.toLocaleString()}`}
              description={mockSummaryData.costSavings.description}
              icon={IndianRupee}
              iconColorClass="text-amber-400"
            />
            <KpiCard
              title="Food Claimed Today"
              value={claimedFoodToday}
              description="Portions claimed by students today"
              icon={UtensilsCrossed}
              iconColorClass="text-amber-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="lg:col-span-2">
              <DailyFoodAnalysisChart />
            </div>
            <EfficiencyTrendChart />
            <div className="xl:col-span-3">
              <WasteDistributionChart />
            </div>
          </div>
        </div>
      )}

      {activeTab === "log-leftovers" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Log Leftovers</h2>
          <LogLeftoversForm />
        </div>
      )}

      {activeTab === "push-notifications" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Push Notification Form</h2>
          <PushNotificationForm />
        </div>
      )}

      {activeTab === "view-feedback" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">View Feedback</h2>
          <FeedbackList feedback={mockFeedback} />
        </div>
      )}

      {/* Removed Hostel Locator tab content */}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Settings content will go here.</p>
        </div>
      )}
    </DashboardLayout>
  )
}
