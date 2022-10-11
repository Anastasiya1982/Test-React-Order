/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";
import { useState } from "react";

import IconButton from "@material-ui/core/IconButton";

import { Switch } from "components";
import { ProfitTarget } from "../ProfitTarget/ProfitTarget";

import styles from "./TakeProfit.module.scss";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";
import { Tooltip } from "@material-ui/core";
import { observer } from "mobx-react";
import { useStore } from "PlaceOrder/context";

const TakeProfit = observer(() => {
	const [isAddProfitTargetOpen, setIsAddProfitTargetOpen] = useState(false);
    const { profits, setProfits, clearProfits } = useStore();

	const changeProfitTarget = (checked: boolean) => {
		console.log("====================================");
		console.log(checked);
		console.log("====================================");
		if (checked) {
			setIsAddProfitTargetOpen(true);
		} else if (!checked && !profits.length) {
			setIsAddProfitTargetOpen(false);
			setProfits();
		} else if (!checked && profits.length) {
			setIsAddProfitTargetOpen(false);
			clearProfits()
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
				<div> 0 {`${QUOTE_CURRENCY}`}</div>
			</div>
		</div>
	);
});

export { TakeProfit };
