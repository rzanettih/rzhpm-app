import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrencyConverter } from '../currency-converter.model';
import { NgForm } from '@angular/forms';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  itemData: CurrencyConverter;
  
  public currencyRootNode: string = "currency-conversor";

  constructor(private database: AngularFirestore) { }

  getCurrencies(){
    return this.database.collection(this.currencyRootNode, ref => ref.orderBy('timestamp', 'desc'))
      .snapshotChanges();
  }

  getLastActiveCurrency() : Promise<any> {
    let promise = new Promise((resolve) => {
      // get all items in an array
      this.getCurrencies().subscribe(returnArray => {

          returnArray.map(item => {
            let retItem = {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
              } as CurrencyConverter;

              if(retItem.dateInactivated == null){
                resolve(retItem);
              } else {
                retItem = null;
              }
          });
          resolve(null);
        });
    });

    return promise;
  }


  deactivateLastActiveCurrency() : Promise<any> {
    let promise = new Promise((resolve) => {
      this.getLastActiveCurrency().then(lastCurrency => {

        // the lastCurrency will return null in case there are no currencies in the database yet
        if(lastCurrency != null){
          let curr = Object.assign({}, lastCurrency);
          delete curr.id;

          curr.dateInactivated = new Date().toLocaleDateString('en-US');
          this.database.doc(this.currencyRootNode + '/' + lastCurrency.id).update(curr);
        }
        
        resolve(lastCurrency);
        
      });
    });

    return promise;
    
  }


}
