"use client"

import { useState, useEffect } from "react"

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result: ApiResponse<T> = await response.json()

      if (result.success && result.data) {
        setData(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch data")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

export async function apiRequest<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    return await response.json()
  } catch (error) {
    return { success: false, error: "Network error" }
  }
}
