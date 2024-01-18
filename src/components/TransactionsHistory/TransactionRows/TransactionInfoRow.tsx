import { TransactionIcons } from "@/components/Reusable/TransactionIcons";
import { Box, Typography } from "@mui/material";
import { memo } from "preact/compat";

export const TransactionInfoRow = memo(
    ({
      label,
      value,
      onBtnClick,
    }: {
      label: string;
      value: string;
      onBtnClick?: (value: string) => void;
    }) => {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              padding: "8px 0",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "contentQuaternary.main",
                fontSize: "16px",
                fontWeight: "--fontRegular400",
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                color:
                  value === "--"
                    ? "contentQuaternary.main"
                    : "contentPrimary.main",
                fontSize: "16px",
                fontWeight: "--fontRegular400",
              }}
            >
              {value}
            </Typography>
          </Box>
          {onBtnClick && (
            <Box
              onClick={() => onBtnClick(value)}
              sx={{
                display: "flex",
                alignItems: "start",
                padding: "8px 0",
                flexDirection: "column",
              }}
            >
              <TransactionIcons type={"copy"} />
            </Box>
          )}
        </Box>
      );
    }
  );