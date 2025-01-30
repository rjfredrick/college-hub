import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"

const testApplications = [
  {
    collegeName: "Stanford University",
    deadline: new Date("2024-12-01").toISOString(),
    status: "draft",
    userId: "", // Will be set when running
    createdAt: new Date(),
  },
  {
    collegeName: "MIT",
    deadline: new Date("2024-11-01").toISOString(),
    status: "submitted",
    userId: "",
    createdAt: new Date(),
  },
  {
    collegeName: "Harvard University",
    deadline: new Date("2024-01-01").toISOString(),
    status: "accepted",
    userId: "",
    createdAt: new Date(),
  }
]

const testTasks = [
  {
    title: "Write Common App Essay",
    completed: false,
    userId: "",
    createdAt: new Date(),
  },
  {
    title: "Request Transcript",
    completed: true,
    userId: "",
    createdAt: new Date(),
  },
  {
    title: "Get Teacher Recommendations",
    completed: false,
    userId: "",
    createdAt: new Date(),
  }
]

export const seedData = async (userId: string) => {
  try {
    // Add applications
    for (const app of testApplications) {
      await addDoc(collection(db, "applications"), {
        ...app,
        userId,
      })
    }

    // Add tasks
    for (const task of testTasks) {
      await addDoc(collection(db, "tasks"), {
        ...task,
        userId,
      })
    }

    console.log("Test data seeded successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
} 