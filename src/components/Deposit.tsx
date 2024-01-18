import { Box } from "@mui/material";
import { DepositFromCard } from "./DepositFromCard/DepositFromCard";
import { depositScreenButtons } from "@/components/Buttons/ButtonLayouts/DepositScreenButtons";
import MenuItemButton from "./Buttons/ButtonVariations/MenuItemButton";

export const Deposit = () => {
  return (
    <Box
      sx={{
        backgroundColor: "backgroundDefault.main",
        pl: 2,
        pr: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "100%",
          pt: 2,
          pb: 2,
        }}
      >
        {depositScreenButtons.map((button) => (
          <Box display="flex">
            <MenuItemButton
              buttonProps={button}
              styles={{
                width: "100%",
                pl: 2,
                pr: 2,
                pt: 1,
                pb: 1,
                color: "contentPrimary.main",
                fontWeight: "var(--fontRegular400)",
                "& .MuiButton-startIcon": {
                  mr: 0,
                  width: 24,
                  height: 24,
                } as any,
                svg: {
                  width: "100%",
                  height: "100%",
                } as any,
              }}
            />
          </Box>
        ))}
      </Box>
      <DepositFromCard />
    </Box>
  );
};
