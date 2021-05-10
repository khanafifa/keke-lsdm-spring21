import { Component, OnInit, Input } from '@angular/core';
import {KekeService} from '../keke.service'

@Component({
  selector: 'app-calculate-calories',
  templateUrl: './calculate-calories.component.html',
  styleUrls: ['./calculate-calories.component.css']
})
export class CalculateCaloriesComponent implements OnInit {
  @Input() parentData: any;
selectedItems:any;
emptyArray = [];
total = 0;
  

  constructor(private appService: KekeService) { }

  ngOnInit(): void {

  this.appService.itemsforCalorie$.subscribe(item=>{
  console.log("selected items for calori coutn",item)
   this.selectedItems = item;
  })
  
  
   
 
   
  }
  Calculate(){
    this.selectedItems.forEach((item) =>{
      this.total += parseInt(item.calories);
    })
  }
  onClear(){
    this.total = 0;
    this.appService.getMealItemsforCalorie(this.emptyArray)
  }

}
