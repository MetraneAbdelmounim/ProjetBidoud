import {AfterContentInit, Component, OnInit} from '@angular/core';
import {WorkService} from '../services/work.service';
import {ActivatedRoute} from '@angular/router';
import {Work} from '../modeles/work';


@Component({
  selector: 'app-details-work',
  templateUrl: './details-work.component.html',
  styleUrls: ['./details-work.component.css']
})
export class DetailsWorkComponent implements  OnInit{
  work:Work
  idWork:string
  spinning: boolean=true;
  constructor(private workService:WorkService,private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.router.paramMap.subscribe((params)=>{
      if(params.has('idWork')){
        this.idWork=params.get('idWork')
        this.workService.getWorkById(this.idWork).subscribe((response:any)=>{
          this.spinning=false
          this.work=response.work
        },error => {
          this.spinning=false
          this.work=null
        })
      }
    })
  }

  getCategories(categories: string) {
    return categories?.split(',')
  }
}
