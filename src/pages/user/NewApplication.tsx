import {
  Autocomplete,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import React, { useContext, useState } from "react";
import MuiCard from "@mui/material/Card";
import AppTheme from "../../theme/AppTheme";
import ColorModeSelect from "../../theme/ColorModeSelect";
import { ArrowBackIosOutlined } from "@mui/icons-material";
import BuildingEntity from "../../models/BuildingEntity";
import BaseService from "../../API/BaseService";
import { AuthContext } from "../../context/AuthContext";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "650px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
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

export default function NewApplication(props: {
  disableCustomTheme?: boolean;
}) {
  const baseService = new BaseService();
  const auth = useContext(AuthContext);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [building, setBuilding] = React.useState<BuildingEntity>(
    new BuildingEntity()
  );
  const [buildings, setBuildings] = React.useState<BuildingEntity[]>([]);
  const navigate = useNavigate();

  const backToLogin = () => {
    navigate("/login");
  };

  const getBuildings = async (filter: string) => {
    setBuildings([]);
    await baseService
      .getBuildingsByFilter(filter)
      .then((res: BuildingEntity[]) => {
        setBuildings(res);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError) {
      return;
    }

    const data = new FormData(event.currentTarget);

    try {
      baseService.createApplication(data, building.id).then((res) => {
        console.log(res);
        alert("Заявка успешно создана!");
        navigate("/login");
      });
    } catch (error) {
      console.error("try createApplication: ", error);
    }
  };

  const validateEmail = () => {
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
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <IconButton onClick={backToLogin}>
              <ArrowBackIosOutlined />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Создать новую заявку
            </Typography>
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                defaultValue={auth?.authUser?.email}
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormControl>
                <FormLabel htmlFor="building">Название ЖК</FormLabel>
                <Autocomplete
                  freeSolo
                  id="building"
                  disableClearable
                  options={buildings}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  onChange={(event, newValue) => {
                    if (typeof newValue !== "string") {
                      setBuilding(newValue); // Запоминаем объект
                    }
                  }}
                  renderOption={(props, option) => {
                    const label =
                      typeof option === "string" ? option : option.name;
                    return (
                      <li
                        {...props}
                        key={typeof option === "string" ? label : option.id}
                      >
                        {label}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="ЖК Солнечные зори"
                      sx={{ width: "275px" }}
                      variant="outlined"
                      name="building"
                      onChange={(e: { target: { value: string } }) =>
                        getBuildings(e.target.value)
                      }
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          type: "search",
                        },
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="address">Адрес</FormLabel>
                <TextField
                  name="address"
                  placeholder="Улица, дом, город"
                  type="text"
                  id="address"
                  autoFocus
                  required
                  value={building.address}
                  sx={{ width: "275px" }}
                  variant="outlined"
                />
              </FormControl>
            </div>
            <FormControl>
              <FormLabel htmlFor="title">Тема заявки</FormLabel>
              <TextField
                name="title"
                placeholder="Поломка лифта"
                type="text"
                id="title"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Описание</FormLabel>
              <TextField
                name="description"
                placeholder="Текст сообщения"
                type="text"
                id="description"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateEmail}
            >
              Отправить
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
