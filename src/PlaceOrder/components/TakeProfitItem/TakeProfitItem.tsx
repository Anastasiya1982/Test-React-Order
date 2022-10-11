import React from "react";

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import { NumberInput } from "components/NumberInput/NumberInput";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import { PROCENT_MARK } from "../../constants";

import styles from "./TakeProfitItem.module.scss";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

type Props = {
	id: number;
	profit: number;
	targetPrice: number;
	amountToBuy: number;
	deleteProfileItem: (id: number) => void;
};


function TakeProfitItem(profitItem: Props) {
	const { id, profit, targetPrice, amountToBuy, deleteProfileItem } =
		profitItem;

	const deleteTargetItem = (id: number) => {
		deleteProfileItem(id);
	};
	const changeInputValue = () => {
		console.log("profit blure");
	};

	// const handleChange =
	// 	(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
	// 		setValues({ ...values, [prop]: event.target.value });
	// 	};

    // const deleteProfileItem = (id: number) => {
	// 	const newProfitsAmount = [...profits].filter((p) => p.id !== id);
	// 	setProfits([...newProfitsAmount]);
	// };

	return (
		<div className={styles.itemContent}>
			<NumberInput
				label="Profit"
				value={profit}
				onChange={(value) => console.log("profit", value)}
				onBlur={changeInputValue}
				InputProps={{
					endAdornment: PROCENT_MARK,
					classes: {
						adornedEnd: styles.adornedEnd,
					},
				}}				
				className={styles.profitInput}
			/>

			<NumberInput
				label="Target price"
				value={targetPrice}
				onChange={(value) => console.log("price", value)}
				InputProps={{ endAdornment: QUOTE_CURRENCY }}
			/>
			<NumberInput
				label="Amount to buyt"
				value={amountToBuy}
				onChange={(value) => console.log("Amount", value)}
				InputProps={{ endAdornment: PROCENT_MARK }}
			/>
			<IconButton
				onClick={() => deleteTargetItem(id)}
				className={styles.closeIcon}
			>
				<CancelIcon />
			</IconButton>
		</div>
	);
}

export { TakeProfitItem };
