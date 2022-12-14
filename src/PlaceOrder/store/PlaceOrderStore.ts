import { observable, computed, action, autorun, reaction } from "mobx";
import { OrderSide, ProfitType } from "../model";
import Profit, { ProfitStore } from "./ProfitStore";

export class PlaceOrderStore {
	@observable activeOrderSide: OrderSide = "buy";
	@observable price: number = 0;
	@observable amount: number = 0;
	@observable profitsArr: any = [];
	@observable isTakeProfit: boolean = false;
	@observable projectedProfit: number = 0;
	@observable isProfitNumberLimit: any = {
		isError: false,
		message: "Maximum profit sum is 500%",
	};
	@observable isAmountLimit: any = {
		isError: false,
	};
	root: RootStore | undefined;

	@computed get total(): number {
		return this.price * this.amount;
	}

	@computed get decreseNumber() {
		return this.finishedAmount - 100;
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

	@computed get lastProfitNumber() {
		let lastProfit = this.profits[this.profits.length - 1];
		let newProfit = lastProfit ? lastProfit.profit + 2 : 2;
		return newProfit;
	}

	@computed get newCurrentTargetPrice() {
		let newTargetPrice =
			this.price + (this.price / 100) * this.lastProfitNumber;
		return newTargetPrice;
	}

	@action.bound public setProfits() {
		let amountToBuy = this.profits.length ? 20 : 100;
		this.profits.push(
			new Profit(
				this.lastProfitNumber,
				this.newCurrentTargetPrice,
				amountToBuy,
			),
		);
		if (this.finishedAmount) {
			this.recalculateAmountToBuy();
		}
	}

	@action.bound
	public updateProfit(id: number, profitValue: number | null) {
		const chanchedProfit = this.profits.find(
			(chP: ProfitType) => chP.id === id,
		);
		chanchedProfit.profit = profitValue;
	}

	@action.bound public setTargetPrice(id: number, newTargetPrice: number) {
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

	@action.bound public setProfitValue(id: number, value: number) {
		const chanchedProfit = this.profits.find(
			(pr: ProfitType) => pr.id === id,
		);

		chanchedProfit.profit = value;
	}

	@action.bound
	public setAmountToBuy(id: number, value: number) {
		const chanchedAmountToBuy = this.profits.find(
			(pr: ProfitType) => pr.id === id,
		);
		chanchedAmountToBuy.amountToBuy = value;
	}

	@computed get progectedProfit() {
		if (this.profits.length) {
			let currentProfit = this.profits[0].targetPrice;
			return this.activeOrderSide === "buy"
				? (this.amount * (currentProfit - this.price)).toFixed(1)
				: (this.amount * (this.price - currentProfit)).toFixed(1);
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

	@computed get finishedProfitNumber() {
		const allProfits = this.profits.reduce(
			(accum: number, item: { profit: number }) => accum + item.profit,
			0,
		);
		return allProfits;
	}

	@action.bound public recalculateAmountToBuy = () => {
		this.profits.sort(function (a: ProfitType, b: ProfitType) {
			return b.amountToBuy - a.amountToBuy;
		});
		let max = this.profits[0].amountToBuy;
		let min = this.profits[this.profits.length - 1].amountToBuy;
		let numberToDeduct = this.finishedAmount - 100;
		this.profits[0].amountToBuy =
			this.profits[0].amountToBuy - numberToDeduct;
	};

	@computed get lastProfit() {
		return this.profits[this.profits.length - 1];
	}

	@action.bound public setProfitsLimitError(value: boolean) {
		this.isProfitNumberLimit.isError = value;
	}

	@action.bound public setAmountLimitError(value: boolean) {
		this.isAmountLimit.isError = value;
	}
}

export class RootStore {
	placeOrderStore: PlaceOrderStore = new PlaceOrderStore();
	profit: ProfitStore = new ProfitStore();
}
