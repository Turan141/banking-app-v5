import { Box } from "@mui/material";
import { HorizontalButtonsRow } from "@/components/Buttons/HorizontalButtonsRow";
import { currencyButtonsRow } from "@/components/Buttons/ButtonLayouts/AccountScreenButtonRows";
import { useTabUpdater } from "@/hooks/useTabUpdater";
import List from "@/components/Reusable/List";

export const StatsContainer = () => {
  const { activeTabData } = useTabUpdater();

  return (
    <Box>
      <HorizontalButtonsRow buttons={currencyButtonsRow} />
      <List
        type="accountStat"
        items={activeTabData?.currencyStats as IAccountVO[]}
      />
    </Box>
  );
};
