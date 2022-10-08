import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cart",component:CartComponent},
  {path:"product",component:ProductsComponent},
  {path:"product/:id",component:ProductDetailsComponent},
  {path:"payment",component:PaymentComponent,canActivate:[AuthGuard]},
  {path:"auth",
  loadChildren:()=>import("../app/auth/auth.module").then(m=>m.AuthModule)
},
  {path:"**",component:NotFoundPageComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }