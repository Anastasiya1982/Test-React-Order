import React, { useState } from "react";

import { observer } from "mobx-react";

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import { NumberInput } from "components/NumberInput/NumberInput";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import { PROCENT_MARK } from "../../constants";

import styles from "./TakeProfitItem.module.scss";
import { useStore } from "PlaceOrder/context";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "components/Tooltip/Tooltip";

type Props = {
	id: number;
	profit: number;
	targetPrice: number;
	amountToBuy: number;
	deleteProfileItem: (id: number) => void;
};

type profitErrorType = {
	profitErrorMax: string;
	isProfitErrorMax: boolean;
	profitErrorMin: string;
	isProfitErrorMin: boolean;
};

type targetPriceType = {
	targetPriceMin: string;
	isTargetPriceMin: boolean;
};
type amountToBuyType = {
	amountToBuy: string;
	isAmountToBuy: boolean;
};
type amountToBuyErrorRangeType = {
	first: number;
	second: number;
};

const TakeProfitItem = observer(
	({ id, profit, targetPrice, amountToBuy, deleteProfileItem }: Props) => {
		const store = useStore();
        console.log('====================================');
        console.log(id, profit, targetPrice);
        console.log('====================================');
		const {
			profits,
			price,
			finishedAmount,
			recalculateAmountToBuy,
			updateProfit,
			setTargetPrice,
			totalTargetPrice,
			changeAllTotalTargetPrice,
		} = store.placeOrderStore;
		const [targetPriceInputValue, setTargetPriceInputValue] = useState<
			number | null
		>(targetPrice);
		const [profitValue, setProfitValue] = useState<number | null>(profit);
		const [profitError, setProfitError] = useState<profitErrorType>({
			profitErrorMax: "Maximum profit sum is 500%",
			isProfitErrorMax: false,
			profitErrorMin: "Minimum value is 0.01",
			isProfitErrorMin: false,
		});
		const [openTooltip, setOpenTooltip] = useState<boolean>(false);

		const [targetPriceError, setTargetPriceError] =
			useState<targetPriceType>({
				targetPriceMin: "Price must be greater than 0",
				isTargetPriceMin: false,
			});
		const [amountToBuyErrorRange, setAmountToBuyErrorRange] =
			useState<amountToBuyErrorRangeType>({
				first: 0,
				second: 0,
			});
		const [amountToBuyError, setAmountToBuyError] =
			useState<amountToBuyType>({
				amountToBuy: `${amountToBuyErrorRange.first} out of 100% selected. Please decrease by ${amountToBuyErrorRange.second}`,
				isAmountToBuy: false,
			});

		if (finishedAmount > 100) {
			recalculateAmountToBuy();
		}
		const setNewProfitValue = (value: any) => {
			setProfitValue(Number(value));
		};

		const setCurrentTargetPriceValue = (value: any) => {
			setTargetPrice(id, value);
		};

		const deleteTargetItem = (id: number) => {
			deleteProfileItem(id);
		};

		const changeInputProfitValue = () => {
			updateProfit(id, profitValue);
			setTargetPriceInputValue(totalTargetPrice);
			changeAllTotalTargetPrice();
		};

		return (
			<div className={styles.itemContent}>
				<Tooltip
					children={
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
					}
					open={openTooltip}
					isError
					placement="top"
					message={
						(profitError.isProfitErrorMin &&
							profitError.profitErrorMin) ||
						(profitError.isProfitErrorMax &&
							profitError.profitErrorMax)
					}
				></Tooltip>
				<div className={styles.targetInputContainer}>
					<NumberInput
						label="Target price"
						variant="underlined"
						value={targetPrice}
						onChange={setCurrentTargetPriceValue}
						InputProps={{
							endAdornment: <span>{QUOTE_CURRENCY}</span>,
						}}
					/>
				</div>
				<div>
					<NumberInput
						label="Amount to buy"
						variant="underlined"
						value={amountToBuy}
						onChange={(value) => console.log("Amount", value)}
						InputProps={{
							endAdornment: <span>{PROCENT_MARK}</span>,
						}}
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
	},
);

export { TakeProfitItem };
