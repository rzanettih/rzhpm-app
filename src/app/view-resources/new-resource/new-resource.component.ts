import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/shared/services/resource.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Resource } from 'src/app/shared/resource.model';

@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html'
})
export class NewResourceComponent implements OnInit {

  constructor(private service: ResourceService, private toastr: ToastrService, private database: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null) form.resetForm();

    this.service.itemData = {
      id: null,
      timestamp: null,
      fullName: null,
      internal: false,
      email: null,
      vendor: null,
      rateHour: null
    }
  }

  onSubmit(form: NgForm){

    let formData = Object.assign({}, form.value);

    let resourceToAdd: Resource = {
      id: null,
      timestamp: new Date().getTime(),
      fullName: formData.fullName,
      internal: formData.internal,
      email: formData.email,
      vendor: formData.internal ? null : formData.vendor,
      rateHour: formData.rateHour
    };

    let btnCloseModal = document.getElementById('CloseAddResourceModal');
    let nameExists = this.nameExistsInList(resourceToAdd.fullName);
    
    if(!nameExists){

      // remove the ID element so it's not duplicated in the DB
      delete resourceToAdd.id;
            
      this.database.collection(this.service.resourceRootNode).add(resourceToAdd).then(res => {
        this.resetForm(form);
        if(btnCloseModal) btnCloseModal.click();

        this.toastr.success('The resource ' + resourceToAdd.fullName + ' was added');
      });
      
    } else {
      console.log("No resource was added");
      this.toastr.warning('No resource was added: The resource name [' + resourceToAdd.fullName + '] already exists');
    }

    
  }

  nameExistsInList(fullname: string) : boolean {
    let ret: boolean = false;

    if(this.service.listOfAllResources.length == 0) console.log("No resources in the list");


    if(this.service.listOfAllResources && this.service.listOfAllResources.length > 0){
      for(let i = 0; i < this.service.listOfAllResources.length ; i++){
        if(this.service.listOfAllResources[i].fullName == fullname){
          ret = true;
          return true;
        }
      }
    }

    return ret
  }

}
