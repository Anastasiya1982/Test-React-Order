import { observable } from "mobx";

import { PlaceOrderStore, RootStore } from "./PlaceOrderStore";

export class ProfitStore {}

export default class Profit {
	readonly id: number | undefined;
	root: RootStore | undefined;
	placeOrderStore: PlaceOrderStore | undefined;
	@observable public profit: number;
	@observable public amountToBuy: number;
	@observable public targetPrice: number;

	constructor(profit: number, targetPrice: number, amountToBuy: number) {
		this.id = Profit.generateId();
		this.profit = profit;
		this.targetPrice = targetPrice;
		this.amountToBuy = amountToBuy;
		
	}
	static nextId = 1;

	static generateId() {
		return this.nextId++;
	}
}
