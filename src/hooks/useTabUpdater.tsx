import { useCallback, useEffect, useState } from "react";
import {
  REQ_ACTIVE_ACCOUNT_STAT_DATA,
  REQ_ACCOUNT_STATS,
  S_ACCOUNT_STAT_READY,
  S_ACCOUNT_STAT_TAB_CHANGED,
  IStatsTabs,
} from "@/managers/AccounHomeManager";

export const useTabUpdater = ({
  onTabUpdate,
}: { onTabUpdate?: (tab: keyof IStatsTabs) => void } = {}) => {
  const [tabData, setTabData] = useState<{
    activeTabData: IStatObject | null;
    totalTabsData: IStatObject[] | null;
  }>({
    activeTabData: null,
    totalTabsData: null,
  });

  const updateCurrencies = useCallback(async () => {
    try {
      const [currentTabStats, totalTabsStats] = await Promise.all([
        REQ_ACTIVE_ACCOUNT_STAT_DATA.request(),
        REQ_ACCOUNT_STATS.request(),
      ]);

      if (!currentTabStats?.currencyStats) return;

      setTabData({
        activeTabData: currentTabStats,
        totalTabsData: totalTabsStats,
      });

      if (onTabUpdate) onTabUpdate(currentTabStats.type as keyof IStatsTabs);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  }, [onTabUpdate]);

  // Listen for tab change and update
  useEffect(() => {
    S_ACCOUNT_STAT_READY.subscribe(updateCurrencies, "AccountsBalanceStatHook");
    S_ACCOUNT_STAT_TAB_CHANGED.subscribe(
      updateCurrencies,
      "AccountsBalanceStatHook"
    );

    return () => {
      S_ACCOUNT_STAT_READY.unsubscribe("AccountsBalanceStatHook");
      S_ACCOUNT_STAT_READY.unsubscribe("AccountsBalanceStatHook");
    };
  }, [updateCurrencies]);

  // Immidately get values from manager on remount of component
  useEffect(() => {
    updateCurrencies(); // Fetch initial data
  }, [updateCurrencies]);

  return {
    activeTabData: tabData.activeTabData,
    totalTabsData: tabData.totalTabsData,
  };
};
