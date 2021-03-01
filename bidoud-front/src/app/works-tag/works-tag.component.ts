import { Component, OnInit } from '@angular/core';
import {WorkService} from "../services/work.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Work} from "../modeles/work";
import {config} from "../../Config/config";

@Component({
  selector: 'app-works-tag',
  templateUrl: './works-tag.component.html',
  styleUrls: ['./works-tag.component.css']
})
export class WorksTagComponent implements OnInit {
  spinning: boolean=true;
   tag: string;
  works: Array<Work>;
  ipp : number =config.itemsPerPage
  itemsPerPage: number = config.itemsPerPage;
  page: number=1;
  constructor(private workService:WorkService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params)=>{
      if(params.has('categorie')){
        this.tag=params.get('categorie')
        this.workService.getWorksByTag(this.tag).subscribe((results:Array<Work>)=>{
          this.spinning=false
          this.works=results.reverse()
        })
      }
    })
  }
  navigateToDetails(_id: string) {
    this.route.navigate(['works',_id])
  }

  afficherToutCat() {
    this.itemsPerPage=this.works.length
  }

  afficherMoinCat() {
    this.itemsPerPage=config.itemsPerPage
  }
  getCategories(categories: string) {
    return categories?.split(',')
  }
}
