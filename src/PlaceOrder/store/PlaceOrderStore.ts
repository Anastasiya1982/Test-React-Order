import { observable, computed, action } from "mobx";
import { OrderSide } from "../model";
import { ProfitType } from "./Profit";

import { PlaceOrderForm } from "../PlaceOrderForm";

export class PlaceOrderStore {
	@observable activeOrderSide: OrderSide = "buy";
	@observable price: number = 0;
	@observable amount: number = 0;
	@observable profits: any = [];

	root: RootStore | undefined;

	@computed get total(): number {
		return this.price * this.amount;
	}

	@action.bound
	public setOrderSide(side: OrderSide) {
		this.activeOrderSide = side;
	}

	@action.bound
	public setPrice(price: number) {
		this.price = price;
	}

	@action.bound
	public setAmount(amount: number) {
		this.amount = amount;
	}

	@action.bound
	public setTotal(total: number) {
		this.amount = this.price > 0 ? total / this.price : 0;
	}

	@action.bound public setProfits() {
		let lastProfit = this.profits[this.profits.length - 1];
		let newProfit = lastProfit ? lastProfit.profit + 2 : 2;
		let newTargetPrice = this.price + (this.price / 100) * newProfit;
		let amountToBuy = this.profits.length ? 20 : 100;
		// let newProfitItem = {
		// 	id: Math.floor(Math.random() * 200),
		// 	profit: newProfit,
		// 	targetPrice: newTargetPrice,
		// 	amountToBuy: amountToBuy,
		// };
		this.profits.push(new Profit(newProfit, newTargetPrice, amountToBuy));
	}

	@action.bound
	public updateProfit(profit: ProfitType, profitValue: number | null) {
		const chanchedProfit = this.profits.find(
			(chP: ProfitType) => chP.id === profit.id,
		);
		chanchedProfit.profit = profitValue;
	}

	@action.bound public setTargetPrice(
		profit: ProfitType,
		newTargetPrice: number,
	) {
		const chanchedTargetPrice = this.profits.find(
			(chP: ProfitType) => chP.id === profit.id,
		);
		chanchedTargetPrice.targetPrice = newTargetPrice; // this.
	}

	@computed get totalTargetPrice(): number {
		return this.price + (this.price / 100) * this.profits[0].profit;
	}

	@action.bound public deleteProfitItem(profit: ProfitType) {
		this.profits.splice(this.profits.indexOf(profit), 1);
	}

	@action.bound public clearProfits = () => {
		this.profits = [];
	};

	@computed get lastProfitNumber() {
        if(this.profits.length){
           return this.profits[this.profits.length - 1].profit;
        }
		
	}

	// projected profit по одному target'у = side === 'buy' ? target amount * (target price - formPrice) : amount * (formPrice - target price),

	@computed get progectedProfit() {
		if (this.profits.length) {
			let currentProfit = this.profits[0].targetPrice;            
			return this.activeOrderSide === "buy"
				? this.amount * (currentProfit - this.price)
				: this.amount * (this.price - currentProfit);
		}
		return 0;

		// let currentAmount=this.profits[0].amountToBuy;
		// return currentAmount*(currentProfit - this.price) / currentAmount*(this.price-currentProfit);
	}

	@computed get finishedAmount() {
		const allAmount = this.profits.reduce(
			(accum: number, item: { amountToBuy: number }) =>
				accum + item.amountToBuy,
			0,
		);
		return allAmount;
	}

	@action recalculateAmountToBuy = () => {
		this.profits.sort(function (a: ProfitType, b: ProfitType) {
			return b.amountToBuy - a.amountToBuy;
		});
		let min = this.profits[0].amountToBuy;
		let max = this.profits[this.profits.length - 1].amountToBuy;
	};

	@computed get lastProfit() {
		return this.profits[this.profits.length - 1];
	}
}

export default class Profit {
	id: number = Math.floor(Math.random() * 200);
	root: RootStore | undefined;
	placeOrderStore: PlaceOrderStore | undefined;

	@observable profit: number = 2;
	@observable targetPrice: number = 0;
	@observable amountToBuy: number = 100;

	constructor(
		newProfit: number,
		newTargetPrice: number,
		amountToBuy: number,
	) {
		this.profit = newProfit;
		this.targetPrice = newTargetPrice;
		this.amountToBuy = amountToBuy;
	}
	// @action getName = (): void => {
	// 	if (this.root?.placeOrderStore.price) {
	// 		this.targetPrice = this.root.placeOrderStore.price ;
	// 	}
	// };
	// @action.bound public updateProfit(profitNumber: number) {
	// 	this.profit = profitNumber;
	// }
	// @action.bound public setTargetPrice(price: number) {
	// 	this.targetPrice = price + (price / 100) * this.profit;
	// }
	// @action.bound public setAmountToBuy(amountToBuy: number) {
	// 	this.profit = amountToBuy;
	// }
}

export class RootStore {
	placeOrderStore: PlaceOrderStore = new PlaceOrderStore();
	// profit: Profit = new Profit();
	// constructor() {
	// 	this.placeOrderStore = new PlaceOrderStore();
	// 	this.profit = new Profit(this);
	// }
}
