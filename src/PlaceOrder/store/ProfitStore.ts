import { observable, computed, action } from "mobx";
import { OrderSide, ProfitType } from "../model";
import { PlaceOrderStore, RootStore } from "./PlaceOrderStore";

export class ProfitStore {}

export default class Profit {
	readonly id: number | undefined;
	root: RootStore | undefined;
	placeOrderStore: PlaceOrderStore | undefined;
	@observable profit: number;
	@observable public targetPrice: number = 0;
	@observable public amountToBuy: number = 100;

	constructor(newTargetPrice: number, amountToBuy: number) {
		this.id = Profit.generateId();
		this.profit = Profit.generateNextProfitNumber();
		this.targetPrice = newTargetPrice;
		this.amountToBuy = amountToBuy;
	}
	static nextId = 1;
	static generateId() {
		return this.nextId++;
	}

	static nextProfit = 0;
	static generateNextProfitNumber() {
		return (this.nextProfit = this.nextProfit + 2);
	}
}
