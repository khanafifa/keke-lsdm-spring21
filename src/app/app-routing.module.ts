import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchProductsComponent} from './search-products/search-products.component'
import {CoutCaloriesComponent} from './cout-calories/cout-calories.component'
import {HomeComponent} from './home/home.component'
import {AboutUsComponent} from './about-us/about-us.component'


const routes: Routes = [
  {
    path: 'search-component',
     component: SearchProductsComponent
  },
  {
     path: 'count-calories',
     component: CoutCaloriesComponent
   },
   {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'home',
     component: HomeComponent
  },
   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
