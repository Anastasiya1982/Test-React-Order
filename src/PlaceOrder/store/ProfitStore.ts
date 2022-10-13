import { observable, computed, action } from "mobx";
import { OrderSide, ProfitType } from "../model";
import { PlaceOrderStore, RootStore } from "./PlaceOrderStore";

export class ProfitStore {}

export default class Profit {
	readonly id: number | undefined;
	root: RootStore | undefined;
	placeOrderStore: PlaceOrderStore | undefined;
	@observable public profit: number;
	@observable public targetPrice: number;
	@observable public amountToBuy: number = 100;
	@observable public price: number;
	static price: number;

	constructor(price: number, amountToBuy: number) {
		this.id = Profit.generateId();
		this.profit = Profit.generateNextProfitNumber();
		this.targetPrice = Profit.generateTargetPrice();
		this.amountToBuy = amountToBuy;
		this.price = price;
	}
	static nextId = 1;
	static generateId() {
		return this.nextId++;
	}

	static nextProfit = 0;
	static generateNextProfitNumber() {
		return (this.nextProfit = this.nextProfit + 2);
	}
	static targetPrice = 0;
	static generateTargetPrice() {
		return (this.targetPrice =
			this.price + (this.price / 100) * this.nextProfit);
	}
}
