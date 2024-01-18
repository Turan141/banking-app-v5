import Signal, { Req } from "badmfck-signal";
import { transactionOperationHistory } from "@/mockup/TransactionOperationHistory";
import { transactionsItemHistory } from "@/mockup/TransactionsItemHistory";
import {
  REQ_LOCAL_ACCOUNT_HOME_DATA,
  S_ACCOUNT_STAT_READY,
} from "./AccounHomeManager";
import {
  TransactionFilterCategoryStatus,
  TransactionFilterCategoryType,
} from "@/components/Buttons/ButtonLayouts/TransactionFilterSwitchersButtons";
import { getTranslatedText } from "@/Translations";

// Siqnal's
export const S_TRANSACTION_NEW_SWITCHER_LABEL = new Signal<{
  group: string | null;
  label: string;
}>();
export const S_TRANSACTION_DETAILS_OPEN = new Signal<string>();
export const S_TRANSACTION_FILTER_ITEM_SELECT = new Signal<string>();
export const S_TRANSACTION_FILTER_GROUP_SELECT = new Signal<string>();
export const S_TRANSACTION_FILTER_GROUP_SELECTED = new Signal<string>();
export const S_TRANSACTION_FILTERS_TOGGLE = new Signal<"open" | "close">();
export const S_TRANSACTION_FILTERS_RESET = new Signal<void>();
export const S_TRANSACTION_FILTERS_CLOSE = new Signal<void>();
export const S_TRANSACTION_FILTERS_INFORM_STATUS = new Signal<{
  isFiltersApplied: boolean;
  isfiltersReadyToSend: boolean;
}>();
export const S_TRANSACTION_FILTERS_APPLY = new Signal<{
  filters: ITransactionFilterGroup;
}>();

// Req's
export const REQ_TRANSACTIONS_HISTORY: Req<
  ITransactionFilterGroup | null,
  ITransactionOperation[]
> = new Req();
export const REQ_TRANSACTION_DETAILS: Req<void, TransactionsHistoryItem> =
  new Req();
export const REQ_TRANSACTION_FILTERS_LIST: Req<string, string[]> = new Req();
export const REQ_ACTIVE_DATE_VALUES: Req<void, string[]> = new Req();
export const REQ_TRANSACTION_FILTERS_INFORM_STATUS: Req<
  {},
  { isFiltersApplied: boolean; isfiltersReadyToSend: boolean }
> = new Req();
export const REQ_CURRENT_TRANSACTION_FILTERS = new Req<
  string | null,
  ITransactionFilterGroup
>();

class TransactionManager {
  // for future use
    //@ts-ignore
  private transactionOpenedUID: string = "8126373";
  //@ts-ignore
  private isTransactionFiltersOpen: boolean = false;
  private isFiltersApplied: boolean = false;
  private isfiltersReadyToSend: boolean = false;

  private activeFilterGroup: string | null = null;
  private transactionFilterValues: ITransactionFilterGroup = {
    TYPE: null,
    STATUS: null,
    DATE: null,
    ACCOUNT: null,
  };
  private filterData: IFilterData = {
    TYPE: Object.values(TransactionFilterCategoryType),
    STATUS: Object.values(TransactionFilterCategoryStatus),
    ACCOUNT: [],
  };

  constructor() {}

