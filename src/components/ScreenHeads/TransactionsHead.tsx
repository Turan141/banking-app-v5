import { Box, Typography } from "@mui/material";
import { Burger } from "../../assets/icons/Burger";
import { GD } from "../../GD";
import { getTranslatedText } from "@/Translations";
import {
  REQ_TRANSACTION_FILTERS_INFORM_STATUS,
  S_TRANSACTION_FILTERS_INFORM_STATUS,
  S_TRANSACTION_FILTERS_RESET,
} from "@/managers/TransactionManager";
import { SignalHandler } from "badmfck-signal";
import { useEffect } from "preact/hooks";

interface ITransactionsHeadProps {
  title?: string;
}

export const TransactionsHead: React.FC<ITransactionsHeadProps> = ({
  title = getTranslatedText(""),
}) => {
  const [filterStatus, updateFilterStatus] =  REQ_TRANSACTION_FILTERS_INFORM_STATUS.useRequest();

  useEffect(() => {
    const sh = new SignalHandler();
    sh.add(S_TRANSACTION_FILTERS_INFORM_STATUS, (packet) => updateFilterStatus(packet));

    return () => sh.clear();
  }, []);


  return (
    <Box
      sx={{
        backgroundColor: "backgroundDefault.main",
        color: "headerText.main",
        display: "flex",
        paddingTop: "var(--iosSafeTopArea)",
        pl: 2,
        pr: 2,
        pt: 2,
        pb: 2,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "max-content 1fr max-content",
        }}
      >
        <Box
          onClick={() => {
            GD.S_MAIN_BURGER_CLICK.invoke();
          }}
          display="flex"
          alignItems="center"
        >
          <Burger />
        </Box>
        <Typography
          sx={{
            color: "contentPrimary.main",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "-0.4px",
            textAlign: "left",
            marginLeft: 2,
          }}
          variant="h6"
        >
          {getTranslatedText(title)}
        </Typography>
      </Box>
      {filterStatus?.isFiltersApplied &&
        !filterStatus?.isfiltersReadyToSend && (
          <Box display="flex" alignItems="center">
            <Typography
            onClick={() => S_TRANSACTION_FILTERS_RESET.invoke()}
              sx={{
                fontSize: "14px",
                color: "backgroundAvatarBackgroundAvatarRed.main",
              }}
            >
              Reset filters
            </Typography>
          </Box>
        )}
    </Box>
  );
};