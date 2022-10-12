import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { TakeProfitItem } from "../TakeProfitItem/TakeProfitItem";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import styles from "./ProfitTarget.module.scss";
import { useStore } from "PlaceOrder/context";
import { ProfitType } from "PlaceOrder/model";

type Props = {
	isOpen: boolean;
	setIsOpen: Function;
};

const ProfitTarget: React.FC<Props> = observer(({ isOpen, setIsOpen }) => {
	const store = useStore();
	const { profits, setProfits, deleteProfitItem } = store.placeOrderStore;
	const [isBtnVisible, setIsBtnVisible] = useState(true);

	useEffect(() => {
		if (!profits.length) {
			setIsOpen(!isOpen);
			setIsBtnVisible(false);
		}
	}, [profits, isOpen, setIsOpen, isBtnVisible, setIsBtnVisible]);

	const addTargetProfit = () => {
		setProfits();
	};

	const deleteProfitItemById = (item: ProfitType): void => {
		deleteProfitItem(item);
	};
	return (
		<div className={styles.profitTarget}>
			{profits.map((profitItem: any) => {
				return (
					<TakeProfitItem
						key={profitItem.id}
						{...profitItem}
						deleteProfileItem={() =>
							deleteProfitItemById(profitItem)
						}
					/>
				);
			})}

			{isBtnVisible && profits.length !== 5 && (
				<div className={styles.addProfitBtn}>
					<AddCircleIcon className={styles.addIcon} />
					<div onClick={addTargetProfit}>
						Add profit target {profits.length} / 5
					</div>
				</div>
			)}
		</div>
	);
});

export { ProfitTarget };
