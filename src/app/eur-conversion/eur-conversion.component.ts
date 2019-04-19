import { Component, OnInit } from '@angular/core';
import { CurrencyConverter } from '../shared/currency-converter.model';
import { CurrencyConverterService } from '../shared/services/currency-converter.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { add } from 'ngx-bootstrap/chronos/public_api';
import { serializePath } from '@angular/router/src/url_tree';


@Component({
  selector: 'app-eur-conversion',
  templateUrl: './eur-conversion.component.html'
})
export class EurConversionComponent implements OnInit {
  list: CurrencyConverter[];
  lastCurrency: CurrencyConverter;
  constructor(private service: CurrencyConverterService, private database: AngularFirestore) { 
    
  }

  ngOnInit() {
    this.service.getCurrencies().subscribe(returnArray => {
      this.list = returnArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as CurrencyConverter;
      });
    });
    this.resetForm();

  }

  resetForm(form? : NgForm){
    if(form != null) form.resetForm();

    this.lastCurrency = this.service.itemData = {
      id: null,
      currency: null,
      dateInserted: null,
      amountAgainstUSD: null,
      dateInactivated: null,
      timestamp: null
    }

    this.service.getLastActiveCurrency().then(lastCurr => {
      this.lastCurrency = lastCurr;
      this.service.itemData.amountAgainstUSD = lastCurr != null ? lastCurr.amountAgainstUSD : null;
    });   
  }

  onSubmit(form: NgForm){
    //TODO: look for a way to have a global variable like on a web-config to store what's the locale

    let data = Object.assign({}, form.value);
    delete data.id;
    let lastAmount = this.lastCurrency != null ? this.lastCurrency.amountAgainstUSD : '';
       
    if(data.amountAgainstUSD != lastAmount){
      
      let currentDate = new Date();
      data.dateInserted = currentDate.toLocaleDateString('en-US');
      data.timestamp = currentDate.getTime();
            
      this.service.deactivateLastActiveCurrency()
      .then((curr) => {

        this.database.collection(this.service.currencyRootNode).add(data).then(res => {
          this.resetForm(form);
        });
        
      });
      
    } else {
      console.log("No currency was added: Same currency was informed");
    }

    
  }


}
