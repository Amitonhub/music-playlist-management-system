import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Link,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        email,
        username,
        password,
      });

      alert("Registration successful!");
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <MusicNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Sign Up for Music App
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
            <TextField
              label="Username"
              type="text"
              fullWidth
              required
              margin="normal"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              margin="normal"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "primary.main",
                ":hover": { bgcolor: "#1ed760" },
              }}
            >
              Register
            </Button>
            <Typography
              variant="body2"
              color="gray"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{" "}
              <Link href="/login" color="primary">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
