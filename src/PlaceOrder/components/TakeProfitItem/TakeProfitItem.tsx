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

		const {			
            activeOrderSide,
			finishedAmount,
			recalculateAmountToBuy,
			setProfitValue,
			updateProfit,
			setTargetPrice,
			totalTargetPrice,
			changeAllTotalTargetPrice,
			 setAmountToSellOfProfitTargetState,
		} = store.placeOrderStore;
		const [targetPriceInputValue, setTargetPriceInputValue] = useState<
			number | null
		>(targetPrice);
		
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
		const setNewProfitValue = (value: number) => {
			setProfitValue(id, value);
		};

		const setCurrentTargetPriceValue = (value: any) => {
			setTargetPrice(id, value);
		};

		const setCurrentAmountValue = (value: number) => {
			setAmountToSellOfProfitTargetState(id, value);
		};

		const deleteTargetItem = (id: number) => {
			deleteProfileItem(id);
		};

		const changeInputProfitValueonBlure = () => {		
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
								value={profit}
								onChange={setNewProfitValue}
								onBlur={changeInputProfitValueonBlure}
								activeOrderSide={activeOrderSide}
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
						activeOrderSide={activeOrderSide}
					/>
				</div>
				<div>
					<NumberInput
						label="Amount to buy"
						variant="underlined"
						value={amountToBuy}
						onBlur={changeInputProfitValueonBlure}
						onChange={setCurrentAmountValue}
						InputProps={{
							endAdornment: <span>{PROCENT_MARK}</span>,
						}}
						activeOrderSide={activeOrderSide}
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
