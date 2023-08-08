"use client"
import { BaseLayout } from "@/components/layout"

export default function BackofficeLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  )
}
