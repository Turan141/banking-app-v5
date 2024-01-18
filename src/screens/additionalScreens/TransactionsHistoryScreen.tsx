import { getTranslatedText } from "@/Translations";
import { BaseScreen } from "../bases/BaseScreen";
import { BottomMenu } from "@/components/BottomMenu";
import { TransactionsHistory } from "@/components/TransactionsHistory/TransactionsHistory";
import { TransactionsHead } from "@/components/ScreenHeads/TransactionsHead";

export const TransactionsHistoryScreen = () => {
  return (
    <BaseScreen
      head={<TransactionsHead title={getTranslatedText("Transactions")} />}
      bottom={<BottomMenu />}
    >
      <TransactionsHistory />
    </BaseScreen>
  );
};
