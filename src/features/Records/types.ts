import { Account } from "../account/type";
import { Category } from "../category/types";

export type Record = {
    transactionId:string,
    categories:Category,
    transactionDate: string;
    description:string;
    amount:number;
    isIncome:boolean;
    accounts:Account
  };
  