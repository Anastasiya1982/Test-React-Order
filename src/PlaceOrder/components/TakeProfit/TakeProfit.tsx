/* eslint @typescript-eslint/no-use-before-define: 0 */
import React from "react";
import {useState} from "react";

import IconButton from "@material-ui/core/IconButton";

import { Switch } from "components";
import { ProfitTarget } from "../ProfitTarget/ProfitTarget";

import styles from  "./TakeProfit.module.scss";
import { QUOTE_CURRENCY } from "PlaceOrder/constants";




const TakeProfit = () => {
    const [isAddProfitTargetOpen, setIsAddProfitTargetOpen]= useState(true)  
    
  return (
		<div className={styles.content}>
			<div className={styles.header}>
				<div className={styles.title}>
					<span>Take Profit</span>
					<IconButton className={styles.quastionIcon}>?</IconButton>
				</div>
				<Switch
					checked={isAddProfitTargetOpen}
					onChange={setIsAddProfitTargetOpen}
				/>
			</div>
			{isAddProfitTargetOpen && <ProfitTarget />}
			<div className={styles.progectedProfit}>
				<div>Projected profit</div>
				<div> 0 {`${QUOTE_CURRENCY}`}</div>
			</div>
		</div>
  );
};

export { TakeProfit };
