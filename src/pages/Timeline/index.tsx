import React from "react"
import { Container, Typography, Box } from "@mui/material"
import { Timeline } from "../../components/Timeline"
import { useApplications } from "../../hooks/useApplications"

const TimelinePage: React.FC = () => {
  const { applications, loading, error } = useApplications()

  if (loading) return <Box>Loading...</Box>
  if (error) return <Box>Error: {error}</Box>

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Application Timeline
        </Typography>
        <Timeline applications={applications} />
      </Box>
    </Container>
  )
}

export default TimelinePage
