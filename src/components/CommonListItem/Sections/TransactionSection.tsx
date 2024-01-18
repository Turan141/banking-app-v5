import { getTranslatedText } from "@/Translations";
import { Box, Typography } from "@mui/material";

export const TransactionSection = ({
  value,
  //@ts-ignore
  getItemSymbol,
}: {
  value: ITransactionOperation;
  getItemSymbol: () => string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-end",
      marginLeft: "auto",
      flexDirection: "column",
    }}
  >
    <Box
      display="flex"
      alignItems="baseline"
      sx={{
        fontSize: "16px",
        fontWeight: "var(--fontSemiBold600)",
        whiteSpace: "nowrap",
        color: value.TYPE === "INCOMING TRANSFER" ? "colorAccentGreen.main" : "initial",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "var(--fontSemiBold600)",
        }}
      >
        {value.AMOUNT}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: "var(--fontSemiBold600)",
          marginLeft: 0.5,
        }}
      >
        {getItemSymbol()}
      </Typography>
    </Box>
    <Typography
      sx={{
        whiteSpace: "normal",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxLines: 2,
        fontSize: "12px",
        fontWeight: "var(--fontRegular400)",
        ml: 0.5,
        color: "contentQuaternary.main",
      }}
    >
      {getTranslatedText(value.STATUS)}
    </Typography>
  </Box>
);
