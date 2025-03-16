import {
  CssBaseline,
  Box,
  FormLabel,
  OutlinedInput,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import AppTheme from "../../theme/AppTheme";
import ColorModeIconDropdown from "../../theme/ColorModeIconDropdown";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import React from "react";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const TopBar = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
}));

const CustomMain = styled("div")(({ theme }) => ({
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const CustomBox = styled(Box)(() => ({
  position: "fixed",
  top: "65%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "800px",
}));

export default function UserNoLogin(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const backToLogin = () => {
    navigate("/login");
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <CustomMain>
        <TopBar>
          <IconButton onClick={backToLogin}>
            <ArrowBackOutlined />
          </IconButton>
          <ColorModeIconDropdown />
        </TopBar>
        <CustomBox>
          <Grid container spacing={3}>
            <FormGrid>
              <Typography variant="h2">Cоздать новую заявку</Typography>
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor="email" required>
                Email
              </FormLabel>
              <OutlinedInput
                id="email"
                name="email"
                type="email"
                placeholder="mail@example.com"
                autoComplete="email"
                required
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor="building" required>
                Название ЖК
              </FormLabel>
              <OutlinedInput
                id="building"
                name="building"
                type="text"
                placeholder="Название"
                autoComplete=""
                required
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor="address" required>
                Адрес
              </FormLabel>
              <OutlinedInput
                id="address"
                name="address"
                type="address"
                placeholder="Улица, дом"
                autoComplete="shipping address-line1"
                required
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor="description" required>
                Описание
              </FormLabel>
              <OutlinedInput
                id="description"
                name="description"
                type="text"
                placeholder="Введите описание заявки"
                autoComplete=""
                required
                size="small"
                sx={{ height: "120px", alignItems: "start" }}
              />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <Button variant="outlined" onClick={validateInputs}>
                Отправить
              </Button>
            </FormGrid>
          </Grid>
        </CustomBox>
      </CustomMain>
    </AppTheme>
  );
}
