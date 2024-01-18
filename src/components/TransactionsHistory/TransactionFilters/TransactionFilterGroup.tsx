import React from 'react';
import { Box, Typography } from "@mui/material";
import { getTranslatedText } from "@/Translations";
import { RoundedBtnFilter } from "./FilterItemVariations/RoundedBtnFilter";
import { AccountFilter } from "./FilterItemVariations/AccountFilter";
import { TransactionFiltersCloseBtn } from "@/components/Buttons/ButtonVariations/TransactionFiltersBtns";
import Calendar from "./FilterItemVariations/CalendarFilter";

interface TransactionFilterGroupProps {
  title?: string;
  buttons?: string[] | IAccountVO[];
  onClick?: (value: string) => void;
  filterValues?: ITransactionFilterGroup | null;
}

const renderFilterValues = (
  title: string | undefined,
  buttons: string[] | IAccountVO[] | undefined,
  onClick: ((value: string) => void) | undefined,
  filterValues: ITransactionFilterGroup | null | undefined
): React.ReactNode | null => {
  switch (title) {
    case "TYPE":
    case "STATUS":
      return (
        <RoundedBtnFilter
          buttons={buttons as string[]}
          onClick={onClick}
          filterValues={filterValues}
        />
      );
    case "ACCOUNT":
      return (
        <AccountFilter
          buttons={buttons as IAccountVO[]}
          onClick={onClick}
          filterValues={filterValues}
        />
      );
    case "DATE":
      return <Calendar onDateSelect={onClick}/>;
    default:
      return null;
  }
};

export const TransactionFilterGroup: React.FC<TransactionFilterGroupProps> = ({
  title,
  buttons,
  onClick,
  filterValues,
}: TransactionFilterGroupProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "backgroundDefault.main",
        gap: "32px",
        padding: "24px 16px 16px 16px",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
      }}
    >
      <Typography
        sx={{
          color: "contentPrimary.main",
          fontSize: "20px",
          fontWeight: "var(--fontSemiBold600)",
        }}
      >
        {getTranslatedText(title ?? "")}
      </Typography>
      <Box sx={{ maxHeight: "370px", overflowY: "auto" }}>
        {renderFilterValues(title, buttons, onClick, filterValues)}
      </Box>
      <TransactionFiltersCloseBtn />
    </Box>
  );
};

