import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { newProduct } from '../dashboard/newproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
 prloader:BehaviorSubject<boolean>;
 searchResult:BehaviorSubject<any>;
   url:string="https://dummyjson.com/products";
   url2:string="http://localhost:3000/addproducts";
   httpOption;
  constructor(private http:HttpClient) { 
    this.prloader=new BehaviorSubject<boolean>(false)
<<<<<<< HEAD
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,Authorization: 'my-auth-token'
      })
    };
=======
    this.searchResult=new BehaviorSubject<any>([1,2,3]);
>>>>>>> 7032f1f293c03408a4d3646d14280f01edc658dc
  }


  getAllProducts(){
    return this.http.get<any>(this.url).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }
  getProductById(prodId:any){
    return this.http.get<any>(this.url+"/"+prodId).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
  }

  
  searchData(keyword:any){
       var data=this.http.get<any>(this.url+"/search?q="+keyword).pipe(catchError((err)=>{
      return throwError (()=>err.message ||"internal server error")
    }));
    data.subscribe(value=>{
      this.searchResult.next(value)
    })
    console.log(this.searchResult)
  }
  getsearchResultData(){
     return this.searchResult;
  }

getcategories(){
  return this.http.get<any>("https://dummyjson.com/products/categories").pipe(catchError((err)=>{
    return throwError (()=>err.message ||"internal server error")
  }));

}
saveproduct(product:any){
  return this.http.post(this.url2,product )
}
}
