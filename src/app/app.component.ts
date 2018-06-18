import { Component } from '@angular/core';
import { ContainerService } from './container.service';
import 'he';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

declare var he: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  containers=[];
  container='';
  logs=[];
  logbits = [];

    constructor(private containerService: ContainerService) {}
    
    public getContainers(){
  
        this.containerService.getContainers()
        .subscribe(
          
          (response) => {
            this.containers=response.json()
            console.log(response);
          },
          (error) => console.log(error)
        );
      }

    
    public getContainerLogs(event){
      this.logs=[];
      this.logbits=[];
      console.log(event)
      this.containerService.getContainerLogs(event)
        .subscribe(          
          (response) => {
            this.logbits=response.text().split("\n");
            //response.text().split("\n")
           
            
            console.log(this.logbits)
            var i=0;
            for (let entry of this.logbits.reverse()) {
              console.log(i);
              if (entry!=''){
              this.logs.push(JSON.parse(entry));
              i++;
              }

  
              //console.log(entry); // 1, "string", false
          }
          
            

          },
          (error) => console.log(error)
        );
    }
    
    ngOnInit() {
      this.getContainers();
    }     

}
