// declare type TransactionOperations =
//   | "WITHDRAWAL"
//   | "INTERNAL_TRANSFER"
//   | "INCOMING_TRANSFER"
//   | "OUTGOING_TRANSFER"
//   | "MERCHANT_TRANSFER"
//   | "DEPOSIT"
//   | "ORDER_OF_PREPAID_CARD"
//   | "INVESTMENT"
//   | "COIN_TRADE"
//   | "TERM_DEPOSIT"
//   | "COMISSION_CHARGE"
//   | "PARTNER_ACCOUNT_TRANSFER"
//   | "PARTNER_CRYPTO_TRADE"
//   | "SAVINGS_TRANSFER";

// declare type TransactionTypes = "STATUS" | "ACCOUNT" | "DATE" | "TYPE";


declare interface ITransactionItem {
  TRANSACTION_ID: string;
  TS: string;
  TYPE:
    | "WITHDRAWAL"
    | "INTERNAL_TRANSFER"
    | "INCOMING_TRANSFER"
    | "OUTGOING_TRANSFER"
    | "MERCHANT_TRANSFER"
    | "DEPOSIT"
    | "ORDER_OF_PREPAID_CARD"
    | "INVESTMENT"
    | "COIN_TRADE"
    | "TERM_DEPOSIT"
    | "COMISSION_CHARGE"
    | "PARTNER_ACCOUNT_TRANSFER"
    | "PARTNER_CRYPTO_TRADE"
    | "SAVINGS_TRANSFER";
  ACCOUNT_NUMBER: string;
  AMOUNT: string;
  CURRENCY: string;
  BALANCE: string;
  ORIG_AMOUNT: string;
  ORIG_CURRENCY: string;
  PARENT_REF: string;
  PARENT_ID: string;
  RATE_DETAILS: string;
  MESSAGE: string;
  IBAN: string;
  DESCRIPTION: string;
}

declare interface ITransactionOperation {
  TRANSACTION_ID: string;
  CREATED_TS: string;
  UPDATED_TS: string;
  TYPE:
    | "WITHDRAWAL"
    | "INTERNAL TRANSFER"
    | "INCOMING TRANSFER"
    | "OUTGOING TRANSFER"
    | "MERCHANT TRANSFER"
    | "DEPOSIT"
    | "ORDER OF PREPAID CARD"
    | "INVESTMENT"
    | "COIN TRADE"
    | "TERM DEPOSIT"
    | "COMISSION CHARGE"
    | "PARTNER ACCOUNT TRANSFER"
    | "PARTNER CRYPTO TRADE"
    | "SAVINGS TRANSFER";
  TITLE: string;
  AMOUNT: string;
  CURRENCY: string;
  UID: string;
  STATUS: string;
  MESSAGE: string | null;
  DESCRIPTION: string;
  TO: string | null;
  CODE_SECURED: boolean;
  FEE_AMOUNT: string;
  FEE_CURRENCY: string;
  FROM: string;
  CUSTOM_DATA: string | null;
  PDF: boolean;
}

declare interface TransactionsHistoryItem {
  data: ITransactionOperation;
  transactions: ITransactionItem[];
}

declare interface IFilterData {
  TYPE: TransactionFilterCategoryType[];
  STATUS: TransactionFilterCategoryStatus[];
  ACCOUNT: any[]; // todo specify type for ACCOUNT
  [key: string]: string[]; // index signature allowing any string key
}

declare interface ITransactionFilterGroup {
  TYPE: string | null;
  STATUS: string | null;
  DATE: string | null;
  ACCOUNT: any | null;
}