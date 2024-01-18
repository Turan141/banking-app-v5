import { Box, Divider, Typography } from "@mui/material";
import { S_PRESENT_SCREEN_ON_MAIN, Screens } from "@/Presenter";
import { getTranslatedText } from "@/Translations";
import { TransactionOperation } from "@/components/TransactionsHistory/TransactionOperation";
import { REQ_TRANSACTIONS_HISTORY } from "@/managers/TransactionManager";

export const TransactionsContainer = () => {
  const [transactionsOperationHistory] = REQ_TRANSACTIONS_HISTORY.useRequest(); // trigger fetch from db

  return (
    <Box sx={{ pt: 1 }}>
      {/* //todo change for limited resp */}
      {transactionsOperationHistory &&
        Object.entries(transactionsOperationHistory as any).map(
          ([key, value]) => {
            const timestamp = (new Date(key).getTime() / 1000).toString();
            return (
              <TransactionOperation
                date={timestamp}
                operation={value as ITransactionOperation[]}
              />
            );
          }
        )}

      <Divider />

      <Typography
        sx={{
          p: 2,
          color: "contentAccentBlue.main",
          textAlign: "center",
          fontWeight: "var(--fontSemiBold600)",
        }}
        onClick={() =>
          S_PRESENT_SCREEN_ON_MAIN.invoke({
            screen: Screens.TRANSACTION_HISTORY_SCREEN,
            animationDirection: "right",
          })
        }
      >
        {getTranslatedText("SeeAll")}
      </Typography>
    </Box>
  );
};
