import { getTranslatedText } from "@/Translations";

export const transactionFilterSwitchersButtons = [
  {
    onClick: () => {
      // S_PRESENT_SCREEN_ON_MAIN.invoke({
      //   screen: Screens.DEPOSIT_SCREEN,
      //   animationDirection: "right",
      // });
    },
    title: getTranslatedText("TYPE"),
    id: "TYPE",
  },
  {
    onClick: () => {
      // S_PRESENT_SCREEN_ON_MAIN.invoke({
      //   screen: Screens.ACCOUNT_HOME,
      //   animationDirection: "right",
      // });
    },
    title: getTranslatedText("STATUS"),
    id: "STATUS",
  },
  {
    onClick: () => {
      // S_PRESENT_SCREEN_ON_MAIN.invoke({
      //   screen: Screens.REQUEST_MONEY_SCREEN,
      //   animationDirection: "right",
      // });
    },
    title: getTranslatedText("ACCOUNT"),
    id: "ACCOUNT",
  },
  {
    onClick: () => {
      // S_AUTH_STATUS_DEBUG.invoke(AuthStatus.UNAUTHORIZED);
    },
    title: getTranslatedText("DATE"),
    id: "DATE",
  },
];

export enum TransactionFilterCategoryType {
  WITHDRAWAL = "WITHDRAWAL",
  INTERNAL_TRANSFER = "INTERNAL_TRANSFER",
  INCOMING_TRANSFER = "INCOMING_TRANSFER",
  OUTGOING_TRANSFER = "OUTGOING_TRANSFER",
  MERCHANT_TRANSFER = "MERCHANT_TRANSFER",
  DEPOSIT = "DEPOSIT",
  ORDER_OF_PREPAID_CARD = "ORDER_OF_PREPAID_CARD",
  INVESTMENT = "INVESTMENT",
  COIN_TRADE = "COIN_TRADE",
  TERM_DEPOSIT = "TERM_DEPOSIT",
  COMISSION_CHARGE = "COMISSION_CHARGE",
  PARTNER_ACCOUNT_TRANSFER = "PARTNER_ACCOUNT_TRANSFER",
  PARTNER_CRYPTO_TRADE = "PARTNER_CRYPTO_TRADE",
  SAVINGS_TRANSFER = "SAVINGS_TRANSFER",
}

export enum TransactionFilterCategoryStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}


export const transactionFilterCategoryAccounts = [

];
