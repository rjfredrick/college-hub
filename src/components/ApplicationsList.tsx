import React from "react"
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Box,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Application } from "../types"

interface ApplicationsListProps {
  applications: Application[]
  onEdit: (application: Application) => void
  onDelete: (applicationId: string) => void
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Applications
      </Typography>
      <List>
        {applications.map((app) => (
          <ListItem key={app.id}>
            <ListItemText
              primary={app.collegeName}
              secondary={`Deadline: ${new Date(
                app.deadline
              ).toLocaleDateString()}`}
            />
            <Chip
              label={app.status}
              color={
                app.status === "accepted"
                  ? "success"
                  : app.status === "rejected"
                  ? "error"
                  : "default"
              }
              size="small"
              sx={{ mr: 1 }}
            />
            <Box>
              <IconButton edge="end" onClick={() => onEdit(app)} sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => onDelete(app.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
