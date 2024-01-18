import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatDate } from '@/helpers/DateTimeFormats';
import RoundedButton from '@/components/Reusable/RoundedButton';

interface TransactionDetailHeaderProps {
  transactionDetails: any; 
  currencySymbols: any; 
  getColor: (status: string) => string; 
  getTranslatedText: (text: string) => string; 
}

export const TransactionDetailHeader: React.FC<TransactionDetailHeaderProps> = ({
  transactionDetails,
  currencySymbols,
  getColor,
  getTranslatedText,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
        pb: 3,
        backgroundColor: "backgroundBottom.main",
      }}
    >
      <Typography
        sx={{
          color: "contentPrimary.main",
          fontWeight: "var(--fontSemiBold600)",
          fontSize: "16px",
        }}
      >
        {transactionDetails?.data.TITLE}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "var(--fontRegular400)",
          color: "contentQuaternary.main",
        }}
      >
        {formatDate(
          transactionDetails?.data.CREATED_TS + "",
          "MMMM dd, YYYY at HH:mm"
        )}
      </Typography>
      <Typography
        sx={{
          color: "contentPrimary.main",
          fontWeight: "var(--fontMedium500)",
          fontSize: "24px",
          pt: 2,
          pb: 2,
        }}
      >
        {transactionDetails?.data.AMOUNT}{' '}
        {currencySymbols?.[transactionDetails.data.CURRENCY]}
      </Typography>
      <RoundedButton
        mainColor={getColor(transactionDetails?.data.STATUS + "")}
        textColor={getColor(transactionDetails?.data.STATUS + "")}
        bordered={true}
        filled={false}
        customStyles={{ fontWeight: "var(--fontSemiBold600)" }}
      >
        {getTranslatedText(transactionDetails.data.STATUS)}
      </RoundedButton>
    </Box>
  );
};