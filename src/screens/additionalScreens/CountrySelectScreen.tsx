import { CountriesData } from "../../helpers/CountriesData";
import { BaseScreen } from "../bases/BaseScreen";
import { AccountHead } from "../../components/ScreenHeads/AccountHead";
import { BottomMenu } from "../../components/BottomMenu";
import { CountrySelect } from "../../components/CountrySelect/CountrySelect";

export const CountrySelectScreen = () => {
  return (
    <BaseScreen
      head={<AccountHead />}
      bottom={<BottomMenu />}
    >
      <CountrySelect
        countries={CountriesData.countries}
        onChangeCountry={() => {}}
      />
    </BaseScreen>
  );
};
