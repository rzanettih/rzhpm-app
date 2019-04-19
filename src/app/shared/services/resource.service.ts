import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Resource } from '../resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public resourceRootNode: string = "resource";
  itemData: Resource;
  public listOfAllResources: Resource[];
  public listOfAllResourcesFiltered: Resource[];

  public resourceBeingEdited: Resource;

  constructor(private database: AngularFirestore) { 
    this.resourceBeingEdited = null;
  }

  getAllResources(){
      return this.database.collection(this.resourceRootNode, ref => ref.orderBy('fullName', 'asc'))
       .snapshotChanges();
  }

  fulfillListOfAllResources() : Promise<number> {
    
    return new Promise((result) => {
        this.getAllResources().subscribe(returnArray => {
          this.listOfAllResources = returnArray.map(item => {
              return {
                ...item.payload.doc.data(),
                id: item.payload.doc.id
              } as Resource;
    
            }); 
    
            this.filterListByText("").then(qtt => {
              result(qtt);
            });
    
        });
    });

  }

  filterListByText(text: string, listOfResourcesToRemove?: Resource[]) : Promise<number> {
    
    return new Promise((result) => {
      let qtt: number = 0;
      this.listOfAllResourcesFiltered = this.listOfAllResources.map(resource => {
        if(
            (listOfResourcesToRemove && listOfResourcesToRemove.map(res => {return res.id}).indexOf(resource.id) < 0)
            && (resource.fullName.toLowerCase().indexOf(text.toLowerCase()) >= 0 
            || resource.email.toLowerCase().indexOf(text.toLowerCase()) >=0 
            || (resource.vendor && resource.vendor.toLowerCase().indexOf(text.toLowerCase()) >= 0)
            || (resource.internal && 'internal'.indexOf(text.trim().toLowerCase()) >= 0)
            || text.trim() == "")){
            
              qtt++;
              return resource;
        }

      });
      result(qtt);
    });

  }

}
 