import { getTranslatedText } from "@/Translations";
import { transactionFilterSwitchersButtons } from "@/components/Buttons/ButtonLayouts/TransactionFilterSwitchersButtons";
import RoundedButton from "@/components/Reusable/RoundedButton";
import { getColor } from "@/helpers/utils";
import {
  S_TRANSACTION_FILTERS_RESET,
  S_TRANSACTION_NEW_SWITCHER_LABEL,
} from "@/managers/TransactionManager";
import { Box, Typography } from "@mui/material";
import { SignalHandler } from "badmfck-signal";
import { useEffect, useState } from "preact/hooks";

const TransactionFilterCategoryItem = ({
  item,
  onClick,
  isActive,
}: {
  item?: any;
  onClick?: (value: string) => void;
  isActive?: boolean;
}) => {
  const [newLabelData, setNewLabelData] = useState<{
    group: string | null;
    label: string;
  } | null>();

  useEffect(() => {
    const sh = new SignalHandler();

    sh.add(S_TRANSACTION_NEW_SWITCHER_LABEL, (packet) => {
      if (item.id === packet.group) setNewLabelData(packet);
    });
    sh.add(S_TRANSACTION_FILTERS_RESET, () => {
      setNewLabelData(null);
    });

    return () => sh.clear();
  }, []);

  return (
    <RoundedButton
      key={item.id}
      mainColor={
        isActive
          ? getColor("TRANSACTION_HISTORY_ROUNDED_BTN_ACTIVE")
          : getColor("TRANSACTION_HISTORY_ROUNDED_BTN_INACTIVE")
      }
      textColor={
        isActive
          ? getColor("TRANSACTION_HISTORY_ROUNDED_BTN_TEXT_ACTIVE")
          : getColor("TRANSACTION_HISTORY_ROUNDED_BTN_TEXT_INACTIVE")
      }
      bordered={false}
      filled
      onClick={() => onClick && onClick(item.title)}
      customStyles={{ fontWeight: "--fontRegular400" }}
    >
      <Typography sx={{ fontSize: "14px", width: 'maxContent', whiteSpace: 'nowrap' }}>
        {getTranslatedText(newLabelData?.label ? newLabelData.label : item.id)}
      </Typography>
    </RoundedButton>
  );
};

export const TransactionFiltersCategory = ({
  onClick,
  activeFilterGroup,
  filterValues,
}: {
  onClick?: (value: string) => void;
  activeFilterGroup: string | null;
  filterValues?: ITransactionFilterGroup | null;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        mb: 2,
        pt: 1,
        pb: 1,
        overflowX: "auto",
      }}
    >
      {transactionFilterSwitchersButtons.map((item) => {
        const isActive =
          item.title === activeFilterGroup ||
          Object.entries(filterValues ?? {}).some(
            ([title, value]) => value && title === item.title
          );

        return (
          <TransactionFilterCategoryItem
            key={item.id}
            isActive={isActive}
            item={item}
            onClick={onClick}
          />
        );
      })}
    </Box>
  );
};
