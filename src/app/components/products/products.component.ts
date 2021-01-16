import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl, FormGroup, RequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

export interface AddProduct {
  productName: string;
  imageUrl: string;
  productPrice: string;
}

export interface Product {
  id:string; 
  productName: string;
  imageUrl: string;
  productPrice: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  userAdmin: boolean = true;

  addProductForm = new FormGroup({
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productImage: new FormControl('')
  });

  adminForm = new FormGroup({
    email: new FormControl(''),
  });
  
  private productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productList: Product[] = [];
  loadedProducts:boolean = false;
  constructor(
    public fns: AngularFireFunctions,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) {
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        user.getIdTokenResult().then(result=>{
          this.userAdmin = result.claims.admin
        })
      }
    })
    this.productsCollection = afs.collection<Product>('products');
    this.products = this.productsCollection.valueChanges({idField: 'id'});
    
    this.products.subscribe((list:Product[])=>{
      this.productList = list
      this.loadedProducts = true;
    })
  }

  async addProduct(product: AddProduct) {
    await this.productsCollection.add(product as Product)
    .catch(err=>console.log(err));
  }

  // async removeProduct(product: Product) {
  //   await this.productsCollection.ref.where().get().subscribe((querySnaoshot)=>{

  //   })
  //   .doc().delete()
  //   .then(value=>console.log(value))
  //   .catch(err=>console.log(err));
  // }
  
  async submitProduct(){
    const product: AddProduct = {
      productName: this.addProductForm.get('productName')?.value, 
      productPrice: this.addProductForm.get('productPrice')?.value, 
      imageUrl: this.addProductForm.get('productImage')?.value 
    }
    await this.addProduct(product).finally(()=>{
      const modal = document.getElementById("productModal")
      if (modal) {
        modal.style.display = "none"
      }
      document.getElementsByClassName('modal-backdrop')[0].remove()
      document.getElementsByTagName('body')[0].classList.remove('modal-open')
    })
  }

  setUserAsAdmin() {
    const email = this.adminForm.get('email')?.value;
    this.fns.httpsCallable('addAdminToUser')({email}).subscribe(result=>{
      console.log(result)
    })
  }

}
