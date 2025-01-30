export * from './types/index'

export interface Task {
  applicationId: string
  id: string
  title: string
  description: string
  dueDate: Date
  completed: boolean
  userId: string
  collegeId: string
  collegeName: string
  category: 'application' | 'tests' | 'financial' | 'decision' | 'academic' | 'administrative'
  dependencies?: string
  createdAt?: Date
  updatedAt?: Date
} 