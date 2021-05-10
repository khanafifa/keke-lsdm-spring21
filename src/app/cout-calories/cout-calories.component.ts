import { Component, OnInit, Inject} from '@angular/core';
import {KekeService} from '../keke.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogDataCalories {
  meal: string;
  products: [] ;
  calories: any;
} 

@Component({
  selector: 'app-cout-calories',
  templateUrl: './cout-calories.component.html',
  styleUrls: ['./cout-calories.component.css']
})
export class CoutCaloriesComponent implements OnInit {

  productdata =[]
  selectedItem=[];
  mealItems = [];
  selectedMeal: string = '';
  total = 0;
  productName: string;
  data = []
  country_cc : string;
  statusCheck = false;
  itemAvailable = true;
  isLoading = false;
  numItemsAdded = 0;

 

  constructor(public dialog: MatDialog, private appService: KekeService) { }

  ngOnInit(): void {
    this.country_cc = 'us';
    this.appService.itemsforCalorie$.subscribe(item=>{
      this.selectedItem = item});
/*     this.appService.addedMealItems.subscribe(x => this.mealItems = x);
    console.log("Calories count for add meals", this.mealItems); */

     /* this.productdata = [
      {
        "calories": "177",
        "allergen": "Fish (A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural Diet)",
        "ingredients": "Color Added: A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural DietAllergensFish (A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural Diet)",
        "ID": "1",
        "productname": "Atlantic Salmon Fillet"
      },
        {
        "calories": "95",
        "allergen": "No Allergen",
        "ingredients": "Organic Honeycrisp Apple",
        "ID": "2",
        "productname": "Organic Honeycrisp Apple"
      },
        {
        "calories": "80",
        "allergen": "No Allergen",
        "ingredients": "Avocado",
        "ID": "3",
        "productname": "Organic Large Hass Avocado"
      },
        {
        "calories": "8",
        "allergen": "No Allergen",
        "ingredients": "Celery",
        "ID": "4",
        "productname": "Organic Bunched Celery"
      },
        {
        "calories": "117",
        "allergen": "No allergen",
        "ingredients": "Honeycrisp Apple",
        "ID": "5",
        "productname": "Honeycrisp Apple"
      },
        {
        "calories": "1.4",
        "allergen": "No allergen",
        "ingredients": "Organic Italian Parsley",
        "ID": "6",
        "productname": "Organic Italian Parsley Bunch"
      },
        {
        "calories": "210",
        "allergen": "No Allergen",
        "ingredients": "Chicken, Salt, Organic Black Pepper.  ",
        "ID": "7",
        "productname": "Classic Rotisserie Chicken"
      },
        {
        "calories": "210",
        "allergen": "Soy (Flash Fried in Organic Expeller Pressed Soybean Oil To Set Breading), Wheat (Unbleached Wheat Flour)",
        "ingredients": "Chicken Breast Meat Tenders., Marinated in Water and Sea Salt., Breaded With Unbleached Wheat Flour, Water, Cane Sugar, Dried Yeast, Sea Salt, Black Pepper, Paprika., Flash Fried in Organic Expeller Pressed Soybean Oil To Set BreadingAllergensSoy (Flash Fried in Organic Expeller Pressed Soybean Oil To Set Breading), Wheat (Unbleached Wheat Flour)",
        "ID": "8",
        "productname": "Chicken Tenders"
      },
        {
        "calories": "82",
        "allergen": "Fish (Farm Raised Tilapia Fillet)",
        "ingredients": "Fresh, Farm Raised Tilapia FilletAllergensFish (Farm Raised Tilapia Fillet)",
        "ID": "9",
        "productname": "Tilapia Fillet"
      }
    ]
    console.log("productdata",this.productdata);  */
    
  }
  /**Method to select country */
  selectCountryCC(event: any){
    this.country_cc = event.target.value
  }
    /**Method to search products */
    searchProductstoCountCalories(value){
      this.isLoading = true;
      this.productName = value
      this.getProductsDetails(this.productName)
    }
    /**get products using api based on search */
     getProductsDetails(name){
       let ctry = this.country_cc
      this.appService.getProducts(name,ctry).subscribe((results: any) => {
        if(results.statusCode == 200){
          this.isLoading = false;
          this.statusCheck = true;
          if(results.body.length === 0){
            this.itemAvailable = false;
          }else{
            this.itemAvailable = true;
            this.data = results.body;
            this.productdata = this.data;
          }
        }
        
      });
  
    }
  /**Method to add selected items for a meal to the array */
  onSelectItemClick(item){
    this.selectedItem.push(item)
    this.numItemsAdded++;
  }

   /**Method to Select Meal(Breakfast, lunch etc) */
  selectMeal(event: any){
    this.selectedMeal = event.target.value;
  }

  /**Method to Calculate total Calories */
  calculateTotalCalories(){
    this.total =0 ;
    this.selectedItem.forEach((item) =>{
      this.total += parseInt(item.calories);
    })
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '450px',
      data: {meal: this.selectedMeal,
        products : this.selectedItem,
        calories:this.total
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.selectedItem = []
      this.numItemsAdded = 0;
    })
    
  }

/*   CalculateService(){
    this.appService.getMealItemsforCalorie(this.selectedItem)
  } */
 
}

/**Dialog component */
 @Component({
  selector: 'calories-dialog',
  templateUrl: 'calories-dialog.html',
  styleUrls: ['calories-dialog.css']
})

export class DialogDataExampleDialog implements OnInit{
  constructor( public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCalories) {}

    ngOnInit(): void {
    }
    
    onOkClick(): void {
      this.dialogRef.close();
    }
} 
 
