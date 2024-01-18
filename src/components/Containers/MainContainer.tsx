import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  shouldShow?: boolean;
}

const Title = ({ title }: { title: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      mt: 3,
      mb: 2,
      ml: 2,
    }}
  >
    <Typography
      sx={{
        color: "contentPrimary.main",
        fontSize: "20px",
        fontWeight: "var(--fontSemiBold600)",
      }}
      variant="h5"
    >
      {title}
    </Typography>
  </Box>
);

export const MainContainer: React.FC<ContainerProps> = memo(
  ({ title, children, shouldShow = true }) => {
    if (!shouldShow) return null;

    return (
      <Box sx={{ mb: 2 }}>
        {title && <Title title={title} />}
        <Box
          sx={{
            backgroundColor: "backgroundDefault.main",
            boxShadow: "var(--swissBankShadowContentBlocks)",
            width: "100%",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            pr: 2,
            pl: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }
);
