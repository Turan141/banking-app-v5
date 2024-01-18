import Signal, { Req } from "badmfck-signal";
import { AccountHomeMockedData } from "../mockup/AccountHomeMock";
import { PaymentSettingsMock } from "../mockup/PaymentSettingsMock";
import { translationsMock } from "../mockup/TranslationsMock";
import { currenciesWithCountryCode } from "../helpers/CurrenciesWithCountryCode";
import { currencySymbols } from "../helpers/CurrencySymbols";
import { getTotalAmount } from "../helpers/GetTotalConsolidateAmount";

export interface IStatsTabs {
  [StatsToRender.ACCOUNT]: "account";
  [StatsToRender.OTHER_ACCOUNTS]: "other-accounts";
  [StatsToRender.PARTNER_LINKS]: "partner-links";
}

export enum StatsToRender {
  ACCOUNT = "account",
  OTHER_ACCOUNTS = "other-accounts",
  PARTNER_LINKS = "partners-links",
}

// Siqnal's
export const S_ACCOUNT_STAT_READY = new Signal<void>();
export const S_ACCOUNT_STAT_TAB_CHANGED = new Signal<{ tab: string }>(
  "S_ACCOUNT_STAT_TAB_CHANGED"
);

// Req's
export const REQ_ACTIVE_ACCOUNT_STAT_DATA: Req<void, IStatObject> = new Req();
export const REQ_PAYMENT_SETTINGS_MOCK: Req<void, any> = new Req();
export const REQ_TRANSLATIONS: Req<void, any> = new Req();
export const REQ_CURRENCIES_WITH_COUNTRY_CODE: Req<void, any> = new Req();
export const REQ_CURRENCY_SYMBOLS: Req<void, any> = new Req();
export const REQ_ACCOUNT_STATS: Req<void, any> = new Req();
export const REQ_LOCAL_ACCOUNT_HOME_DATA: Req<void, IAccountHome> = new Req();
export const REQ_ACCOUNT_HOME_DATA: Req<() => void, IAccountHome> = new Req<
  () => void,
  IAccountHome
>();

class AccountHomeManager {
  private currentAccountStatTab: string = StatsToRender.ACCOUNT;
  private accountStatData: IStatObject[] = [];
  private accountHomeData: IAccountHome = AccountHomeMockedData;

  constructor() {}

  async init() {
    // Req's
    REQ_ACTIVE_ACCOUNT_STAT_DATA.listener = async () =>
      await this.getCurrentActiveStatData();
    REQ_ACCOUNT_HOME_DATA.listener = async () =>
      await this.getAccountHomeData();
    REQ_TRANSLATIONS.listener = async () => await this.getTranslations();
    REQ_CURRENCY_SYMBOLS.listener = async () => await this.getCurrencySymbols();
    REQ_ACCOUNT_STATS.listener = async () => await this.getAccountStats();
    REQ_CURRENCIES_WITH_COUNTRY_CODE.listener = async () =>
      await this.getCurrenciesWithCountryCode();
    REQ_PAYMENT_SETTINGS_MOCK.listener = async () =>
      await this.getPaymentSettings();
      REQ_LOCAL_ACCOUNT_HOME_DATA.listener = async () =>
      await this.getLocalAccountHomeData();

    // Siqnal's
    S_ACCOUNT_STAT_TAB_CHANGED.subscribe(({ tab }) =>
      this.onAccountStatTabChanged(tab)
    );
  }

  onAccountStatTabChanged(tab: string) {
    this.currentAccountStatTab = tab;
    // Additional logic or actions can be performed here
  }

  async getLocalAccountHomeData(): Promise<IAccountHome> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.accountHomeData);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAccountStats(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.accountStatData);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getCurrentActiveStatData(): Promise<any> {
    return (
      this.accountStatData.find(
        (stat) => stat.type === this.currentAccountStatTab
      ) || []
    );
  }

  async getAccountHomeData(): Promise<IAccountHome> {
    return new Promise(async (resolve, reject) => {
      try {
        const parsedData = await this.getAccountHomeDataFromDB(); // fetch from db
        const updatedStats = await this.updateAccountStats(parsedData);

        this.accountHomeData = parsedData;
        S_ACCOUNT_STAT_READY.invoke();
        resolve(updatedStats);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAccountHomeDataFromDB(): Promise<IAccountHome> {
    console.log("getAccountHomeDataFromDB");
    return new Promise(async (resolve, reject) => {
      try {
        const parsedData = AccountHomeMockedData; // fetch from db
        setTimeout(() => {
          resolve(parsedData as any);
        }, 1500);
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateAccountStats(resp: IAccountHome): Promise<any> {
    const {
      [StatsToRender.ACCOUNT]: account,
      [StatsToRender.OTHER_ACCOUNTS]: otherAccounts,
      [StatsToRender.PARTNER_LINKS]: partnerLinks,
    } = resp;

    // Prepare data from db for rendering
    const statObject: IStatObject[] = [
      {
        title: "Currency Accounts",
        totalConsolidateAmount: getTotalAmount(account?.accounts || []),
        consolidateCurrency: account?.accounts?.[0]?.CONSOLIDATE_CURRENCY ?? "",
        currencyStats: account?.accounts || [],
        type: "account",
      },
      {
        title: "Trading Accounts",
        totalConsolidateAmount: getTotalAmount(otherAccounts || []),
        consolidateCurrency: otherAccounts?.[0]?.CONSOLIDATE_CURRENCY ?? "",
        currencyStats: otherAccounts || [],
        type: "other-accounts",
      },
      {
        title: "Partners Links",
        type: "partners-links",
        totalConsolidateAmount: getTotalAmount(
          partnerLinks.reduce(
            (accumulator, currentValue) =>
              accumulator.concat(
                currentValue.PARTNER_ACCOUNTS as unknown as any
              ),
            []
          ) || []
        ),
        consolidateCurrency:
          partnerLinks?.[0].PARTNER_ACCOUNTS[0].CONSOLIDATE_CURRENCY ?? "",
        currencyStats:
          partnerLinks
            .reduce(
              (accumulator, currentValue) =>
                accumulator.concat(
                  currentValue.PARTNER_ACCOUNTS.map((account: IAccountVO) => ({
                    ...account,
                    PARTNER_NAME: currentValue.PARTNER_NAME,
                  }))
                ),
              []
            )
            .sort((a: IAccountVO, b: IAccountVO) =>
              (b.CONSOLIDATE_BALANCE || "").localeCompare(
                a.CONSOLIDATE_BALANCE || ""
              )
            ) || [],
      },
    ];

    return new Promise((resolve, reject) => {
      try {
        this.accountStatData = statObject;
        resolve(statObject);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getCurrencySymbols(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(currencySymbols);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getCurrenciesWithCountryCode(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(currenciesWithCountryCode);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getTranslations(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(translationsMock);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getPaymentSettings(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const parsedData = JSON.parse(PaymentSettingsMock);
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AccountHomeManager;