  async init() {
    // Req's
    REQ_TRANSACTION_FILTERS_INFORM_STATUS.listener = async () => {
      return {
        isFiltersApplied: this.isFiltersApplied,
        isfiltersReadyToSend: this.isfiltersReadyToSend,
      };
    };
    REQ_TRANSACTIONS_HISTORY.listener = async (filters) =>
      await this.getTransactionsOperationHistory(filters);
    REQ_TRANSACTION_DETAILS.listener = async () =>
      await this.getTransactionDetails();
    REQ_TRANSACTION_FILTERS_LIST.listener = async (filterGroup) =>
      await this.getFilterList(filterGroup);
    REQ_CURRENT_TRANSACTION_FILTERS.listener = async (value) => {
      this.selectTransactionFilterValue(value);
      return { ...this.transactionFilterValues };
    };
    REQ_ACTIVE_DATE_VALUES.listener = async () => {
      return this.transactionFilterValues.DATE?.split('/') ?? [];
    }
    // REQ_NEW_SWITCHER_LABEL.listener = async () => this.getNewLabel();

    // Siqnal's
    S_TRANSACTION_FILTER_GROUP_SELECT.subscribe((group) =>
      this.selectTransactionFilterGroup(group)
    );
    S_TRANSACTION_FILTERS_CLOSE.subscribe(() => this.closeTransactionFilters());
    S_TRANSACTION_FILTERS_APPLY.subscribe(() => this.applyTransactionFilters());
    S_TRANSACTION_FILTERS_RESET.subscribe(() => this.resetTransactionFilters());
    S_TRANSACTION_DETAILS_OPEN.subscribe(
      (uid) => (this.transactionOpenedUID = uid)
    );

    S_ACCOUNT_STAT_READY.subscribe(() => this.fillAccountsFilterValues());
    // S_TRANSACTION_FILTER_ITEM_SELECT.subscribe((filter) =>
    //   this.selectTransactionFilterValue(filter)
    // );
  }

  private async fillAccountsFilterValues() {
    const accountData = await REQ_LOCAL_ACCOUNT_HOME_DATA.request();
    this.filterData.ACCOUNT = accountData.account.accounts;
  }

  private openTransactionFilters() {
    this.isTransactionFiltersOpen = true;
    S_TRANSACTION_FILTERS_TOGGLE.invoke("open");
  }

  private closeTransactionFilters() {
    this.isTransactionFiltersOpen = false;
    this.clearTransactionFilterGroup();
    S_TRANSACTION_FILTERS_TOGGLE.invoke("close");
  }

  private clearTransactionFilterGroup() {
    this.activeFilterGroup = null;
    this.selectTransactionFilterGroup("");
  }

  private selectTransactionFilterGroup(group: string) {
    if (this.activeFilterGroup === group) return this.closeTransactionFilters();

    this.activeFilterGroup = group;
    S_TRANSACTION_FILTER_GROUP_SELECTED.invoke(group);
    this.openTransactionFilters();
  }

  private updateFiltersStatus({
    isFiltersApplied,
    isfiltersReadyToSend,
  }: {
    isFiltersApplied: boolean;
    isfiltersReadyToSend: boolean;
  }) {
    this.isFiltersApplied = isFiltersApplied;
    this.isfiltersReadyToSend = isfiltersReadyToSend;

    S_TRANSACTION_FILTERS_INFORM_STATUS.invoke({
      isFiltersApplied,
      isfiltersReadyToSend,
    });
  }

  private applyTransactionFilters() {
    this.updateFiltersStatus({
      isFiltersApplied: true,
      isfiltersReadyToSend: false,
    });
    this.closeTransactionFilters();
  }

  private resetTransactionFilters() {
    this.transactionFilterValues = {
      TYPE: null,
      STATUS: null,
      DATE: null,
      ACCOUNT: null,
    };
    this.updateFiltersStatus({
      isFiltersApplied: false,
      isfiltersReadyToSend: false,
    });

    this.closeTransactionFilters();
  }

  private removeTransactionFilterValue() {
    this.transactionFilterValues[
      this.activeFilterGroup?.toUpperCase() as keyof ITransactionFilterGroup
    ] = null;
    const someOtherFilterSelected = Object.values(
      this.transactionFilterValues
    ).some((filter) => !!filter);

    if (!someOtherFilterSelected) {
      this.updateFiltersStatus({
        isFiltersApplied: false,
        isfiltersReadyToSend: false,
      });
    }
    return;
  }

