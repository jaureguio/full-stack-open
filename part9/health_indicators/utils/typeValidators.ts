/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isNumeric = (val: any): val is number => 
	!Number.isNaN(val) && typeof val === 'number';

export const isNumericList = (list: any[]): list is number[] => 
	list.every(isNumeric);

export const validNumberList = (input: any): number[] => {
	if(!(Array.isArray(input) && input.length && isNumericList(input))) {
		throw new Error("incorrect value type");
	}
	return input;
};

export const validNumber = (val: any): number => {
	if(!isNumeric(val)) {
	throw new Error("type of value is not 'number'"); 
	}
	return val;
};