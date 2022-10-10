import React from "react";

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import styles from "./TakeProfitItem.module.scss";

type Props = {
	id: number;
	profitNumber: number;
	targetPrice: number;
	amountToBuy: number;
	deleteProfileItem:(id:number)=>void
};

function TakeProfitItem(profit:Props) {
    const { id, profitNumber, targetPrice, amountToBuy, deleteProfileItem } =
		profit;

    const deleteTargetItem=(id:number)=>{
     console.log(id);
     deleteProfileItem(id);

    }
	return (
		<div className={styles.itemContent}>
			<div>{profitNumber} % </div>
			<div>TargetPrice {targetPrice}</div>
			<div>AmountToBuy {amountToBuy}</div>
			<IconButton className={styles.closeIcon} onClick={()=>deleteTargetItem(id)}>
				<CancelIcon />
			</IconButton>
		</div>
	);
}

export { TakeProfitItem };
