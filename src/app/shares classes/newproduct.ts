export class newProduct
{

        
        brand:string;
        category:string;
        title:string;
        description:string;
        numofitems:number;
        price:number;
        discound:number;
        images:string[];
        overview:string;
        sizes:string[];
        colors:string[];

        constructor(brand:string,category:string,title:string,description:string,numofitems:number,price:number,discound:number,images:any,overview:string,sizes:[],colors:[]){
            this.brand=brand;
            this.category=category;
            this.title=title;
            this.description=description;
            this.numofitems=numofitems;
            this.price=price;
            this.discound=discound;
            this.images=images;
            this.overview=overview;
            this.sizes=sizes;
            this.colors=colors;
        
            }
}