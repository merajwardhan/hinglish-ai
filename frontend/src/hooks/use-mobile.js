// hooks/use-mobile.js
import * as React from "react"

/**
 * A hook to determine if the user is on a mobile device (<= 768px).
 * @returns {boolean} True if the screen width is <= 768px, false otherwise.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Check on mount (client-side only)
    const mediaQuery = window.matchMedia("(max-width: 768px)") // md breakpoint
    
    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    // Set initial state
    handleResize()

    // Add event listener for window resize
    mediaQuery.addEventListener("change", handleResize)

    // Clean up event listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleResize)
    }
  }, [])

  return isMobile
}
