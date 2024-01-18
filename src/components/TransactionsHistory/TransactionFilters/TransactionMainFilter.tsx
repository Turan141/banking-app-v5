import { useCallback, useEffect } from "preact/hooks";
import { SignalHandler } from "badmfck-signal";
import { Box } from "@mui/material";
import {
  REQ_CURRENT_TRANSACTION_FILTERS,
  REQ_TRANSACTION_FILTERS_INFORM_STATUS,
  REQ_TRANSACTION_FILTERS_LIST,
  S_TRANSACTION_FILTERS_CLOSE,
  S_TRANSACTION_FILTERS_INFORM_STATUS,
  S_TRANSACTION_FILTERS_RESET,
  S_TRANSACTION_FILTERS_TOGGLE,
  S_TRANSACTION_FILTER_GROUP_SELECT,
  S_TRANSACTION_FILTER_GROUP_SELECTED,
} from "@/managers/TransactionManager";
import { REQ_ACCOUNT_HOME_DATA } from "@/managers/AccounHomeManager";
import { TransactionApplyButtons } from "@/components/Buttons/ButtonVariations/TransactionFiltersBtns";
import { PortalContainer } from "@/components/Containers/PortalContainer";
import { TransactionFiltersCategory } from "./TransactionFiltersCategory";
import { TransactionFilterGroup } from "./TransactionFilterGroup";

export const TransactionMainFilter = () => {
  const [filterStatus, updateFilterStatus] = REQ_TRANSACTION_FILTERS_INFORM_STATUS.useRequest();
  const [filterValues, toggleFilterValue, resetFilterValues] = REQ_CURRENT_TRANSACTION_FILTERS.useRequest(); // Получаем выбранное значение и метод для смены значения
  const filterToggleStatus = S_TRANSACTION_FILTERS_TOGGLE.use([])
  const activeFilterGroup = S_TRANSACTION_FILTER_GROUP_SELECTED.use([]); // Получаем название открытой группы фильтров
  const filterList = REQ_TRANSACTION_FILTERS_LIST.use(activeFilterGroup ?? "", [activeFilterGroup]); // Получаем список фильтров для данной группы

    //@ts-ignore
  const [accountHomeData] = REQ_ACCOUNT_HOME_DATA.useRequest(); // todo remove, need to directly fetch from history

  
  useEffect(() => {
    const sh = new SignalHandler();

    sh.add(S_TRANSACTION_FILTERS_RESET, () => {
      resetFilterValues({
        TYPE: null,
        STATUS: null,
        DATE: null,
        ACCOUNT: null,
      });
    });

    sh.add(S_TRANSACTION_FILTERS_INFORM_STATUS, (packet) => {
      updateFilterStatus(packet);
    });

    return () => sh.clear();
  }, []);

  const updateFilterValue = useCallback((value: string | null) => {
    toggleFilterValue(value); // куда передается value после повторного нажатия на тот же элемент???
  }, [toggleFilterValue]);

  const shouldShowApplyBtn = !filterStatus?.isFiltersApplied && filterStatus?.isfiltersReadyToSend 

  return (
    <Box>
      <TransactionFiltersCategory
        activeFilterGroup={activeFilterGroup}
        filterValues={filterValues}
        onClick={(filterGroup) =>
          S_TRANSACTION_FILTER_GROUP_SELECT.invoke(filterGroup)
        }
      />

      {filterToggleStatus === 'open' && (
        <PortalContainer
          onClose={() => S_TRANSACTION_FILTERS_CLOSE.invoke()}
          darken
          styles={{
            // padding: "12px 16px",
            position: "absolute",
            bottom: "0px",
            zIndex: 2,
          }}
        >
          <TransactionFilterGroup
            buttons={filterList ?? []}
            title={activeFilterGroup ?? ""}
            filterValues={filterValues}
            onClick={(value) => updateFilterValue(value)}
          />
        </PortalContainer>
      )}

      {shouldShowApplyBtn && (
        <TransactionApplyButtons filterValues={filterValues} />
      )}
    </Box>
  );
};
