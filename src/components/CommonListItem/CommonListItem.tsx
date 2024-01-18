import { Box, ButtonBase, Typography, styled } from "@mui/material";
import { CustomAvatar } from "../Avatars/CustomAvatar";
import { Dukascoin } from "../../assets/icons/Dukascoin";
import { BalanceSection } from "./Sections/BalanceSection";
import { TransactionSection } from "./Sections/TransactionSection";
import { currencySymbols } from "../../helpers/CurrencySymbols";
import { useCallback } from "preact/hooks";
import { TransactionIcons } from "@/components/Reusable/TransactionIcons";

interface ListItemProps<T> {
  value: T;
  type: "accountStat" | "dukascoins" | "transaction";
  avatar?: React.ReactNode;
  onItemClick?: (item: T) => void;
}

export const TransactionIconDiv = styled(ButtonBase)(({ theme }) => ({
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  //@ts-ignore
  backgroundColor: [theme.palette.backgroundNeutralIconTransaction.main],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& svg g path": {
    //@ts-ignore
    fill: [theme.palette.contentPrimary.main],
  },
}));

export const CommonListItem = <T,>({ value, type, onItemClick }: ListItemProps<T>) => {
  const getItemTitle = useCallback(() => {
    switch (type) {
      case "accountStat":
        return (
          (value as IAccountVO).PARTNER_NAME ||
          (value as IAccountVO).DESCRIPTION ||
          (value as IAccountVO).CURRENCY + " Account"
        );
      case "dukascoins":
        return "Dukascoins Balance";
      case "transaction":
        // normalize uppercases
        return (
          (value as ITransactionOperation).TYPE.toLowerCase().replace(
            /\b\w/g,
            (char) => char.toUpperCase()
          ) || ""
        );
      default:
        return "";
    }
  }, [type, value]);

  const getItemSymbol = useCallback(
    (consolidate: boolean = false) => {
      switch (type) {
        case "accountStat":
        case "transaction":
          const symbol = consolidate
            ? currencySymbols?.[
                (value as IAccountVO).CONSOLIDATE_CURRENCY || ""
              ]
            : currencySymbols?.[(value as IAccountVO).CURRENCY || ""];

          return symbol || "--";

        case "dukascoins":
          return "DUK+";
        default:
          return "";
      }
    },
    [type, value, currencySymbols]
  );

  const getItemAmount = useCallback(
    (value: IAccountVO) =>
      (value as IAccountVO).CONSOLIDATE_BALANCE
        ? (value as IAccountVO).CONSOLIDATE_BALANCE?.toString() || "--"
        : (value as IAccountVO).BALANCE.toString(),
    [type, value]
  );

  const getAvatar = useCallback(() => {
    switch (type) {
      case "accountStat":
        return (
          <CustomAvatar
            alt="avatar"
            size={32}
            src={`https://wise.com/public-resources/assets/flags/rectangle/${(
              value as IAccountVO
            )?.CURRENCY?.toLowerCase()}.png`}
          />
        );
      case "dukascoins":
        return <CustomAvatar svg={<Dukascoin />} alt="avatar" size={32} />;
      case "transaction":
        return (
          <TransactionIconDiv>
            <TransactionIcons type={(value as ITransactionOperation).TYPE} />
          </TransactionIconDiv>
        );

      default:
        return null;
    }
  }, [type, value]);

  return (
    <Box
      sx={{
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        gap: "16px",
        minHeight: "64px",
        pl: 1,
        pr: 1,
      }}
      onClick={() => onItemClick && onItemClick(value)}
    >
      <Box>{getAvatar()}</Box>
      <Box
        sx={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          display: "flex",
          gap: 2,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxLines: 2,
              color: "contentPrimary.main",
              lineHeight: "20px",
              fontWeight: "var(--fontRegular400)",
            }}
          >
            {getItemTitle()}
          </Typography>

          {type === "transaction" && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "contentQuaternary.main",
                width: "100%",
                display: "inline-block",
                verticalAlign: "top",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {(value as ITransactionOperation).DESCRIPTION}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            alignItems: "flex-end",
            marginLeft: "auto",
            flexDirection: "column",
          }}
        >
          {type === "transaction" ? (
            <TransactionSection
              value={value as ITransactionOperation}
              getItemSymbol={getItemSymbol}
            />
          ) : (
            <BalanceSection
              value={value as IAccountVO}
              getItemSymbol={getItemSymbol}
              getItemAmount={getItemAmount}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
