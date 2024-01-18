import { getTranslatedText } from "@/Translations";
// import { TransactionBlock } from "../../TransactionDetailInfo/TransactionBlock";
// import { getColor } from "@/helpers/utils";
import { Box } from "@mui/material";
import { TransactionAccountItem } from "../TransactionAccountItem";

interface IAccountFilterProps {
  buttons?: IAccountVO[];
  onClick?: (value: string) => void;
  filterValues?: ITransactionFilterGroup | null;
}

export const AccountFilter = ({
  buttons,
  onClick,
  filterValues,
}: IAccountFilterProps) => {


  return (
    <>
      {buttons?.map((filterItem) => {
        const isActive = Object.values(filterValues ?? {}).includes(filterItem.IBAN);

        return (
          <Box onClick={() => onClick && onClick(filterItem.IBAN)}>
            <TransactionAccountItem
              key={filterItem.IBAN}
              url={`https://wise.com/public-resources/assets/flags/rectangle/${filterItem?.CURRENCY?.toLowerCase()}.png`}
              accountLabel={
                filterItem.DESCRIPTION
                  ? filterItem.DESCRIPTION
                  : `${filterItem?.CURRENCY} ${getTranslatedText("Account")}`
              }
              iban={filterItem?.IBAN}
              isActive={isActive}
            />
          </Box>
        );
      })}
    </>
  );
};
