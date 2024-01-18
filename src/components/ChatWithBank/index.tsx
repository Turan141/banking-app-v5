import { Box, Typography } from "@mui/material"
import { ChatWithBankLogo } from "../../assets/icons/ChatWithBankLogo"
import { getTranslatedText } from "@/Translations"

export const ChatWithBank = () => {
	return (
		<Box sx={{
      		display: "flex",
      		backgroundColor: "dark4.main",
			alignItems: "end",
			pt:1,
	  		paddingBottom:"env(safe-area-inset-bottom)"
    }}>
			<Box>
				<ChatWithBankLogo />
			</Box>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				mb: 2,
				ml: 3
			}}>
				<Typography sx={{margin:0,color:"white" }}>
					{getTranslatedText("ChatWithBank")}
				</Typography>
				<Typography variant="caption" sx={{margin:0, color: "iconVButton.main"}}>
					{getTranslatedText("SendUsYourQuestion")}
				</Typography>
			</Box>
		</Box>
	)
}

