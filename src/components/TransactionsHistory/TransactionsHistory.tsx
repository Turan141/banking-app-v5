import { Box } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { Loading } from "@/components/Reusable/Loading";
import { TransactionOperation } from "./TransactionOperation";
import {
  REQ_TRANSACTIONS_HISTORY,
  S_TRANSACTION_FILTERS_APPLY,
  S_TRANSACTION_FILTERS_RESET,
} from "@/managers/TransactionManager";
import { TransactionMainFilter } from "./TransactionFilters/TransactionMainFilter";
import { SignalHandler } from "badmfck-signal";

export const TransactionsHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsOperationHistory, updateTransactionOperationHistory] =
    REQ_TRANSACTIONS_HISTORY.useRequest(() => setIsLoading(false)); // trigger fetch from db

    console.log(transactionsOperationHistory)

  useEffect(() => {
    const sh = new SignalHandler();
    sh.add(S_TRANSACTION_FILTERS_APPLY, (packet) => updateTransactionOperationHistory(packet.filters));
    sh.add(S_TRANSACTION_FILTERS_RESET, () => updateTransactionOperationHistory(null));
    return () => sh.clear();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Box
      sx={{
        backgroundColor: "backgroundDefault.main",
        width: "100%",
        height: '100%',
        pl: 2,
        pr: 2,
      }}
    >
      <TransactionMainFilter />

      {Object.entries(
        transactionsOperationHistory as ITransactionOperation[]
      )?.map(([key, value]) => {
        const timestamp = (new Date(key).getTime() / 1000).toString();
        return (
          <TransactionOperation
            key={key}
            date={timestamp}
            operation={value as ITransactionOperation}
            stickyDate
          />
        );
      })}
    </Box>
  );
};
