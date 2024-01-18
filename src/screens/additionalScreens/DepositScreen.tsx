import { FC } from "react";
import { Deposit } from "@/components/Deposit";
import { AccountHead } from "@/components/ScreenHeads/AccountHead";
import { BottomMenu } from "@/components/BottomMenu";
import { BaseScreen } from "@/screens/bases/BaseScreen";

export const DepositScreen: FC = () => {
  return (
    <BaseScreen head={<AccountHead title="Deposit" />} bottom={<BottomMenu />}>
      <Deposit />
    </BaseScreen>
  );
};
