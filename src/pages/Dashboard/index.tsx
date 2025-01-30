import React, { useState, useEffect, useCallback } from "react"
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useApplications } from "../../hooks/useApplications"
import type { ApplicationType, Application } from "../../types"
import CollegeSearch from "../../components/CollegeSearch"
import type { College } from "../../types"
import { Timeline } from "../../components/Timeline"
import { Stats } from "../../components/Stats"
import { TasksList } from "../../components/TasksList"
import { ApplicationsList } from "../../components/ApplicationsList"
import {
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore"
import { db } from "../../config/firebase"
import { useAuth } from "../../contexts/AuthContext"
import type { Task } from "../../types"
import DashboardIcon from "@mui/icons-material/Dashboard"
import SchoolIcon from "@mui/icons-material/School"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PersonIcon from "@mui/icons-material/Person"
import { seedData } from "../../utils/seedData"
import { generateDefaultTasks } from "../../utils/timelineTasks"

const applicationTypes: ApplicationType[] = [
  "early_decision",
  "early_action",
  "regular_decision",
  "rolling",
]

const Dashboard: React.FC = () => {
  const { applications, loading, error, addApplication, fetchApplications } =
    useApplications()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [applicationType, setApplicationType] =
    useState<ApplicationType>("regular_decision")
  const [tasks, setTasks] = useState<Task[]>([])
  const { currentUser } = useAuth()
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  const fetchTasks = useCallback(async () => {
    if (!currentUser) return
    const tasksRef = collection(db, "tasks")
    const q = query(tasksRef, where("userId", "==", currentUser.uid))
    const snapshot = await getDocs(q)
    setTasks(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task))
    )
  }, [currentUser])

  useEffect(() => {
    fetchTasks()
  }, [currentUser, fetchTasks])

  const handleAddApplication = async () => {
    if (!selectedCollege || !currentUser) return

    // Add the application
    const newApplication = await addApplication(
      selectedCollege.name,
      applicationType
    )

    // Generate and add default tasks
    const defaultTasks = generateDefaultTasks(
      newApplication.id,
      selectedCollege.name,
      currentUser.uid
    )

    // Add all tasks to Firestore
    const tasksRef = collection(db, "tasks")
    await Promise.all(defaultTasks.map((task) => addDoc(tasksRef, task)))

    // Refresh tasks list
    await fetchTasks()

    setOpenDialog(false)
    setSelectedCollege(null)
    setApplicationType("regular_decision")
  }

  const handleEditApplication = (application: Application) => {
    // TODO: Implement edit functionality
    console.log("Edit application:", application)
  }

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      await deleteDoc(doc(db, "applications", applicationId))
      // Refresh applications list
      fetchApplications()
    } catch (error) {
      console.error("Error deleting application:", error)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" sx={{ mt: 4 }}>
          Error loading applications: {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          borderRight: 1,
          borderColor: "divider",
          height: "100vh",
          position: "fixed",
          bgcolor: "background.paper",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          College Hub
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Colleges" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setShowProfileDialog(true)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: "240px", // Same as sidebar width
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mt: 4, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
                pb: 2,
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                My College Applications
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  textTransform: "none",
                  px: 3,
                }}
              >
                Add Application
              </Button>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stats applications={applications} />
                  </Grid>
                  <Grid item xs={12}>
                    <Timeline applications={applications} />
                  </Grid>
                  <Grid item xs={12}>
                    <ApplicationsList
                      applications={applications}
                      onEdit={handleEditApplication}
                      onDelete={handleDeleteApplication}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} sx={{ position: "sticky", top: 24 }}>
                <TasksList tasks={tasks} onTaskUpdate={fetchTasks} />
              </Grid>
            </Grid>

            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Add New Application</DialogTitle>
              <DialogContent sx={{ pt: 2 }}>
                <CollegeSearch
                  value={selectedCollege}
                  onChange={setSelectedCollege}
                />
                <TextField
                  select
                  label="Application Type"
                  fullWidth
                  value={applicationType}
                  onChange={(e) =>
                    setApplicationType(e.target.value as ApplicationType)
                  }
                  sx={{ mt: 2 }}
                >
                  {applicationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace("_", " ").toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddApplication} variant="contained">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      </Box>

      <Dialog
        open={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
      >
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom>Email: {currentUser?.email}</Typography>
            <Button
              variant="outlined"
              onClick={() => currentUser && seedData(currentUser.uid)}
              sx={{ mt: 2 }}
            >
              Add Test Data
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProfileDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Dashboard
