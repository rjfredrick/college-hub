import React from "react"
import { Paper, Grid, Typography, Box } from "@mui/material"
import { Application } from "../types"

interface StatsProps {
  applications: Application[]
}

export const Stats: React.FC<StatsProps> = ({ applications }) => {
  const totalApplications = applications.length
  const submittedApplications = applications.filter(
    (app) => app.status === "submitted"
  ).length
  const acceptedApplications = applications.filter(
    (app) => app.status === "accepted"
  ).length
  const pendingApplications = applications.filter(
    (app) => app.status === "in-progress"
  ).length

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Application Statistics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box textAlign="center">
            <Typography variant="h4">{totalApplications}</Typography>
            <Typography variant="body2" color="textSecondary">
              Total
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box textAlign="center">
            <Typography variant="h4">{submittedApplications}</Typography>
            <Typography variant="body2" color="textSecondary">
              Submitted
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box textAlign="center">
            <Typography variant="h4">{acceptedApplications}</Typography>
            <Typography variant="body2" color="textSecondary">
              Accepted
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box textAlign="center">
            <Typography variant="h4">{pendingApplications}</Typography>
            <Typography variant="body2" color="textSecondary">
              Pending
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
