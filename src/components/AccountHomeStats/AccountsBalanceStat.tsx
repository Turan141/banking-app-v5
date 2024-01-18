import { useState } from "preact/hooks";
import { VerticalIndicator } from "../Reusable/VerticalBar";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getMaxValue } from "@/helpers/GetMaxValue";

const HEIGHT = "100px";

export const AccountsBalanceStat = ({ currencyStats }: any | null) => {
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    const newMaxValue = getMaxValue(currencyStats);
    console.log(newMaxValue);
    if (newMaxValue) setMaxValue(+newMaxValue > 0 ? +newMaxValue : 1);
  }, [currencyStats]);

  // const updateCurrencies = useCallback(async () => {
  //   try {
  //     const newCurrencies = await REQ_ACTIVE_ACCOUNT_STAT_DATA.request();
  //     if (!newCurrencies?.currencyStats) return;

  //     const newMaxValue = getMaxValue(newCurrencies.currencyStats);
  //     if (newMaxValue) setMaxValue(+newMaxValue > 0 ? +newMaxValue : 1);
  //     console.log(newCurrencies);
  //     setTabStats(newCurrencies);
  //   } catch (error) {
  //     console.error("Error fetching currencies:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   S_ACCOUNT_STAT_READY.subscribe(updateCurrencies, "AccountsBalanceStat");
  //   S_ACCOUNT_STAT_TAB_CHANGED.subscribe(
  //     updateCurrencies,
  //     "AccountsBalanceStat"
  //   );

  //   return () => {
  //     S_ACCOUNT_STAT_READY.unsubscribe("AccountsBalanceStat");
  //     S_ACCOUNT_STAT_READY.unsubscribe("AccountsBalanceStat");
  //   };
  // }, [updateCurrencies]);

  if (!currencyStats?.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        height: HEIGHT,
        overflow: "auto",
        position: "relative",
        pl: 2,
        pr: 2,
        "& > div": {
          flex: 1,
          display: "flex",
          height: "100%",
          justifyContent: "space-evenly",
          gap: "8px",
        },
      }}
    >
      <Box>
        {currencyStats.map((currency: IAccountVO) => (
          <Box key={currency.IBAN}>
            {currency.CONSOLIDATE_CURRENCY && currency.CONSOLIDATE_BALANCE && (
              <VerticalIndicator
                height={(+currency.CONSOLIDATE_BALANCE / maxValue) * 100}
                label={currency.CONSOLIDATE_CURRENCY}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
