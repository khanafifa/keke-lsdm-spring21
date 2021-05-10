import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KekeService {
 /*  url_us = "https://lmw0pwsk70.execute-api.us-east-2.amazonaws.com/production/usitems?";
  url_uk = "https://lmw0pwsk70.execute-api.us-east-2.amazonaws.com/production/ukitems?";
  url_aus = "https://lmw0pwsk70.execute-api.us-east-2.amazonaws.com/production/ausitems?"; */

  common_url = "https://lmw0pwsk70.execute-api.us-east-2.amazonaws.com/production/"
  
   private content: BehaviorSubject<any> = new BehaviorSubject("Default data");
   public addedMealItems = this.content.asObservable();

   private selectedItems = new Subject<any>();
   itemsforCalorie$ = this.selectedItems.asObservable();


  constructor(private http: HttpClient) { }

   //get all the product catalog
   getProducts(val, country){
     let url;
     if (country == "us"){
       url =  `${this.common_url}usitems?foodName=${val}`;
     }
     if(country == "uk"){
       url =  `${this.common_url}ukitems?foodName=${val}`;
     }
     if(country == "aus"){
       url =  `${this.common_url}ausitems?foodName=${val}`;
     }
     return this.http.get(url);

  }

  //get added Meal items
  getMealItemsforCalorie(item){
    this.selectedItems.next(item);
  }

}

 