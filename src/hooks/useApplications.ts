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
    userId: string,
    collegeName: string,
    type: ApplicationType
  ) => {
    if (!currentUser) throw new Error("No user logged in")

    try {
      console.log("Creating application:", { userId, collegeName, type })

      const newApplication = {
        collegeName,
        type,
        userId,
        status: "not-started" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date()
      }

      const applicationData = {
        ...newApplication,
        status: "not-started" as Application["status"]
      }

      const docRef = await addDoc(collection(db, "applications"), applicationData)
      console.log("Document added with ID:", docRef.id)

      await fetchApplications()

      return {
        id: docRef.id,
        ...applicationData
      }
    } catch (error) {
      console.error("Error in addApplication:", error)
      throw error
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