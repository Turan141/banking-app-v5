// import { ReactNode } from "preact/compat";
import { Bank } from "../../../assets/icons/Bank";
import { Chat } from "../../../assets/icons/Chat";
import { Invest } from "../../../assets/icons/Invest";
import { P2P } from "../../../assets/icons/P2P";
import { Card } from "../../../assets/icons/Card";
import { getTranslatedText } from "@/Translations";

export interface IBottomMenu {
  icon?: any;
  title: string;
  id: string;
  selected?: boolean;
}

export const mocked_bottom_menu = [
  {
    icon: Chat,
    title: getTranslatedText("Chats"),
    id: "/chats",
    selected: false,
  },
  {
    icon: P2P,
    title: getTranslatedText("P2P"),
    id: "/p2p",
    selected: false,
  },
  {
    icon: Bank,
    title: getTranslatedText("Bank"),
    id: "/bank",
    selected: true,
  },
  {
    icon: Invest,
    title: getTranslatedText("Invest"),
    id: "/invest",
    selected: false,
  },
  {
    icon: Card,
    title: getTranslatedText("Cards"),
    id: "/cards",
    selected: false,
  },
];
