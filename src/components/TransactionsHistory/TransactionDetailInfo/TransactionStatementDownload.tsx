import { getTranslatedText } from "@/Translations";
import { TransactionIcons } from "@/components/Reusable/TransactionIcons";
import { Box, Typography } from "@mui/material";

export const TransactionStatementDownload = () => {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        gap: "10px",
      }}
    >
      <TransactionIcons type={"download"} />
      <Typography
        sx={{
          fontWeight: "var(--fontSemiBold600)",
          color: "contentAccentBlue.main",
        }}
      >
        {getTranslatedText("DownloadStatements")}
      </Typography>
    </Box>
  );
};
