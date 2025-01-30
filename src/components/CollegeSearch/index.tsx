import React, { useState, useEffect } from "react"
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
} from "@mui/material"
import { searchColleges } from "../../services/database"
import type { College } from "../../types"

// US States for dropdown
const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

interface CollegeSearchProps {
  value: College | null
  onChange: (college: College | null) => void
}

const CollegeSearch: React.FC<CollegeSearchProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newCollege, setNewCollege] = useState({
    name: "",
    state: "CA",
    commonAppEnabled: false,
    coalitionAppEnabled: false,
    isTestOptional: false,
  })

  useEffect(() => {
    let active = true

    if (inputValue === "") {
      setOptions(value ? [value] : [])
      return undefined
    }

    const fetchColleges = async () => {
      setLoading(true)
      try {
        const results = await searchColleges(inputValue)
        if (active) {
          setOptions(results)
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()

    return () => {
      active = false
    }
  }, [value, inputValue])

  const handleAddNewCollege = () => {
    const newCollegeData: College = {
      id: `manual-${Date.now()}`,
      ...newCollege,
      requiresCSSProfile: false,
      deadlines: {},
    }
    onChange(newCollegeData)
    setShowAddDialog(false)
    setNewCollege({
      name: "",
      state: "CA",
      commonAppEnabled: false,
      coalitionAppEnabled: false,
      isTestOptional: false,
    })
  }

  return (
    <>
      <Autocomplete
        id="college-search"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={(_, newValue) => {
          if (newValue === null && inputValue) {
            setShowAddDialog(true)
          } else {
            onChange(newValue)
          }
        }}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        options={options}
        groupBy={(option) => option.state}
        getOptionLabel={(option) => option.name}
        loading={loading}
        noOptionsText={
          <Box sx={{ py: 1 }}>
            <Typography>No colleges found.</Typography>
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault()
                setShowAddDialog(true)
              }}
            >
              Add New College
            </Button>
          </Box>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Colleges"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.75)",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Box>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {option.state}
              </Typography>
            </Box>
          </li>
        )}
      />

      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>Add New College</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="College Name"
            fullWidth
            value={newCollege.name}
            onChange={(e) =>
              setNewCollege({ ...newCollege, name: e.target.value })
            }
          />
          <Select
            fullWidth
            value={newCollege.state}
            onChange={(e) =>
              setNewCollege({ ...newCollege, state: e.target.value })
            }
            sx={{ mt: 2 }}
          >
            {US_STATES.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddNewCollege}
            variant="contained"
            disabled={!newCollege.name.trim() || !newCollege.state}
          >
            Add College
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CollegeSearch

export {}
