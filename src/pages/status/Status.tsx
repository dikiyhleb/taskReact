import { CssBaseline, Stack, Typography } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../theme/AppTheme";
import { useEffect, useState } from "react";
import BaseService from "../../API/BaseService";
import { ApplicationEntity } from "../../models/ApplicationEntity";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
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

export default function Status(props: { disableCustomTheme?: boolean }) {
  const baseService = new BaseService();
  const queryParams = new URLSearchParams(window.location.search);
  const appId = queryParams.get("id");
  const [application, setApplication] = useState<ApplicationEntity | null>(
    null
  );

  useEffect(() => {
    async function initApp() {
      baseService.getAppById(appId).then((res: ApplicationEntity) => {
        console.log("getAppById:");
        console.log(res);

        setApplication(res);
      });
    }
    initApp();
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Typography textAlign="center" variant="h3">
          Заявка №{application?.id}
        </Typography>
        <Card></Card>
      </SignInContainer>
    </AppTheme>
  );
}
