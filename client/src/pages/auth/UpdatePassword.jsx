import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { updatePassword } from "@/store/auth-slice/profile";
import { clearError } from "@/store/auth-slice";
import { clearMessage } from "@/store/auth-slice/forgotPassword";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { gsap } from "gsap";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      dispatch(clearMessage());
    }
  };

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  useEffect(() => {
    gsap.from(".updatePasswordBox", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".textField", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".updatePasswordBtn", {
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <Box
      className="updatePasswordBox"
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 15,
        mb: 15,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <br />
      <Typography variant="h5" gutterBottom>
        Update Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          type={showOldPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility(setShowOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          className="updatePasswordBtn"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePassword;
