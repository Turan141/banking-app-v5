import { REQ_CURRENCY_SYMBOLS } from "@/managers/AccounHomeManager";
import { Box, Divider, Typography } from "@mui/material";
import TransactionInfo from "./TransactionDetailInfo/TransactionInfo";
import { MainContainer } from "@/components/Containers/MainContainer";
import { Loading } from "@/components/Reusable/Loading";
import { TransactionCategory } from "./TransactionDetailInfo/TransactionCategory";
import { TransactionDetailHeader } from "./TransactionDetailInfo/TransactionDetailHeader";
import { TransactionStatementDownload } from "./TransactionDetailInfo/TransactionStatementDownload";
import { getColor } from "@/helpers/utils";
import { getTranslatedText } from "@/Translations";
import { TransactionItemRow } from "./TransactionRows/TransactionItemRow";
import { REQ_TRANSACTION_DETAILS } from "@/managers/TransactionManager";

export const TransactionDetails = () => {
  const [transactionDetails] = REQ_TRANSACTION_DETAILS.useRequest();
  const [currencySymbols] = REQ_CURRENCY_SYMBOLS.useRequest();
  if (!transactionDetails) return <Loading />;

  console.log(transactionDetails);
  return (
    <Box>
      {/* Header */}
      <TransactionDetailHeader
        transactionDetails={transactionDetails}
        currencySymbols={currencySymbols}
        getColor={getColor}
        getTranslatedText={getTranslatedText}
      />

      {/* Containers */}
      <Box>
        {/* First Container */}
        <MainContainer>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            sx={{ pt: 2, pb: 2 }}
          >
            <TransactionCategory
              type={transactionDetails.data.TYPE}
              category={transactionDetails.data.TYPE}
            />
            <Divider sx={{ width: "100%", mt: 1.5, mb: 1 }} />
            <TransactionInfo
              description={transactionDetails.data.DESCRIPTION}
              message={transactionDetails.data.MESSAGE}
              reference={transactionDetails.data.UID}
              from={transactionDetails.data.FROM}
            />
            <Divider sx={{ width: "100%", mt: 1.5, mb: 1 }} />
            <TransactionStatementDownload />
          </Box>
        </MainContainer>

        {/* Second Container */}
        <MainContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "var(--fontSemiBold600)",
                color: "contentPrimary.main",
                mt: 2,
                mb: 2,
              }}
            >
              {getTranslatedText("Transactions")} (
              {transactionDetails.transactions.length})
            </Typography>
          </Box>

          <Box
            sx={{
              height: "100%",
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            {transactionDetails.transactions.map((transaction, index) => {
              return (
                <TransactionItemRow
                  key={index}
                  title={transaction.TYPE}
                  date={transactionDetails.data.CREATED_TS}
                  changedAmount={transaction.AMOUNT}
                  leftAmount={transaction.BALANCE}
                  currency={transaction.CURRENCY}
                  isLast={index === transactionDetails.transactions.length - 1}
                  isSingle={transactionDetails.transactions.length === 1}
                  number={transactionDetails.transactions.length - index}
                  iban={transaction.IBAN}
                />
              );
            })}
          </Box>
        </MainContainer>
      </Box>
    </Box>
  );
};
