export class Menu {
    public _id:string;
    public name:string;
    public price:number;
    public quantity:number = 1;
    public initial_menu;
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
    order_no: number;
    subtotal: number;
    total: number;
    special_instructions: string;
    status: string;
    card_token: string;
    card_id: string;
    created_on: Date;
    created_time: Date;
    delivery_date: Date;
    delivery_time: {hour, minute};
    public buyer:Customer = new Customer();
    public receiver:Customer = new Customer();
    public menuItems:MenuItem[] = [];   
}

// export class Delivery {
//     public method:String = "PickUp";
//     public name:String;
//     public phone:String;
//     public email:String;
//     public address:String;
//     public city:String;
//     public country:String;
//     public instruction:String;    
// }

export class Customer {
    public name:String;
    public phone:String;
    public email:String;
    public address:String;
    public city:String;
    public country:String;
    public instruction:String;    
}

export class User {
    constructor(
        private email = 'wannet@yahoo.com',
        private password = 'wannet',
        private token = '',
    ) {}

}

export class SearchCriteria {
    order_no: string;
    phone: string;
}