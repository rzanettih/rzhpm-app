import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateCalculation } from '../shared/project.model';
import { ProjectService } from '../shared/services/project.service';
import { CurrencyConverterService } from '../shared/services/currency-converter.service';
import { CurrencyConverter } from '../shared/currency-converter.model';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  constructor(private projectService: ProjectService, private currencyService: CurrencyConverterService) { }

  private dateCalculationObj: any;
  private currencyCalculationObj: any;
  private lastCurrency: CurrencyConverter;

  ngOnInit() {
    this.resetDateCalculation();
    this.resetCurrencyCalculation();  
  }

  resetDateCalculation() {
    this.dateCalculationObj = {
      date1: null,
      date2: null,
      workingDays: null,
      hours: null
    };
  }

  resetCurrencyCalculation(){
    this.currencyCalculationObj = {
      amountInUSD: null,
      EURDividedBy8: null,
      amountInEUR: null,
      USDDividedBy8: null,
      calculated: false
    }
    
    let checkUSD = document.getElementById('chkDivideUSDBy8');
    let checkEUR = document.getElementById('chkDivideEURBy8');
    (<HTMLInputElement>checkUSD).checked = false;
    (<HTMLInputElement>checkEUR).checked = false;
  }

  onSubmitDateCalculation(form: NgForm) {
    if(!this.projectService.listOfAllHolidays || this.projectService.listOfAllHolidays.length <= 0) {
      this.projectService.getAllHolidays();
    }

    // assumption is that the form is already valid using the basic validation from the HTML elements
    this.dateCalculationObj.workingDays = DateCalculation.workingDaysBetweenDates(this.dateCalculationObj.date1, this.dateCalculationObj.date2, this.projectService.listOfAllHolidays);
    this.dateCalculationObj.hours = (this.dateCalculationObj.workingDays && this.dateCalculationObj.workingDays > 0 ? this.dateCalculationObj.workingDays * 8 : null);
  }

  onSubmitCurrency(form: NgForm, isUSDFirst?: boolean){

    this.currencyService.getLastActiveCurrency().then(lastCurr => {
      this.lastCurrency = lastCurr;
    }).finally(() => {

      if(isUSDFirst){
        // convert USD to EUR
        this.currencyCalculationObj.amountInEUR = (this.currencyCalculationObj.amountInUSD / this.lastCurrency.amountAgainstUSD).toFixed(4);
      } else {
        // convert EUR to USD
        this.currencyCalculationObj.amountInUSD = (this.currencyCalculationObj.amountInEUR * this.lastCurrency.amountAgainstUSD).toFixed(4);
      }

      this.currencyCalculationObj.EURDividedBy8 = (this.currencyCalculationObj.amountInEUR / 8).toFixed(4);
      this.currencyCalculationObj.USDDividedBy8 = (this.currencyCalculationObj.amountInUSD / 8).toFixed(4);
      this.currencyCalculationObj.calculated = true;

    });   
    

  }

}
