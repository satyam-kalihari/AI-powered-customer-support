"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/logout-button"
import { LayoutDashboard, MessageSquare, Ticket, BarChart3, Settings, Users } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MessageSquare className="h-6 w-6 text-indigo-600" />
          <span>AI Support</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <NavItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" isActive={pathname === "/dashboard"} />
          <NavItem href="/chat" icon={MessageSquare} label="Chat" isActive={pathname === "/chat"} />
          <NavItem href="/tickets" icon={Ticket} label="Tickets" isActive={pathname === "/tickets"} />
          <NavItem href="/analytics" icon={BarChart3} label="Analytics" isActive={pathname === "/analytics"} />
          <NavItem href="/customers" icon={Users} label="Customers" isActive={pathname === "/customers"} />
          <NavItem href="/settings" icon={Settings} label="Settings" isActive={pathname === "/settings"} />
        </nav>
      </div>
      <div className="mt-auto p-4">
        <LogoutButton className="w-full justify-start" />
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
}

function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
        isActive && "bg-muted text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

