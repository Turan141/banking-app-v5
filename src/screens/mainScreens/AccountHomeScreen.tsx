import { useState } from "preact/hooks";
import { Box } from "@mui/material";
import { BaseScreen } from "@/screens/bases/BaseScreen";
import {
  IStatsTabs,
  REQ_ACCOUNT_HOME_DATA,
  StatsToRender,
} from "@/managers/AccounHomeManager";
import { AccountHead } from "@/components/ScreenHeads/AccountHead";
import { MainContainer } from "@/components/Containers/MainContainer";
import { BottomMenu } from "@/components/BottomMenu";
import { Loading } from "@/components/Reusable/Loading";
import { StatsContainer } from "@/components/Containers/AccountScreenContainers/StatsContainer";
import { DukascoinContainer } from "@/components/Containers/AccountScreenContainers/DukascoinContainer";
import { TransactionsContainer } from "@/components/Containers/AccountScreenContainers/TransactionsContainer";
import AccountHomeStats from "@/components/AccountHomeStats";
import { getTranslatedText } from "@/Translations";

export const AccountHomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<keyof IStatsTabs | null>(null);
  REQ_ACCOUNT_HOME_DATA.useRequest(() => setIsLoading(false)); // fetch from db

  if (isLoading) return <Loading />;

  return (
    <BaseScreen
      head={<AccountHead title={getTranslatedText("Bank")} />}
      bottom={<BottomMenu />}
    >
      <Box
        sx={{
          backgroundColor: "backgroundBottom.main",
        }}
      >
        <Box sx={{ pt: 1, pb: 1, display: "flex", flexDirection: "column" }}>
          <AccountHomeStats onTabChange={setCurrentTab} />
        </Box>

        <MainContainer shouldShow={!!currentTab}>
          <StatsContainer />
        </MainContainer>

        <MainContainer
          shouldShow={currentTab === StatsToRender.ACCOUNT}
          title={getTranslatedText("Dukascoin")}
        >
          <DukascoinContainer />
        </MainContainer>

        <MainContainer
          shouldShow={currentTab === StatsToRender.ACCOUNT}
          title={getTranslatedText("Latest Transactions")}
        >
          <TransactionsContainer />
        </MainContainer>
      </Box>
    </BaseScreen>
  );
};
