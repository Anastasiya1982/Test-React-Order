import React, { useState } from "react";

import { observer } from "mobx-react";

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import { NumberInput } from "components/NumberInput/NumberInput";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import { PROCENT_MARK } from "../../constants";

import styles from "./TakeProfitItem.module.scss";
import { useStore } from "PlaceOrder/context";
import { config } from "process";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "@material-ui/core";

type Props = {
	id: number;
	profit: number;
	targetPrice: number;
	amountToBuy: number;
	deleteProfileItem: (id: number) => void;
};

const TakeProfitItem = observer((profitItem: Props) => {
	const { id, profit, targetPrice, amountToBuy, deleteProfileItem } =
		profitItem;

	const store = useStore();
	const {
		profits,
		price,
		finishedAmount,
		recalculateAmountToBuy,
		updateProfit,
		setTargetPrice,
		totalTargetPrice,
	} = store.placeOrderStore;
	const [targetPriceInputValue, setTargetPriceInputValue] = useState<
		number | null
	>(targetPrice);
	const [profitValue, setProfitValue] = useState<number | null>(profit);

	if (finishedAmount > 100) {
		recalculateAmountToBuy();
	}
	const setNewProfitValue = (value: any) => {
		setProfitValue(Number(value));
	};

	const setCurrentTargetPriceValue = (value: any) => {
		setTargetPrice(profitItem, value);
	};

	console.log(totalTargetPrice);
	const deleteTargetItem = (id: number) => {
		deleteProfileItem(id);
	};

	const changeInputProfitValue = () => {
		updateProfit(profitItem, profitValue);
		setTargetPriceInputValue(totalTargetPrice);
	};

	return (
		<div className={styles.itemContent}>
			<div className={styles.profitInputContainer}>
				<NumberInput
					label="Profit"
					variant="underlined"
					value={profitValue}
					onChange={setNewProfitValue}
					onBlur={changeInputProfitValue}
					InputProps={{
						endAdornment: <span>{PROCENT_MARK}</span>,
					}}
				/>
			</div>
			<div className={styles.targetInputContainer}>
				<NumberInput
					label="Target price"
					variant="underlined"
					value={totalTargetPrice}
					onChange={setCurrentTargetPriceValue}
					InputProps={{ endAdornment: <span>{QUOTE_CURRENCY}</span> }}
				/>
			</div>
			<div>
				<NumberInput
					label="Amount to buy"
					variant="underlined"
					value={amountToBuy}
					onChange={(value) => console.log("Amount", value)}
					InputProps={{ endAdornment: <span>{PROCENT_MARK}</span> }}
				/>
			</div>
			<div>
				<IconButton
					onClick={() => deleteTargetItem(id)}
					className={styles.closeIcon}
				>
					<CancelIcon />
				</IconButton>
			</div>
		</div>
	);
});

export { TakeProfitItem };
