import { observable, computed, action } from "mobx";

import { OrderSide } from "../model";
import { ProfitType } from "./Profit";


export class PlaceOrderStore {
	@observable activeOrderSide: OrderSide = "buy";
	@observable price: number = 0;
	@observable amount: number = 0;
	@observable profits: any = [
		{ id: 1, profit: 2, targetPrice: 0, amountToBuy: 100 },
	];

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

	@action.bound
	public setProfits() {		
		let lastProfit = this.profits[this.profits.length - 1];
		let newProfit = {
			id: Math.floor(Math.random() * 200),
			profit: lastProfit? lastProfit.profit + 2: 2,
			targetPrice: 0,
			amountToBuy: 100,
		};
		this.profits.push({ ...newProfit });
	}

	@action deleteProfitItem = (profit: ProfitType) => {
		this.profits.splice(this.profits.indexOf(profit), 1);
	};
    @action clearProfits=()=>{
        this.profits.splice(1)
    }
}

// export default class Profit {
//      id = Math.floor(Math.random() * 20);

// 	@observable profit: number = 2;
// 	@observable targetPrice: number = 0;

// 	@observable amountToBuy: number = 100;

// 	constructor(id:number, profit: number, targetPrice: number, amountToBuy: number) {
//         this.id=id;
// 		this.profit = profit;
// 		this.targetPrice = targetPrice;
// 		this.amountToBuy = amountToBuy;
// 	}

// 	@action
// 	updateProfit = (profit: number) => {
// 		this.profit = profit;
// 	};
// }
