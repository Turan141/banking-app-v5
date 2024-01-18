import { useTabUpdater } from "@/hooks/useTabUpdater";
import { AccountsBalanceStat } from "./AccountsBalanceStat";
import { AccountStats } from "./AccountStats";

interface IProps {
  onTabChange: any;
}

export const AccountHomeStats = ({ onTabChange }: IProps) => {
  const { activeTabData, totalTabsData } = useTabUpdater({ onTabUpdate: onTabChange });

  return (
    <>
      {/* scrollable cards */}
      <AccountStats accountStats={totalTabsData} />
      {/* verticalbars */}
      <AccountsBalanceStat currencyStats={activeTabData?.currencyStats} />
    </>
  );
};
