import { observable, computed, action } from "mobx";
import { OrderSide, ProfitType } from "../model";
import Profit, { ProfitStore } from "./ProfitStore";

export class PlaceOrderStore {
	@observable activeOrderSide: OrderSide = "buy";
	@observable price: number = 0;
	@observable amount: number = 0;
	@observable profitsArr: any = [];
	@observable isTakeProfit: boolean = false;
	@observable profitTargetNumber: number[] = [0];
	@observable projectedProfit: number | string = 0;
	root: RootStore | undefined;

	@computed get total(): number {
		return this.price * this.amount;
	}

	@computed get profits() {
		return this.profitsArr;
	}

	@action.bound
	public toggleTakeProfit(isTakeProfit: boolean) {
		this.isTakeProfit = !isTakeProfit;
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

    @computed get newCurrentTargetPrice(){
		let lastProfit = this.profits[this.profits.length - 1];
		let newProfit = lastProfit ? lastProfit.profit + 2 : 2;
		let newTargetPrice = this.price + (this.price / 100) * newProfit;
        return newTargetPrice;
	}

	@action.bound public setProfits() {		
		let amountToBuy = this.profits.length ? 20 : 100;
		this.profits.push(new Profit( this.newCurrentTargetPrice, amountToBuy));
	}

	@action.bound
	public updateProfit(id: number, profitValue: number | null) {
		const chanchedProfit = this.profits.find(
			(chP: ProfitType) => chP.id === id,
		);
		chanchedProfit.profit = profitValue;
	}

	@action.bound public setTargetPrice(
		id: number,
		newTargetPrice: number,
	) {
		const chanchedTargetPrice = this.profits.find(
			(chP: ProfitType) => chP.id === id,
		);
		chanchedTargetPrice.targetPrice = newTargetPrice; // this.
	}

	@action.bound public changeAllTotalTargetPrice() {
		this.profits.forEach((element: ProfitType) => {
			element.targetPrice =
				this.price + (this.price / 100) * element.profit;
		});
	}
	@computed get totalTargetPrice(): number {
		return this.price + (this.price / 100) * this.profits[0].profit;
	}

	@action.bound public deleteProfitItem(profit: ProfitType) {
		this.profits.splice(this.profits.indexOf(profit), 1);
	}

	@action.bound public clearProfits = () => {
		this.profitsArr = [];
	};

	@computed get lastProfitNumber() {
		if (this.profits.length) {
			return this.profits[this.profits.length - 1].profit;
		}
	}

	@computed get progectedProfit() {
		if (this.profits.length) {
			let currentProfit = this.profits[0].targetPrice;			
			return this.activeOrderSide === "buy"
				? this.amount * (currentProfit - this.price)
				: this.amount * (this.price - currentProfit);
		}
		return 0;
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

export class RootStore {
	placeOrderStore: PlaceOrderStore = new PlaceOrderStore();
	profit: ProfitStore = new ProfitStore();
}
