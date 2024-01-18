import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect, useState } from "preact/hooks";
import Signal from "badmfck-signal";
import AccountHomeManager from "./managers/AccounHomeManager";
import { S_BRIDGE_APP_READY } from "./bridge/Bridge";
import { Presenter, Presenters, Screens } from "./Presenter";
import AuthManager, { AuthStatus, S_AUTH_STATUS } from "./managers/AuthManager";
import { darkTheme, lightTheme } from "./themes/Pallete";
import TransactionManager from "./managers/TransactionManager";
import "preact/debug"; //TODO remove on prod

Signal.setupReact(useState, useEffect);

const authManager = new AuthManager();
authManager.init();

const accountHomeManager = new AccountHomeManager();
accountHomeManager.init();

const transactionManager = new TransactionManager()
transactionManager.init()

// AppEntry
export function App({ themeType = "light" }: { themeType: "light" | "dark" }) {
  const selectedTheme = themeType === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    S_BRIDGE_APP_READY.invoke();
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <MainApp />
      <AuthOverlap />
    </ThemeProvider>
  );
}

// Auth overlapping
const AuthOverlap = () => {
  const authStatus = S_AUTH_STATUS.use([]);
  const [dispose, setDispose] = useState<boolean>(false);

  // Change disposed
  if (authStatus !== AuthStatus.AUTHORIZED && dispose) {
    setDispose(true);
    return null;
  }

  // Screen disposed
  if (dispose) return null;

  // create presenter
  const present = { ...Presenters.AUTH };
  present.startScreen = {
    screen: Screens.AUTH_LOGIN,
    animationDirection: authStatus === AuthStatus.AUTHORIZED ? "down" : "up",
  };

  // Screen shown on hidden
  const onAnimationComplete = () => {
    if (authStatus === AuthStatus.AUTHORIZED) setDispose(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
      }}
    >
      <Presenter
        presenter={present}
        onAnimationComplete={onAnimationComplete}
      />
    </Box>
  );
};

// Main Application
const MainApp = ()=>{
  //@ts-ignore
	const [sideMenuState,setSideMenuState]=useState<boolean>(false);
	//GD.S_MAIN_BURGER_CLICK.use([sideMenuState],()=>setSideMenuState(!sideMenuState))
	const menuSize="70%"

  //@ts-ignore
	const authStatus = S_AUTH_STATUS.use([]);


  // TODO: optimistic ui
 

  return (
    <Box
      sx={{
        transform: "translateZ(1)",
        overflowX: "hidden",
		height:"100vh",
      }}
    >
     
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          transform: sideMenuState ? `translate(${menuSize})` : "none",
          transition: "transform .2s",
          backgroundColor: "backgroundMain.main",
		  height:"100%"
        }}
      >
        {/*
          sideMenuState && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 3,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,.2)",
              }}
              onClick={() => GD.S_MAIN_BURGER_CLICK.invoke()}
            ></Box>
          )
        */}

        <Presenter presenter={Presenters.MAIN} />
      </Box>
    </Box>
  );
};


