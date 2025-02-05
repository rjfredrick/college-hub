import { Task } from '../types'

export const generateDefaultTasks = (
  applicationId: string,
  collegeName: string,
  userId: string
): Omit<Task, 'id' | 'status'>[] => {
  const now = new Date()
  const currentYear = new Date().getFullYear()

  const defaultTasks: Omit<Task, 'id' | 'status'>[] = [
    {
      title: "Research and Create College List",
      description: "Research colleges, evaluate requirements, and create a final list of schools to apply to.",
      category: "application",
      step: 1,
      dueDate: new Date(currentYear, 7, 1), // August 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Standardized Tests",
      description: "Take SAT/ACT exams if required. Send scores to colleges before application deadlines.",
      category: "tests",
      step: 2,
      dueDate: new Date(currentYear, 9, 1), // October 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Check if college is test-optional",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "College Application",
      description: "Submit application via Common App/Coalition App/Direct. Include essays, recommendations, and transcripts.",
      category: "application",
      step: 3,
      dueDate: new Date(currentYear, 10, 1), // November 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Complete research, gather documents, request recommendations",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Financial Aid Applications",
      description: "Complete FAFSA and CSS Profile (if required). Apply for scholarships.",
      category: "financial",
      step: 4,
      dueDate: new Date(currentYear, 9, 15), // October 15th
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Gather tax documents and financial information",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Review and Accept Offer",
      description: "Compare acceptance letters and financial aid packages. Submit deposit by May 1st.",
      category: "decision",
      step: 5,
      dueDate: new Date(currentYear + 1, 4, 1), // May 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Receive acceptance and financial aid offers",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Final Academic Requirements",
      description: "Maintain grades, take AP/IB exams, and send final transcripts.",
      category: "academic",
      step: 6,
      dueDate: new Date(currentYear + 1, 5, 15), // June 15th
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Complete all coursework and exams",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Placement Tests & Orientation",
      description: "Complete required placement tests and attend new student orientation.",
      category: "academic",
      step: 7,
      dueDate: new Date(currentYear + 1, 6, 1), // July 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Accept admission offer",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Health & Administrative Tasks",
      description: "Submit health records, housing forms, and complete other required documentation.",
      category: "administrative",
      step: 8,
      dueDate: new Date(currentYear + 1, 6, 15), // July 15th
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      dependencies: "Accept admission offer",
      createdAt: now,
      updatedAt: now
    }
  ]

  return defaultTasks.sort((a, b) => a.step - b.step)
} 