export class Item {
    id:number;
    category:string;
    productName:string;
    price:number;
    quantityLeft:number;

    static from(obj: ItemRow)
    {
        const item = new Item(
            obj.id, obj.category, obj.product_name,obj.price,obj.quantity_left
        );
        return item;
    }

    constructor(id, category, productName, price, quantityLeft)
    {
        this.id = id;
        this.category = category;
        this.productName = productName;
        this.price = price;
        this.quantityLeft = quantityLeft;
    }
}

export interface ItemRow {
    id:number;
    category:string;
    product_name:string;
    price:number;
    quantity_left:number;
}