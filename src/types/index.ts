export type ApplicationStatus =
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'accepted'
  | 'rejected'
  | 'waitlisted'
  | 'deferred'

export type ApplicationType =
  | 'early_decision'
  | 'early_action'
  | 'regular_decision'
  | 'rolling'

export type TaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'overdue'

export interface College {
  id: string
  name: string
  state: string
  commonAppEnabled: boolean
  coalitionAppEnabled: boolean
  isTestOptional: boolean
  requiresCSSProfile: boolean
  deadlines: {
    earlyDecision?: Date
    earlyAction?: Date
    regularDecision?: Date
    rolling?: boolean
  }
}

export interface Application {
  id: string
  collegeName: string
  deadline: Date
  status: 'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted'
  userId: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  category: 'application' | 'tests' | 'financial' | 'decision' | 'academic' | 'administrative'
  dueDate: Date
  status: TaskStatus
  completed: boolean
  userId: string
  applicationId?: string
  collegeId: string
  collegeName: string
  dependencies: string
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile {
  id: string
  email: string
  name: string
  graduationYear: number
  preferences?: {
    emailNotifications: boolean
    pushNotifications: boolean
    reminderDays: number
  }
}

export interface NewApplication {
  collegeName: string
  deadline: Date
  status: Application['status']
  notes?: string
}