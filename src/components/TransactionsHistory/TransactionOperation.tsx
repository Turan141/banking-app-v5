import { formatDate } from "@/helpers/DateTimeFormats";
import { Box, Typography } from "@mui/material";
import List from "../Reusable/List";
import { S_PRESENT_SCREEN_ON_MAIN, Screens } from "@/Presenter";

export const TransactionOperation = ({
  date,
  operation,
  stickyDate = false
}: {
  date: string;
  operation: ITransactionOperation[] | ITransactionOperation;
  stickyDate?: boolean;
}) => {

  const onTransactionOperationClick = (item: ITransactionItem) => {
    
    S_PRESENT_SCREEN_ON_MAIN.invoke({
      screen: Screens.TRANSACTION_ITEM_SCREEN,
      animationDirection: "right",
    });

    console.log(item);
  };

  return (
    <Box style={{ position: "relative" }}>
      <Typography
        sx={{
          position: stickyDate ? "sticky" : "initial",
          top: 0,
          backgroundColor: "backgroundDefault.main",
          padding: "8px",
          zIndex: 1,
          fontSize: "14px",
          fontWeight: "var(--fontRegular400)",
          color: "contentQuaternary.main",
        }}
      >
        {formatDate(date, "MM dd, YYYY")}
      </Typography>

      <List
        type="transaction"
        items={operation as ITransactionOperation[]}
        onItemClick={onTransactionOperationClick}
      />
    </Box>
  );
};
