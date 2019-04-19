import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/shared/services/resource.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html'
})
export class EditResourceComponent implements OnInit {

  constructor(private service: ResourceService) { }

  ngOnInit() {
  }

  showResouceToEdit() {
    if(this.service.resourceBeingEdited != null){
      
      console.log(`edit-resource-component.showResourceToEdit | resource is:`);
      console.log(this.service.resourceBeingEdited);
      
    } else {
      console.log(`edit-resource-component.showResourceToEdit | resource is null`);
    }
  }

}
