import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {KekeService} from '../keke.service';


export interface DialogData {
  productname: string;
  ingredients: string;
  allergen: string;
  calories: string;
  dietPreference: string;
  emojitoshow: string
}

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  productdata =[]
  selectedItem = []
  productName: string;
  data = []
  addedItems = []
  statusCheck = false;
  itemAvailable = true;
  isLoading = false;
  country: string;
  dietMatch = false;
  titleCaseString: any;
  splitAllergiesString = [];
  allergies_list = ['dairy','gluten','vegan','nuts','peanuts','shellfish','fish','soy','eggs']
  allergies_selected = []

  allergiesArray_dairy = ['milk','milk powder','cheese','butter','buttermilk','margarine','yoghurt','cream',
  'icecream','custard','whey']
  allergiesArray_nuts = ['nuts','tree' ,'tree nuts','brazil','almonds','cashews','macadamia',
  'pista','pistachios','pine','walnuts','peanuts','shea','walnuts','pecans','pesto','hazelnuts']

  allergiesArray_peanuts = ['peanut','peanuts']
  allergiesArray_shellfish = ['shrimp','prawns','crab','crayfish','crawfish','lobster','squid','scallops','krill']

  allergiesArray_gluten = ['wheat','barley','rye','triticale','farina','spelt','kamut','farro','couscous','flour']

  allergiesArray_soy = ['soy','soybeans','tofu','tempeh','miso','edamame']
  allergiesArray_fish = ['fish','anchovies','caviar','omega-3','roe','shark','sushi']
  allergiesArray_eggs = ['eggs','egg','whites','eggnog','mayonnaise','meringue']
/* 
  allergiesArray_vegan = ['meat','beef','pork','lamb','poultry','chicken','duck','fish','shellfish','eggs','cheese','butter','milk',
'cream','icecream','mayonnaise', 'honey'
] */

allergiesArray_fpies = ['milk','soy','soybeans','rice','barley','oats']

  constructor(public dialog: MatDialog, private appService: KekeService) { }

  ngOnInit(): void {
    this.country = 'us';
   /* this.productdata = [
      {
        "calories": "177",
        "allergen": "Fish (A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural Diet)",
        "ingredients": "Color Added: A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural DietAllergensFish (A Synthesized Carotenoid Added as An Ingredient To the Feed of Farmed Salmon To Achieve the Familiar Reddish-orange Color Salmon in the Wild Develop from Eating the Carotenoids Found in Their Natural Diet)",
        "ID": "1",
        "Name": "Atlantic Salmon Fillet"
      },
        {
        "calories": "95",
        "allergen": "No Allergen",
        "ingredients": "Organic Honeycrisp Apple",
        "ID": "2",
        "Name": "Organic Honeycrisp Apple"
      },
        {
        "calories": "80",
        "allergen": "No Allergen",
        "ingredients": "Avocado",
        "ID": "3",
        "Name": "Organic Large Hass Avocado"
      },
        {
        "calories": "8",
        "allergen": "No Allergen",
        "ingredients": "Celery",
        "ID": "4",
        "Name": "Organic Bunched Celery"
      },
        {
        "calories": "117",
        "allergen": "No allergen",
        "ingredients": "Honeycrisp Apple",
        "ID": "5",
        "Name": "Honeycrisp Apple"
      },
        {
        "calories": "1.4",
        "allergen": "No allergen",
        "ingredients": "Organic Italian Parsley",
        "ID": "6",
        "Name": "organic italian parsley bunch"
      },
        {
        "calories": "210",
        "allergen": "No Allergen",
        "ingredients": "Chicken, Salt, Organic Black Pepper.  ",
        "ID": "7",
        "Name": "classic rotisserie chicken"
      },
        {
        "calories": "210",
        "allergen": "Soy (Flash Fried in Organic Expeller Pressed Soybean Oil To Set Breading), Wheat (Unbleached Wheat Flour)",
        "ingredients": "Chicken Breast Meat Tenders., Marinated in Water and Sea Salt., Breaded With Unbleached Wheat Flour, Water, Cane Sugar, Dried Yeast, Sea Salt, Black Pepper, Paprika., Flash Fried in Organic Expeller Pressed Soybean Oil To Set BreadingAllergensSoy (Flash Fried in Organic Expeller Pressed Soybean Oil To Set Breading), Wheat (Unbleached Wheat Flour)",
        "ID": "8",
        "Name": "chicken tenders"
      },
        {
        "calories": "82",
        "allergen": "Fish (Farm Raised Tilapia Fillet)",
        "ingredients": "Fresh, Farm Raised Tilapia FilletAllergensFish (Farm Raised Tilapia Fillet)",
        "ID": "9",
        "Name": "tilapia fillet"
      }
    ]
    console.log("productdata",this.productdata);   */
  }

  /**Method to select country */
  selectCountry(event: any){
    this.country = event.target.value
  }

  /**Method to select allergies */
  selectAllergies(event: any){
    if(event.target.checked == true){
    this.allergies_selected.push(event.target.value);
    }else if (event.target.checked == false){
      this.allergies_selected.forEach((element,index)=>{
        if(element==event.target.value) this.allergies_selected.splice(index,1);
     });
    }
  }

  /**Method to search products */
  searchProducts(value){
    this.isLoading = true;
    this.productName = value
    this.getProductsDetails(this.productName)
  }
  /**get products using api based on search */
  getProductsDetails(name){
    let ctry = this.country
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
  /*method to check allergies */
  containsAllergies(item){
    let removedSpecialcharacters;
    removedSpecialcharacters = item.toLowerCase().replace(/[^\w\s]/gi, '')
    this.splitAllergiesString = removedSpecialcharacters.split(" ");
    let allergySearch;
    for (let i = 0;i< this.allergies_selected.length;i++){
      for (let j = 0; j < this.splitAllergiesString.length; j++) {
        allergySearch = 'allergiesArray_'+this.allergies_selected[i]
        this.dietMatch = allergySearch.includes(this.splitAllergiesString[j]);
        if(this.dietMatch === true){
          return this.dietMatch
        }
    }
    }
    
  
      /* this.splitString.forEach(element => {
       this.dietMatch = this.allergiesArray_dairy.includes(element);
        if(this.dietMatch == true){
          return this.dietMatch
        }
        console.log("Contains allergies", this.allergiesArray_dairy.includes(element))
      });  */
    
  }
  /*show product details */
  onSelectDetails(someitem){
    let matchesDietPreference,emoji;
    matchesDietPreference= this.containsAllergies(someitem.allergen)
    if(matchesDietPreference == true){
      matchesDietPreference = "Contains allergens that does not match your diet preference"
      emoji = "bi bi-exclamation-triangle warning"
    }else{
      matchesDietPreference = "No trace of allergens"
      emoji = "bi bi-patch-check-fill safe"
    }
    someitem.name= someitem.name.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '450px',
      height:'500px',
      data: {productname: someitem.name,
        allergen: someitem.allergen,
        calories:someitem.calories,
        ingredients:someitem.ingredients,
        dietPreference: matchesDietPreference,
        emojitoshow:emoji

      }
    });
  } 


}
 /*dialog component for displaying product details */
 @Component({
  selector: 'dialog-details',
  templateUrl: 'dialog-details.html',
  styleUrls: ['dialog-details.css']
})
export class DialogDataExampleDialog {
  constructor( public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}
 