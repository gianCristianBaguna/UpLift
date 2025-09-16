export interface SessionData {
  isAuthenticated: boolean
  timestamp: number
  ttl: number
}

export const checkSession = (): boolean => {
  if (typeof window === "undefined") return false
  
  const sessionStr = localStorage.getItem("adminSession")
  if (!sessionStr) return false

  try {
    const session: SessionData = JSON.parse(sessionStr)
    const now = Date.now()
    
    // Check if session has expired
    if (now - session.timestamp > session.ttl) {
      localStorage.removeItem("adminSession")
      return false
    }
    
    return session.isAuthenticated
  } catch {
    localStorage.removeItem("adminSession")
    return false
  }
}

export const clearSession = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminSession")
  }
}

export const refreshSession = (): void => {
  if (typeof window === "undefined") return
  
  const sessionStr = localStorage.getItem("adminSession")
  if (!sessionStr) return

  try {
    const session: SessionData = JSON.parse(sessionStr)
    if (checkSession()) {
      // Refresh timestamp
      session.timestamp = Date.now()
      localStorage.setItem("adminSession", JSON.stringify(session))
    }
  } catch {
    localStorage.removeItem("adminSession")
  }
}
