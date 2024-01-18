export const TotalBalance = "Total Balance";

export enum Languages {
  English = "English",
  Russian = "Russian",
}


const CURRENT_LANG = Languages.English;

export const Translations: Record<Languages, Record<string, string>> = {
  [Languages.English]: {
    TotalBalance: "Total Balance",
    NoAvatar: "No Avatar",
    Deposit: "Deposit",
    Exchange: "Exchange",
    Request: "Request",
    Send: "Send",
    Chats: "Chats",
    P2P: "P2P",
    Bank: "Bank",
    Invest: "Invest",
    Cards: "Cards",
    OrderNewCard: "Order New Card",
    AddCard: "Add Card",
    PaymentCard: "Payment Card",
    BankTransfer: "Bank Transfer",
    Skrill: "Skrill",
    Neteller: "Neteller",
    InvestFromBlockchain: "Invest from Blockchain",
    ChatWithBank: "Chat with Bank",
    SendUsYourQuestion: "Send us your question",
    SeeAllTransactions: "See all transactions",
    TransactionsHistory: "Transactions History",
    Loading: "Loading...",
    COMPLETED: "Completed",
    DownloadStatements: "Download Statements",
    OperationDetails: "Operation Details",
    
    // Add other English translations here
  },
  [Languages.Russian]: {
    TotalBalance: "Общий Баланс",
    // Add other Russian translations here
  },
  // Add more languages with their respective translations here
};

export function getTranslatedText(wordKey: string): string {
  const translations = Translations[CURRENT_LANG as keyof typeof Translations];
  if (translations) {
    const translatedWord = translations[wordKey];
    if (translatedWord) return translatedWord;
  }

  // Default to English _OR_ !WORD itself!, if translation not found
  return Translations?.[Languages.English]?.[wordKey] ?? wordKey;
}