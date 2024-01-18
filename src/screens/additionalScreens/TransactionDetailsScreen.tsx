import { getTranslatedText } from "@/Translations";
import { BaseScreen } from "@/screens/bases/BaseScreen";
import { AccountHead } from "@/components/ScreenHeads/AccountHead";
import { BottomMenu } from "@/components/BottomMenu";
import { TransactionDetails } from "@/components/TransactionsHistory/TransactionDetails";

export const TransactionDetailsScreen = () => {
  return (
    <BaseScreen
      head={<AccountHead title={getTranslatedText("OperationDetails")} />}
      bottom={<BottomMenu />}
    >
      <TransactionDetails />
    </BaseScreen>
  );
};
