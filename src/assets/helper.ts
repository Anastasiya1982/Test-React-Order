export function  convertPercentToNumber(number:number, percent:number) {
	// var percent = "30"; // Необходимый процент
	var number_percent = (number / 100) * percent;

	return Number(number_percent) + Number(number);
}