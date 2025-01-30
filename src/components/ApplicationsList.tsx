import React from "react"
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  ListItemButton,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import type { Application } from "../types"

interface ApplicationsListProps {
  applications: Application[]
  onEdit: (application: Application) => void
  onDelete: (applicationId: string) => void
  selectedId?: string
  onSelect: (application: Application) => void
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  onEdit,
  onDelete,
  selectedId,
  onSelect,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Applications
      </Typography>
      <List>
        {applications.map((application) => (
          <ListItem
            key={application.id}
            disablePadding
            secondaryAction={
              <Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(application)
                  }}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(application.id)
                  }}
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemButton
              selected={selectedId === application.id}
              onClick={() => onSelect(application)}
            >
              <ListItemText
                primary={application.collegeName}
                secondary={`Status: ${application.status}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
