import { getTranslatedText } from "@/Translations";
import RoundedButton from "@/components/Reusable/RoundedButton";
import { getColor } from "@/helpers/utils";
import { Box } from "@mui/material";

interface RoundedBtnFilterProps {
  buttons?: string[];
  onClick?: (value: string) => void;
  filterValues?: ITransactionFilterGroup | null;
}

export const RoundedBtnFilter = ({
  buttons,
  filterValues,
  onClick,
}: RoundedBtnFilterProps) => {
  // todo somehow remove and make correct on parent?
  if (!buttons?.every((item) => typeof item === "string")) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "12px",
        justifyContent: "start",
        alignItems: "start",
        flexWrap: "wrap",
      }}
    >
      {Object.values(buttons ?? {}).map((filterItem) => {
        const isActive = Object.values(filterValues ?? {}).includes(filterItem);
        return (
          <RoundedButton
            key={filterItem}
            onClick={() => onClick && onClick(filterItem)}
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
            customStyles={{ fontWeight: "--fontRegular400" }}
          >
            {getTranslatedText(filterItem)}
          </RoundedButton>
        );
      })}
    </Box>
  );
};
