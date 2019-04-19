import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Project, DateCalculation } from 'src/app/shared/project.model';
import { parseDate } from 'ngx-bootstrap';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {

  constructor(private service: ProjectService, private toastr: ToastrService, private database: AngularFirestore) { }

  ngOnInit() {   
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null) form.resetForm();

    this.service.itemData = {
      id: null,
      timestamp: null,
      shortName: null,
      projectManager: null,
      startDate: null,
      deliveryDate: null,
      workDays: null,
      status: null,
      workFrontID: null
    }
  }

  onSubmit(form: NgForm){
    let formData = Object.assign({}, form.value);
    let formStartDate = formData.startDate;
    let formDeliveryDate = formData.deliveryDate;

    let projectToAdd: Project = {
      id: null,
      timestamp: new Date().getTime(),
      shortName: formData.shortName,
      projectManager: formData.projectManager && formData.projectManager != "" ? formData.projectManager : null,
      startDate: formStartDate,
      deliveryDate: formDeliveryDate,
      workDays: DateCalculation.workingDaysBetweenDates(formStartDate, formDeliveryDate, this.service.listOfAllHolidays),
      workFrontID: formData.workFrontID && formData.workFrontID != "" ? formData.workFrontID : null,
      status: 'Draft 0.1'
    };

    let btnCloseModal = document.getElementById('CloseAddProjectModal');
    let nameExists = this.nameExistsInList(projectToAdd.shortName);  
    
    if(!nameExists){

      // remove the ID element so it's not duplicated in the DB
      delete projectToAdd.id;
            
      this.database.collection(this.service.projectRootNode).add(projectToAdd).then(res => {
        this.resetForm(form);
        if(btnCloseModal) btnCloseModal.click();

        this.toastr.success('The resource ' + projectToAdd.shortName + ' was added');
      });
      
    } else {
      console.log("No project was added");
      this.toastr.warning('No project was added: The project name [' + projectToAdd.shortName + '] already exists');
    }
  }

  nameExistsInList(shortName: string) : boolean {
    let ret: boolean = false;

    if(this.service.listOfAllProjects.length == 0) console.log("No projects in the list");


    if(this.service.listOfAllProjects && this.service.listOfAllProjects.length > 0){
      for(let i = 0; i < this.service.listOfAllProjects.length ; i++){
        if(this.service.listOfAllProjects[i].shortName.trim().toLocaleLowerCase() == shortName.trim().toLocaleLowerCase()){
          ret = true;
          break;
        }
      }
    }

    return ret
  }

}
