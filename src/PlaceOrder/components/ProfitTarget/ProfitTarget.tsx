import React, {useState} from "react";
import { TakeProfitItem } from "../TakeProfitItem/TakeProfitItem";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import styles from "./ProfitTarget.module.scss";


const ProfitTarget= () => {  

    const [profitsAmount, setProfitsAmount]=useState([{
        id:1,
        profitNumber:2,
        targetPrice:0,
        amountToBuy:0
    }])


    const addTargetProfit=()=>{
        let newTarget = {
			id: Math.floor(Math.random() * 20),
			profitNumber: 4,
			targetPrice: 0,
			amountToBuy: 0,
		};
       if (profitsAmount.length<5){      
        
         setProfitsAmount([...profitsAmount, newTarget]);
       } 
		
    }
    const deleteProfileItem=(id:number)=>{
        const newProfitsAmount = [...profitsAmount].filter(p=>p.id !==id);
        setProfitsAmount([...newProfitsAmount]);
    }
    
	return (
		<div className={styles.profitTarget}>
			{profitsAmount.map((profit) => {
				return (
					<TakeProfitItem
						key={profit.id}
						{...profit}
						deleteProfileItem={deleteProfileItem}
					/>
				);
			})}
			{profitsAmount.length < 5 && (
				<div className={styles.addProfitBtn}>
					<AddCircleIcon className={styles.addIcon} />
					<div onClick={addTargetProfit}>
						Add profit target {profitsAmount.length} / 5
					</div>
				</div>
			)}
		</div>
	);
};

export { ProfitTarget };
