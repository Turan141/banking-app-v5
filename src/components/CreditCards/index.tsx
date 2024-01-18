import { Box } from "@mui/material"
import {  CardItem } from "./CardItem"

const CreditCards = () => {
	//@ts-ignore
	const cardsList = accountHomeData?.["prepaid-cards"]?.cards

	return (
		<Box>
			{cardsList?.map((card: any) => (
				<CardItem cardDetails={card} />
			))}
		</Box>
	)
}

export default CreditCards
