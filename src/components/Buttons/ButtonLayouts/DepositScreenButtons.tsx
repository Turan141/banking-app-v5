import { getTranslatedText } from "@/Translations";
import { Bank } from "@/assets/icons/Bank";
import { CardOutline } from "@/assets/icons/CardOutline";
import { InvestBlockchain } from "@/assets/icons/InvestBlockchain";
import { Neteller } from "@/assets/icons/Neteller";
import { Skrill } from "@/assets/icons/Skrill";

interface ButtonData {
  icon: JSX.Element;
  name: string;
}

// export const depositScreenButtons: ButtonData[] = [
//   { icon: <PaymentCard />, title: getTranslatedText("Payment Card") },
//   { icon: <BankTransfer />, title: getTranslatedText("Bank Transfer") },
//   { icon: <Skrill />, title: getTranslatedText("Skrill") },
//   { icon: <Neteller />, title: getTranslatedText("Neteller") },
//   {
//     icon: <InvestBlockchain />,
//     title: getTranslatedText("Invest from Blockchain"),
//   },
// ];

export const depositScreenButtons: ButtonData[] = [
  { icon: <CardOutline />, name: getTranslatedText("Payment Card") },
  { icon: <Bank />, name: getTranslatedText("Bank Transfer") },
  { icon: <Skrill />, name: getTranslatedText("Skrill") },
  { icon: <Neteller />, name: getTranslatedText("Neteller") },
  { icon: <InvestBlockchain />, name: getTranslatedText("InvestBlockchain") },
];
