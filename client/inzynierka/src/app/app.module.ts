import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { FiltersComponent } from './components/shop-cart/filters/filters.component';
import { ProductListComponent } from './components/shop-cart/product-list/product-list.component';
import { CartComponent } from './components/shop-cart/cart/cart.component';
import { CartItemComponent } from './components/shop-cart/cart/cart-item/cart-item.component';
import { ProductComponent } from './components/shop-cart/product-list/product/product.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // info
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AccountComponent } from './components/account/account.component';
import { ApiHelperService } from './services/api-helper.service';
import { AddressComponent } from './components/address/address.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MyProductsComponent } from './components/my-products/my-products.component';
import { CategoryProductListComponent } from './components/shop-cart/category-product-list/category-product-list.component';
import { PriceProductListComponent } from './components/shop-cart/price-product-list/price-product-list.component';
import { SearchProductListComponent } from './components/shop-cart/search-product-list/search-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ShopCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AddressComponent,
    ProductViewComponent,
    AddProductComponent,
    MyProductsComponent,
    CategoryProductListComponent,
    PriceProductListComponent,
    SearchProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiHelperService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
