export class Menu {
    public _id:string;
    public name:string;
    public price:number;
    public quantity:number = 1;
    public type:string;
}

export class MenuItem {
    public _id:string;
    public name:string;
    public price:number;
    public quantity:number;
    public type:string;
}

export class Order {    
    _id: string;
    discount: number;
    tax: number;
    subtotal: number;
    total: number;
    special_instructions: string;
    status: string;
    created_on: Date;
    created_time: Date;
    public delivery:Delivery = new Delivery();
    public menuItems:MenuItem[] = [];
    
}

export class Delivery {
    public method:String = "PickUp";
    public name:String;
    public phone:String;
    public address:String;
    public city:String;
    public instruction:String;    
}

export class User {
    constructor(
        private email = 'chinese@yahoo.com',
        private password = 'chinese',
        private token = '',
    ) {}

}