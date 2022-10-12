export type OrderSide = "buy" | "sell";

export interface ProfitType {
	id: number;
	profit: number;
	targetPrice: number;
	amountToBuy: number;
}