  private selectTransactionFilterValue(filterValue: string | null) {
    if (!this.activeFilterGroup) return;

    const activeValue =
      this.transactionFilterValues[
        this.activeFilterGroup?.toUpperCase() as keyof ITransactionFilterGroup
      ];

    const hasBeenSelected = activeValue === filterValue?.toUpperCase();

    if (hasBeenSelected) {
      this.removeTransactionFilterValue();
    } else {
      this.transactionFilterValues[
        this.activeFilterGroup.toUpperCase() as keyof ITransactionFilterGroup
      ] = filterValue;
    }

    this.updateSwitcherLabel();

    this.updateFiltersStatus({
      isFiltersApplied: false,
      isfiltersReadyToSend: true,
    });
  }

  private async getFilterList(filterGroup: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.filterData[filterGroup]);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getTransactionOperationHistoryFromPHP(
    filters: ITransactionFilterGroup | null
  ): Promise<ITransactionOperation[]> {
    // todo GET money/history
    let response = transactionOperationHistory.data; //mock
    const hasFilters =
      filters && Object.values(filters).some((filter) => !!filter); // mock

    if (hasFilters) {
      // todo _IF FILTERS_ /money/history?page_size=20&page=1&type=&status=PENDING&l=en
      // todo parse date const [date_from, date_to] = this.filter.date.split('/');

      response = response.filter(
        (operation) => operation.TYPE === "WITHDRAWAL"
      ); // mock
    }

    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(response)));
          // add BODY with filters
        }, 400);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getTransactionsOperationHistory(
    filters: ITransactionFilterGroup | null
  ): Promise<ITransactionOperation[]> {
    if (!filters) this.resetTransactionFilters();

    const transactionOperationHistory =
      await this.getTransactionOperationHistoryFromPHP(filters);

    const groupedOperationsByDate = this.groupTransactionsByDate(
      transactionOperationHistory as ITransactionOperation[]
    );

    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(JSON.stringify(groupedOperationsByDate)));
      } catch (error) {
        reject(error);
      }
    });
  }

  // todo  https://jpre.dukascopy.com/jamaica/predemo

  async getTransactionDetails(): Promise<TransactionsHistoryItem> {
    // this.transactionOpenedUID is mock uid of transaction that was opened
    // todo GET money/history/{uid} get uid from @operations@
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(transactionsItemHistory)));
        }, 400);
      } catch (error) {
        reject(error);
      }
    });
  }

  private groupTransactionsByDate(transactions: ITransactionOperation[]) {
    const groupedTransactions: { [key: string]: ITransactionOperation[] } = {};

    transactions.forEach((transaction) => {
      const createdDate = new Date(Number(transaction.CREATED_TS) * 1000);
      const dateString = createdDate.toISOString().split("T")[0];

      if (!groupedTransactions[dateString]) {
        groupedTransactions[dateString] = [];
      }

      groupedTransactions[dateString].push(transaction);
    });

    return groupedTransactions;
  }

  private getNewLabelBySwitcherName() {
    const filterValues =
      this.transactionFilterValues[
        this.activeFilterGroup as keyof ITransactionFilterGroup
      ];

    switch (this.activeFilterGroup) {
      case "TYPE":
      case "STATUS":
        return getTranslatedText(filterValues);
      case "ACCOUNT":
        const selectedAccount = this.filterData?.ACCOUNT.find((account: IAccountVO) => account.IBAN === filterValues);
        return selectedAccount?.DESCRIPTION ?? selectedAccount?.CURRENCY + " Account"
      case "DATE":
        const [startDate, endDate] = this.transactionFilterValues?.DATE?.split('/') ?? []

      
        if (!startDate && !endDate) return getTranslatedText('DATE')

        return startDate + ' - ' + endDate;
      default:
        return "";
    }
  }

  private updateSwitcherLabel() {
    if (!this.activeFilterGroup) return "";

    const newLabel = this.getNewLabelBySwitcherName();

    S_TRANSACTION_NEW_SWITCHER_LABEL.invoke({
      group: this.activeFilterGroup,
      label: newLabel ?? "",
    });
  }
}

export default TransactionManager;
