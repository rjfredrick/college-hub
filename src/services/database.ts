import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  Timestamp,
  orderBy,
  addDoc,
} from "firebase/firestore"
import { db } from "../config/firebase"
import type {
  College,
  Application,
  Task,
  UserProfile,
  ApplicationType
} from "../types"

// User Profile Operations
export const createUserProfile = async (
  userId: string,
  profile: Omit<UserProfile, "id">
) => {
  const userRef = doc(db, "users", userId)
  await setDoc(userRef, {
    ...profile,
    id: userId,
    createdAt: Timestamp.now(),
  })
}

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)
  return userSnap.exists() ? userSnap.data() as UserProfile : null
}

// Application Operations
export const createApplication = async (
  userId: string,
  collegeName: string,
  type: ApplicationType = 'regular_decision'
): Promise<Application> => {
  // Set default deadline 6 months from now
  const deadline = new Date()
  deadline.setMonth(deadline.getMonth() + 6)

  const newApp: Omit<Application, 'id'> = {
    userId,
    collegeName,
    deadline: deadline,
    status: 'not-started',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const docRef = await addDoc(collection(db, 'applications'), newApp)
  return { ...newApp, id: docRef.id }
}

export const getUserApplications = async (userId: string) => {
  const q = query(
    collection(db, "applications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Application))
}

export const updateApplication = async (
  applicationId: string,
  updates: Partial<Application>
) => {
  const appRef = doc(db, "applications", applicationId)
  await updateDoc(appRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

// Task Operations
export const createTask = async (task: Omit<Task, "id">) => {
  const tasksRef = collection(db, "tasks")
  const newTaskRef = doc(tasksRef)
  await setDoc(newTaskRef, {
    ...task,
    id: newTaskRef.id,
    createdAt: Timestamp.now(),
  })
  return newTaskRef.id
}

export const getApplicationTasks = async (applicationId: string) => {
  const q = query(
    collection(db, "tasks"),
    where("applicationId", "==", applicationId),
    orderBy("dueDate", "asc")
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.data() as Task)
}

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(db, "tasks", taskId)
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

// College Operations
export const getColleges = async () => {
  const querySnapshot = await getDocs(collection(db, "colleges"))
  return querySnapshot.docs.map((doc) => doc.data() as College)
}

export const getCollege = async (collegeId: string) => {
  const collegeRef = doc(db, "colleges", collegeId)
  const collegeSnap = await getDoc(collegeRef)
  return collegeSnap.exists() ? collegeSnap.data() as College : null
}

export const searchColleges = async (searchQuery: string) => {
  const q = searchQuery.toLowerCase().trim()
  const collegesRef = collection(db, "colleges")
  const querySnapshot = await getDocs(
    query(collegesRef, orderBy("state"), orderBy("name"))
  )

  return querySnapshot.docs
    .map((doc) => doc.data() as College)
    .filter(
      (college) =>
        college.name.toLowerCase().includes(q) ||
        college.state.toLowerCase().includes(q)
    )
}

export { addDoc, collection } 