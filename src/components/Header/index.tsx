import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      handleClose()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const handleLogin = () => {
    handleClose()
    navigate("/login")
  }

  const handleProfile = () => {
    handleClose()
    navigate("/profile")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          College Hub
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentUser && (
            <Typography variant="body2" sx={{ mr: 1 }}>
              {currentUser.email}
            </Typography>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {currentUser ? (
              [
                <MenuItem key="profile" onClick={handleProfile}>
                  Profile
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
