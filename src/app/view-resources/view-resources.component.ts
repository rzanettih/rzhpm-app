import { Component, OnInit, ViewChild } from '@angular/core';
import { Resource } from '../shared/resource.model';
import { ResourceService } from '../shared/services/resource.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrencyConverterService } from '../shared/services/currency-converter.service';
import { ToastrService } from 'ngx-toastr';
import { EditResourceComponent } from './edit-resource/edit-resource.component';

 
@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html'
})
export class ViewResourcesComponent implements OnInit {

  eurConversion: number;
  constructor(private service: ResourceService, private currencyService: CurrencyConverterService, private toastr: ToastrService, private database: AngularFirestore) { }

  ngOnInit() { 
    this.currencyService.getLastActiveCurrency().then(currency => {
      this.eurConversion = currency.amountAgainstUSD;
    });

    this.service.getAllResources().subscribe(returnArray => {
        this.service.listOfAllResources = returnArray.map(item => {
            return {
              ...item.payload.doc.data(),
              id: item.payload.doc.id
            } as Resource;

          }); 

          this.filterListByText("");

      });

      
    
  }

  onFilter(event: any){
    // console.log(event.target.value);
    this.filterListByText(event.target.value);

  }

  filterListByText(text: string){
    
    let promise = new Promise((result) => {
      let qtt: number = 0;
      this.service.listOfAllResourcesFiltered = this.service.listOfAllResources.map(resource => {
        if(
            resource.fullName.toLowerCase().indexOf(text.toLowerCase()) >= 0 
            || resource.email.toLowerCase().indexOf(text.toLowerCase()) >=0 
            || (resource.vendor && resource.vendor.toLowerCase().indexOf(text.toLowerCase()) >= 0)
            || (resource.internal && 'internal'.indexOf(text.trim().toLowerCase()) >= 0)
            || text.trim() == ""){
            
            qtt++;
            return resource;
        }

      });
      result(qtt);
    });

    promise.then(qtt => {
      document.getElementById('lblQttFiltered').innerText = 'Showing ' + qtt + ' of ' + this.service.listOfAllResources.length;
    });
   
  }

  @ViewChild('editResourceComponent') _editResourceComponent: EditResourceComponent;

  onEditResource(resource: Resource){
    // alert(`Not implemented yet. You want to edit the resource ${resource.fullName}`);
    this.service.resourceBeingEdited = resource;
    this._editResourceComponent.showResouceToEdit();
    // console.log(resource);
  }

  onDeleteResource(resource: Resource){
    // this is not yet implemented. it's probably more likely to keep the resource there than removing it
    // to consider: inactivating the resource could be an option so it doesn't show up when assigning resources to projects
    console.log(resource);
  }

  

}
