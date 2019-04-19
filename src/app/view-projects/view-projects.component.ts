import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/services/project.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html'
})
export class ViewProjectsComponent implements OnInit {

  constructor(private service: ProjectService) { }

  ngOnInit() {
    this.service.getAllProjects().subscribe(returnArray => {
      this.service.listOfAllProjects = returnArray.map(item => {
          return {
            ...item.payload.doc.data(),
            id: item.payload.doc.id
          } as Project;

        }); 

        this.filterListByText("");

    });

    this.service.getAllHolidays();
  }

  onFilter(event: any){
    this.filterListByText(event.target.value);
  }

  filterListByText(text: string){

      let promise = new Promise((result) => {
      let qtt: number = 0;
      this.service.listOfAllProjectsFiltered = this.service.listOfAllProjects.map(project => {
          if(project.shortName.toLowerCase().indexOf(text.toLowerCase()) >= 0 ){
              qtt++;
              return project;
          }

        });
      result(qtt);
      });

      promise.then(qtt => {
        document.getElementById('lblQttFiltered').innerText = 'Showing ' + qtt + ' of ' + this.service.listOfAllProjects.length;
      });
  
  }
}