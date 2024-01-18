import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import React from "react";
import { Typography } from "@mui/material";
import { getTranslatedText } from "@/Translations";

const RectangleButtonDiv = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  padding: "16px",
  gap: "16px",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: "100%",
  },
  color: "white", // ripple color
}));

interface RectangleButtonProps {
  icon?: React.ReactNode;
  title?: string;
  onClick?: (e: any) => void;
  width?: number;
  height?: number;
}

export const RectangleButton: React.FC<RectangleButtonProps> = ({
  icon,
  title,
  onClick,
  width = 24,
  height = 24,
}: RectangleButtonProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        gap: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "backgroundRaised.main",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          boxShadow: "0px 4px 16px 0px #0000000A, 0px 2px 4px 0px #0000000A",
          width: "100%",
          height: "100%",
        }}
      >
        <RectangleButtonDiv focusRipple>
          <Box
            sx={{
              width: `${width}px`,
              height: `${height}px`,
              svg: {
                width: "100%",
                height: "100%",
              },
            }}
          >
            {icon && React.cloneElement(icon as any)}
          </Box>
          <Box>
            {title && (
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "16px",
                  color: "contentPrimary.main",
                }}
              >
                {getTranslatedText(title)}
              </Typography>
            )}
          </Box>
        </RectangleButtonDiv>
      </Box>
    </Box>
  );
};
