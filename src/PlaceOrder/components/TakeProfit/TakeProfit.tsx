/* eslint @typescript-eslint/no-use-before-define: 0 */
import React, { useState } from "react";
import { observer } from "mobx-react";

import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";

import { Switch } from "components";
import { ProfitTarget } from "../ProfitTarget/ProfitTarget";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import { useStore } from "PlaceOrder/context";

import styles from "./TakeProfit.module.scss";

const TakeProfit = observer(() => {
	const [isAddProfitTargetOpen, setIsAddProfitTargetOpen] = useState(false);

	const store = useStore();
	const { profits, setProfits, clearProfits, progectedProfit } =
		store.placeOrderStore;

	const changeProfitTarget = (checked: boolean) => {
		if (checked) {
			setIsAddProfitTargetOpen(true);
			setProfits();
		} else if (!checked && !profits.length) {
			setIsAddProfitTargetOpen(false);
			setProfits();
		} else if (!checked && profits.length) {
			setIsAddProfitTargetOpen(false);
			clearProfits();
		}
	};

	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<div className={styles.title}>
					<span>Take Profit</span>
					<Tooltip
						title={<>{"some information about profit target"}</>}
						placement={"top"}
					>
						<IconButton
							className={styles.quastionIcon}
							size="small"
						>
							?
						</IconButton>
					</Tooltip>
				</div>
				<Switch
					checked={isAddProfitTargetOpen}
					onChange={changeProfitTarget}
				/>
			</div>
			{isAddProfitTargetOpen && (
				<ProfitTarget
					isOpen={isAddProfitTargetOpen}
					setIsOpen={setIsAddProfitTargetOpen}
				/>
			)}
			<div className={styles.progectedProfit}>
				<div>Projected profit</div>
				<div>
					{progectedProfit} {`${QUOTE_CURRENCY}`}
				</div>
			</div>
		</div>
	);
});

export { TakeProfit };
