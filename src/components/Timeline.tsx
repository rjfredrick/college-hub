import React from "react"
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { Application } from "../types"

interface TimelineProps {
  applications: Application[]
}

export const Timeline: React.FC<TimelineProps> = ({ applications }) => {
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  )

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Application Timeline
      </Typography>
      <List>
        {sortedApplications.map((app) => (
          <ListItem key={app.id}>
            <ListItemText
              primary={app.collegeName}
              secondary={`Deadline: ${new Date(
                app.deadline
              ).toLocaleDateString()}`}
              sx={{
                color:
                  new Date(app.deadline) < new Date()
                    ? "error.main"
                    : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
