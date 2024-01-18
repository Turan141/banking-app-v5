import { styled } from "@mui/system"
import Box from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import { Typography } from "@mui/material"
import { getTranslatedText } from "@/Translations"
import { useTheme } from "@emotion/react"
  //@ts-ignore
const IconVButtonDiv = styled(ButtonBase)(({ theme, selected }) => ({
	position: "relative",
	[theme.breakpoints.down("sm")]: {
		width: "100% !important", // Overrides inline-style
		height: "100%"
	},
	color: "white", // Ripple color for ButtonBase
	/*"& svg>*":{
		fill:selected ? 
	}*/

}))

interface IIconVButtonProps {
	icon?: any
	title?: string
	id?: string
	selected?: boolean
}

export const IconVButton = ({ icon, title, selected }: IIconVButtonProps) => {

	const i = icon({selected:selected});
	const theme = useTheme() as any; // TODO: setup theme type
	const color = selected ? theme.palette.iconVButton.selected:null
	return (
		<Box sx={{ flex: 1, display: "flex", flexDirection: "column", placeItems: "center",gap:"4px" }}>
			<Box
				sx={{
					overflow: "hidden",
					display: "flex",
					placeItems: "center",
					justifyContent: "center",
				}}
			>
				<IconVButtonDiv selected={selected} focusRipple>
					{i}
				</IconVButtonDiv>
			</Box>
			{title && <Typography sx={{ fontSize: "11px", color:color }}>{getTranslatedText(title)}</Typography>}
		</Box>
	)
}
