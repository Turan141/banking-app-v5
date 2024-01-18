import { formatDate } from "@/helpers/DateTimeFormats";
import { getColor, getColorFromTheme } from "@/helpers/utils";
import {
  REQ_CURRENCY_SYMBOLS,
  REQ_LOCAL_ACCOUNT_HOME_DATA,
} from "@/managers/AccounHomeManager";
import { useTheme } from "@emotion/react";
import { Box, Typography, styled } from "@mui/material";
import { memo, useCallback } from "preact/compat";
import { TransactionBlock } from "../TransactionDetailInfo/TransactionBlock";
import { getTranslatedText } from "@/Translations";

interface TransactionItemRowProps {
  title: string;
  date: string;
  changedAmount: string;
  leftAmount: string;
  currency: string;
  isLast?: boolean;
  isSingle?: boolean;
  number?: number;
  iban?: string;
}

const TransactionWr = styled(Box)<{
  isLast?: boolean;
  isSingle?: boolean;
  number?: number;
  lineColor: string;
  circleFillColor: string;
}>(({ isLast, isSingle, number, lineColor, circleFillColor }) => ({
  width: "100%",
  padding: isSingle ? "0" : "0px 10px 20px 20px",
  marginLeft: "10px",
  borderLeft: isLast ? "none" : `1.5px solid ${lineColor}`,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  "::before": {
    content: `"${number}"`,
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: `1px solid ${lineColor}`,
    color: lineColor,
    backgroundColor: circleFillColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "-12px",
    top: "0px",
    fontSize: "14px",
    gap: "4px",
  },
}));

export const TransactionItemRow: React.FC<TransactionItemRowProps> = memo(
  ({
    title,
    date,
    changedAmount,
    leftAmount,
    currency,
    isLast,
    isSingle,
    number,
    iban,
  }) => {
    const [currencySymbols] = REQ_CURRENCY_SYMBOLS.useRequest();
    const [localAccountHomeData] = REQ_LOCAL_ACCOUNT_HOME_DATA.useRequest();

    const theme = useTheme();
    const lineColor = getColor("HISTORY_LINE")
      ? getColorFromTheme(theme, getColor("HISTORY_LINE"))
      : undefined;
    const circleFillColor = getColor("HISTORY_CIRCLE_FILL")
      ? getColorFromTheme(theme, getColor("HISTORY_CIRCLE_FILL"))
      : undefined;

    const getAccountLabel = useCallback(
      (iban: string) =>
        localAccountHomeData?.account.accounts.find(
          (account) => account?.IBAN === iban
        )?.DESCRIPTION,
      [localAccountHomeData]
    );

    const accountLabel = iban && getAccountLabel(iban);

    return (
      <TransactionWr
        isLast={isLast}
        isSingle={isSingle}
        number={number}
        lineColor={lineColor}
        circleFillColor={circleFillColor}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* transaction date and name */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Typography
              sx={{
                color: "contentPrimary.main",
                fontSize: "16px",
                fontWeight: "var(--fontRegular400)",
                position: "relative",
                top: "-3px",
                height: "20px",
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: "contentQuaternary.main",
                fontSize: "12px",
                fontWeight: "var(--fontRegular400)",
              }}
            >
              {formatDate(date + "", "MMMM dd, YYYY at HH:mm")}
            </Typography>
          </Box>
          {/* transaction amount */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                color: "contentMain.main",
                fontSize: "16px",
                fontWeight: "var(--fontSemiBold600)",
                textAlign: "right",
                width: "100px",
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxLines: 1,
              }}
            >
              {changedAmount} {currencySymbols?.[currency]}
            </Typography>
            <Typography
              sx={{
                color: "contentQuaternary.main",
                fontSize: "12px",
                fontWeight: "var(--fontRegular400)",
                textAlign: "right",
              }}
            >
              = {leftAmount} {currencySymbols?.[currency]}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          <TransactionBlock
            url={`https://wise.com/public-resources/assets/flags/rectangle/${currency?.toLowerCase()}.png`}
            accountLabel={
              accountLabel
                ? accountLabel
                : `${currency} ${getTranslatedText("Account")}`
            }
            iban={iban}
          />
        </Box>
      </TransactionWr>
    );
  }
);
