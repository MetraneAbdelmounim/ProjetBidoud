import { Component, OnInit } from '@angular/core';
import {WorkService} from '../services/work.service';
import {Work} from '../modeles/work';
import {Router} from '@angular/router';
import {config} from '../../Config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  works: Array<Work>;
  ipp : number =config.itemsPerPage
  itemsPerPage: number = config.itemsPerPage;
  page: number=1;
  spinning: boolean=true;
  search: string;
  constructor(private workService:WorkService,private router : Router) { }

  ngOnInit(): void {

    this.workService.getAllWorks().subscribe((results:Array<Work>)=>{
      this.spinning=false
      this.works = results.reverse()
      console.log(this.works[0].content[0]);
    })
  }

  navigateToDetails(_id: string) {
    this.router.navigate(['works',_id])
  }

  afficherToutCat() {
    this.itemsPerPage=this.works.length
  }

  afficherMoinCat() {
    this.itemsPerPage=config.itemsPerPage
  }
}
