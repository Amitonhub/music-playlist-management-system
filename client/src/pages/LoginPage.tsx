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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid credentials.");
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
            Login to Music App
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
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
              Login
            </Button>
            <Typography
              variant="body2"
              color="gray"
              align="center"
              sx={{ mt: 2 }}
            >
              Don't have an account?{" "}
              <Link href="/register" color="primary">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
