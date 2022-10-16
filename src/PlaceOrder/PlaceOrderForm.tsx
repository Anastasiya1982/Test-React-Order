import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import { useStore } from "./context";
import { BASE_CURRENCY, QUOTE_CURRENCY } from "./constants";
import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";
import { NumberInput, Button } from "components";

import styles from "./PlaceOrderForm.module.scss";


export const PlaceOrderForm = observer(() => {
	const store = useStore();
	const {
		activeOrderSide,
		price,
		total,
		amount,
		setPrice,
		setAmount,
		setTotal,
		setOrderSide,
		changeAllTotalTargetPrice,
		isProfitNumberLimit,
		finishedAmount,
		isAmountLimit,
		setProfitsLimitError,
		setAmountLimitError,
		decreseNumber,
		finishedProfitNumber,
	} = store.placeOrderStore;

	const [isFormProfitChecked, setIsFormProfitChecked] = useState(false);
	const [isFormAmountChecked, setIsFormAmountChecked] = useState(false);

	const checkIfProfitsCorrect = () => {
		if (finishedProfitNumber > 500) {
			setProfitsLimitError(true);
		} else {
			setProfitsLimitError(false);
			setIsFormProfitChecked(!isFormProfitChecked);
		}
	};

	useEffect(() => {
		if (isFormProfitChecked && isFormAmountChecked) {
			alert("Your form is submited!");
		}
	});

	const checkIfAmountCorrect = () => {
		if (finishedAmount > 100) {
			setAmountLimitError(true);
		} else {
			setAmountLimitError(false);
			setIsFormAmountChecked(!isFormAmountChecked);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		checkIfProfitsCorrect();
		checkIfAmountCorrect();
	};

	return (
		<form className={styles.root} onSubmit={handleSubmit}>
			<div className={styles.header}>
				Binance: {`${BASE_CURRENCY} / ${QUOTE_CURRENCY}`}
				<IconButton className={styles.closeIcon}>
					<CancelIcon />
				</IconButton>
			</div>
			<div className={styles.content}>
				<div className={styles.typeSwitch}>
					<PlaceOrderTypeSwitch
						activeOrderSide={activeOrderSide}
						onChange={setOrderSide}
					/>
				</div>
				<div className={styles.price}>
					<NumberInput
						label="Price, USDT"
						value={price}
						onBlur={changeAllTotalTargetPrice}
						onChange={(value) => setPrice(Number(value))}
					/>
				</div>
				<div className={styles.amount}>
					<NumberInput
						value={amount}
						label="Amount, BTC"
						onChange={(value) => setAmount(Number(value))}
					/>
				</div>
				<div className={styles.total}>
					<NumberInput
						value={total}
						label="Total, USDT"
						onChange={(value) => setTotal(Number(value))}
					/>
				</div>
				<div
					className={
						isProfitNumberLimit.isError || isAmountLimit.isError
							? styles.errorBlock
							: styles.disabled
					}
				>
					{isProfitNumberLimit.isError && (
						<p>{isProfitNumberLimit.message}</p>
					)}

					{isAmountLimit.isError && (
						<p>{`${finishedAmount} out of 100% selected. Please decrease by ${decreseNumber}`}</p>
					)}
				</div>
				<div className={styles.takeProfit}>
					<TakeProfit />
				</div>
				<div className={styles.submit}>
					<Button
						color={activeOrderSide === "buy" ? "green" : "red"}
						type="submit"
						fullWidth
					>
						{activeOrderSide === "buy"
							? `Buy ${BASE_CURRENCY}`
							: `Sell ${QUOTE_CURRENCY}`}
					</Button>
				</div>
			</div>
		</form>
	);
});
