import React, { useState } from "react"
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Checkbox,
  TextField,
  Button,
  Box,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
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

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {collegeName ? `Tasks for ${collegeName}` : "Tasks"}
      </Typography>
      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add
        </Button>
      </Box>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} dense>
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id, task.completed)}
            />
            <ListItemText
              primary={task.title}
              secondary={`Due: ${format(
                task.dueDate instanceof Timestamp
                  ? task.dueDate.toDate()
                  : task.dueDate,
                "MMM d, yyyy"
              )}`}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                "& .MuiListItemText-secondary": {
                  color: task.completed ? "text.disabled" : "text.secondary",
                },
              }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
