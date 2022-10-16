import React, { useState, useEffect } from "react";

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
			setAmountToBuy,
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
				amountToBuy: `number out of 100% selected. Please decrease `,
				isAmountToBuy: false,
			});

		if (finishedAmount > 100) {		
			recalculateAmountToBuy();
		}

		const setNewProfitValue = (value: number) => {
			if (+value <= 0) {
				setProfitError((prevState) => ({
					...prevState,
					isProfitErrorMin: true,
				}));
			} else {
				setProfitError((prevState) => ({
					...prevState,
					isProfitErrorMin: false,
				}));
			}
			setProfitValue(id, value);
		};    

		const setCurrentTargetPriceValue = (value: any) => {
            if (+value <= 0) {
				setTargetPriceError((prevState) => ({
					...prevState,
					isTargetPriceMin: true,
				}));
			} else {
				setTargetPriceError((prevState) => ({
					...prevState,
					isTargetPriceMin: false,
				}));
			}
			setTargetPrice(id, value);
		};

		const setCurrentAmountValueonBlur = () => {
			// if (finishedAmount > 100) {
			// 	setAmountToBuyErrorRange(() => ({
			// 		first: amountToBuy,
			// 		second: amountToBuy - 100,
			// 	}));
			// 	setAmountToBuyError((prevState: any) => ({
			// 		...prevState,
			// 		isAmountToBuy: true,
			// 	}));
			// } else {
			// 	setAmountToBuyError((prevState: any) => ({
			// 		...prevState,
			// 		isAmountToBuy: false,
			// 	}));
			// }
		};

		const handleChangecurrentAmountTobuyInput = (value: number) => {
			// if (value > 100) {				
			// 	setAmountToBuyErrorRange(() => ({
			// 		first: value,
			// 		second: value - 100,
			// 	}));
			// 	setAmountToBuyError((prevState: any) => ({
			// 		...prevState,
			// 		isAmountToBuy: true,
			// 	}));
			// }
			
            // setAmountToBuyError((prevState: any) => ({
			// 	...prevState,
			// 	isAmountToBuy: false,
			// }));
            setAmountToBuy(id, value);
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
								error={profitError.isProfitErrorMin}
								InputProps={{
									endAdornment: <span>{PROCENT_MARK}</span>,
								}}
							/>
						</div>
					}
					open={profitError.isProfitErrorMin}
					isError={profitError.isProfitErrorMin}
					placement="top"
					message={profitError.profitErrorMin}
				></Tooltip>
				<Tooltip
					open={targetPriceError.isTargetPriceMin}
					isError={targetPriceError.isTargetPriceMin}
					placement="top"
					message={targetPriceError.targetPriceMin}
					children={
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
					}
				></Tooltip>

				<Tooltip
					children={
						<div>
							<NumberInput
								label="Amount to buy"
								variant="underlined"
								value={amountToBuy}
								onBlur={setCurrentAmountValueonBlur}
								onChange={handleChangecurrentAmountTobuyInput}
								InputProps={{
									endAdornment: <span>{PROCENT_MARK}</span>,
								}}
								activeOrderSide={activeOrderSide}
							/>
						</div>
					}
					open={amountToBuyError.isAmountToBuy}
					isError={amountToBuyError.isAmountToBuy}
					placement="top"
					message={amountToBuyError.amountToBuy}
				></Tooltip>

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
