import { formatCurrencyAmount } from "@/helpers/NumberFormatter";
import { Box, Typography } from "@mui/material";

export const BalanceSection = ({
  value,
  getItemSymbol,
  getItemAmount,
}: {
  value: IAccountVO;
  getItemSymbol: (isConsolidate?: boolean) => string;
  getItemAmount: (value: IAccountVO) => string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-end",
      marginLeft: "auto",
      flexDirection: "column",
    }}
  >
    <Box display="flex" alignItems="baseline">
      <Typography
        sx={{
          whiteSpace: "nowrap",
          fontSize: "16px",
          fontWeight: "var(--fontSemiBold600)",
        }}
      >
        {formatCurrencyAmount(getItemAmount(value).split(".")[0])}.
      </Typography>
      <Typography
        sx={{
          whiteSpace: "nowrap",
          fontSize: "16px",
          fontWeight: "var(--fontSemiBold600)",
        }}
      >
        {getItemAmount(value).split(".")[1]}
      </Typography>
      <Typography
        sx={{
          whiteSpace: "nowrap",
          fontSize: "16px",
          fontWeight: "var(--fontSemiBold600)",
          ml: 0.5,
        }}
      >
        {getItemSymbol(!!value.CONSOLIDATE_CURRENCY)}
      </Typography>
    </Box>

    {value.CONSOLIDATE_BALANCE &&
      +value.CONSOLIDATE_BALANCE !== +value.BALANCE && (
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
          {value.BALANCE.split(".")[0]}.{value.BALANCE.split(".")[1]}{" "}
          {getItemSymbol(false)}
        </Typography>
      )}
  </Box>
);
