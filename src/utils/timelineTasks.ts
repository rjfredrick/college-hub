import { Task } from '../types'

export const generateDefaultTasks = (
  applicationId: string,
  collegeName: string,
  userId: string
): Omit<Task, 'id'>[] => {
  const now = new Date()
  const currentYear = new Date().getFullYear()
  const defaultTasks: Omit<Task, 'id'>[] = [
    {
      title: "Standardized Tests",
      description: "Submit SAT/ACT scores if required",
      dueDate: new Date(currentYear, 4, 1), // Spring Junior Year (May 1st)
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "tests",
      dependencies: "Take SAT/ACT exams if not test-optional",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "College Application",
      description: "Submit application via Common App, Coalition App, or directly to college",
      dueDate: new Date(currentYear, 10, 1), // Fall Senior Year (November 1st)
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "application",
      dependencies: "",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Financial Aid & Scholarships",
      description: "Complete FAFSA and CSS Profile (if required)",
      dueDate: new Date(currentYear, 9, 1), // October 1st
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "financial",
      dependencies: "Gather financial information and tax documents",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "College Decision & Enrollment",
      description: "Review acceptance and make final decision",
      dueDate: new Date(currentYear + 1, 4, 1), // May 1st Senior Year
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "decision",
      dependencies: "",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Placement Tests & Orientation",
      description: "Complete placement tests and attend orientation",
      dueDate: new Date(currentYear + 1, 5, 1), // June 1st Post-Senior Year
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "academic",
      dependencies: "",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Health & Administrative Tasks",
      description: "Submit health records, housing forms, and other required documents",
      dueDate: new Date(currentYear + 1, 6, 1), // July 1st Post-Senior Year
      completed: false,
      userId,
      applicationId,
      collegeId: "",
      collegeName,
      category: "administrative",
      dependencies: "",
      createdAt: now,
      updatedAt: now
    }
  ]

  // Sort tasks by due date
  defaultTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  return defaultTasks
} 