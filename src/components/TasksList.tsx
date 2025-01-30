import React, { useState } from "react"
import {
  Paper,
  Typography,
  Checkbox,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab"
import DeleteIcon from "@mui/icons-material/Delete"
import AssignmentIcon from "@mui/icons-material/Assignment"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"
import { db, auth } from "../config/firebase"
import type { Task } from "../types"
import { format } from "date-fns"

interface TasksListProps {
  tasks: Task[]
  onTaskUpdate: () => Promise<void>
  collegeName?: string
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onTaskUpdate,
  collegeName,
}) => {
  const [newTask, setNewTask] = useState("")
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())

  const handleAddTask = async () => {
    if (!newTask.trim()) return

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTask,
        completed: false,
        userId: auth.currentUser?.uid,
        createdAt: new Date(),
      })
      setNewTask("")
      onTaskUpdate()
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), {
        completed: !completed,
      })
      onTaskUpdate()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId))
      onTaskUpdate()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const toggleDescription = (taskId: string) => {
    const newExpanded = new Set(expandedTasks)
    if (expandedTasks.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        mx: 2, // Add margin on sides
        maxWidth: 1200, // Maximum width
        width: "100%", // Full width up to maxWidth
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {collegeName ? `Timeline for ${collegeName}` : "Timeline"}
      </Typography>
      <Timeline
        position="right"
        sx={{
          px: 0,
          "& .MuiTimelineContent-root": {
            flex: 0.8, // Make content area wider
          },
          "& .MuiTimelineOppositeContent-root": {
            flex: 0.2, // Keep date column narrower
          },
        }}
      >
        {tasks.map((task) => {
          const isExpanded = expandedTasks.has(task.id)
          return (
            <TimelineItem key={task.id}>
              <TimelineOppositeContent sx={{ flex: 0.2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {format(
                    task.dueDate instanceof Timestamp
                      ? task.dueDate.toDate()
                      : task.dueDate,
                    "MMM d, yyyy"
                  )}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={task.completed ? "success" : "primary"}
                  variant={task.completed ? "filled" : "outlined"}
                  sx={{ p: 1 }}
                >
                  <AssignmentIcon fontSize="small" />
                </TimelineDot>
                <TimelineConnector
                  sx={{
                    bgcolor: task.completed ? "success.light" : "primary.light",
                  }}
                />
              </TimelineSeparator>
              <TimelineContent sx={{ py: 1, px: 2 }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id, task.completed)}
                      size="small"
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          color: task.completed
                            ? "text.disabled"
                            : "text.primary",
                        }}
                      >
                        {task.title}
                      </Typography>
                      {task.description && (
                        <>
                          <Button
                            size="small"
                            onClick={() => toggleDescription(task.id)}
                            endIcon={
                              isExpanded ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )
                            }
                            sx={{
                              mt: 0.5,
                              p: 0,
                              minHeight: 0,
                              display: "inline-flex",
                              whiteSpace: "nowrap",
                              textTransform: "none",
                              "& .MuiButton-endIcon": {
                                ml: 0.5,
                                marginRight: 0,
                              },
                            }}
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </Button>
                          {isExpanded && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mt: 1,
                                fontSize: "0.875rem", // Slightly smaller description text
                                textDecoration: task.completed
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {task.description}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </Paper>
  )
}
