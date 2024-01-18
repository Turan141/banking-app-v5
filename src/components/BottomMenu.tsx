import { Box } from "@mui/material"
import { IconVButton } from "./Buttons/ButtonVariations/IconVButton"
import { useEffect, useState } from "preact/hooks"
import { IBottomMenu, mocked_bottom_menu } from "./Buttons/ButtonLayouts/BottomBarButtons"

export const BottomMenu = () => {
	const [bottomMenuBtns, setBottomMenuBtns] = useState<IBottomMenu[]>([])

	useEffect(() => {
		setBottomMenuBtns(mocked_bottom_menu)
	}, [])

	return (
		<Box
			sx={{
				borderTop: "1px solid var(--colorNeutralNeutral300)",
				backgroundColor: "backgroundMain.main",
				display: "flex",
				width: "100%",
				color: "iconVButton.main",
				height:"64px",
				alignItems:"center",
				justifyContent:"center"
			}}
		>
			{bottomMenuBtns?.map((item, index) => (
				<IconVButton key={index} icon={item.icon} title={item.title} selected={item.selected} />
			))}
		</Box>
	)
}