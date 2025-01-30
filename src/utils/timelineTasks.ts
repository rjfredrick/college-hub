import { Task } from '../types'

export const generateDefaultTasks = (
  collegeId: string,
  collegeName: string,
  userId: string
): Omit<Task, 'id' | 'status'>[] => {
  const currentYear = new Date().getFullYear()
  const now = new Date()

  return [
    {
      title: "College Application",
      description: "Submit application via Common App, Coalition App, or directly to college",
      dueDate: new Date(currentYear, 11, 1), // December 1st
      completed: false,
      userId,
      collegeId,
      collegeName,
      category: "application",
      dependencies: "Research colleges and decide where to apply",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "Standardized Tests",
      description: "Submit SAT/ACT scores if required",
      dueDate: new Date(currentYear, 10, 1), // November 1st
      completed: false,
      userId,
      collegeId,
      collegeName,
      category: "tests",
      dependencies: "Take SAT/ACT exams if not test-optional",
      createdAt: now,
      updatedAt: now
    },
    // ... Add other timeline items following the same pattern
    {
      title: "Financial Aid & Scholarships",
      description: "Complete FAFSA and CSS Profile (if required)",
      dueDate: new Date(currentYear, 9, 1), // October 1st
      completed: false,
      userId,
      collegeId,
      collegeName,
      category: "financial",
      dependencies: "Gather financial information and tax documents",
      createdAt: now,
      updatedAt: now
    },
    {
      title: "College Decision & Enrollment",
      description: "Review acceptance and make final decision",
      dueDate: new Date(currentYear + 1, 4, 1), // May 1st next year
      completed: false,
      userId,
      collegeId,
      collegeName,
      category: "decision",
      dependencies: "Receive acceptance letters and financial aid offers",
      createdAt: now,
      updatedAt: now
    }
  ]
} 