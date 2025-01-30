import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import {
  getUserApplications,
  updateApplication,
  addDoc,
  collection,
} from "../services/database"
import type { Application, ApplicationType } from "../types"
import { db } from "../config/firebase"

export const useApplications = () => {
  const { currentUser } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadApplications = async () => {
      if (!currentUser) return
      try {
        const userApps = await getUserApplications(currentUser.uid)
        setApplications(userApps)
      } catch (err) {
        setError("Failed to load applications")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [currentUser])

  const addApplication = async (
    collegeName: string,
    type: ApplicationType
  ) => {
    if (!currentUser) throw new Error("No user logged in")

    const newApplication = {
      collegeName,
      type,
      userId: currentUser.uid,
      status: "pending",
      createdAt: new Date(),
    }

    const docRef = await addDoc(collection(db, "applications"), newApplication)
    await fetchApplications() // Refresh the applications list

    return {
      id: docRef.id,
      ...newApplication
    }
  }

  const updateApp = async (appId: string, updates: Partial<Application>) => {
    try {
      await updateApplication(appId, updates)
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, ...updates } : app))
      )
    } catch (err) {
      setError("Failed to update application")
      console.error(err)
      throw err
    }
  }

  const fetchApplications = async () => {
    if (!currentUser) return
    try {
      const userApps = await getUserApplications(currentUser.uid)
      setApplications(userApps)
    } catch (err) {
      setError("Failed to load applications")
      console.error(err)
    }
  }

  return {
    applications,
    loading,
    error,
    addApplication,
    updateApp,
    fetchApplications
  }
} 