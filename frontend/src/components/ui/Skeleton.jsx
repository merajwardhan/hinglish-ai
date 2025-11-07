// components/ui/skeleton.jsx
import * as React from "react"
import { cn } from "../../utils/cn.js"

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
