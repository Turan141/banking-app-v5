import { Box } from "@mui/material";
import { ReactNode } from "preact/compat";
import { BottomMenu } from "../../components/BottomMenu";

interface IScreenParams {
  children?: any;
  bottom?: ReactNode;
  head?: ReactNode;
}

export const BaseScreen = ({ children, bottom, head }: IScreenParams) => {
  if (!bottom) bottom = <BottomMenu />;

  return (
    <Box sx={{
        display:"flex",
        flexDirection:"column",
        height:"100%",
        flexGrow:"1",
        backgroundColor:"red",
    }}>
        {head && 
            <Box
                sx={{
                    backgroundColor: "backgroundDefault.main",
                    paddingTop:"env(safe-area-inset-top)",
                    paddingLeft:"env(safe-area-inset-left)",
                    paddingRight:"env(safe-area-inset-right)",
                }}
            >
                {head}
            </Box>
        }

        <Box sx={{
            flexGrow:"1",
            position:"relative",
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            paddingBottom:(!bottom?"env(safe-area-inset-bottom)":null),
            "&>div":{
                position:"absolute",
                flexGrow:"1",
                width:"100%",
            }
        }}><div>
            {children}
        </div></Box>

        {bottom &&
            <Box sx={{
                paddingBottom:"env(safe-area-inset-bottom)",
            }}>
                {bottom}
            </Box>
        }

    </Box>
    )
};