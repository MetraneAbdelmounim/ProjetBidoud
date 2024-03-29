import { Component, OnInit } from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NgForm} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {config} from '../../Config/config';
import {WorkService} from '../services/work.service';
import {Work} from '../modeles/work';
import {NzModalService} from 'ng-zorro-antd/modal';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-admin-works',
  templateUrl: './admin-works.component.html',
  styleUrls: ['./admin-works.component.css']
})
export class AdminWorksComponent implements OnInit {
  itemsPerPage: number = config.itemsPerPage;
  page: number=1;
  works:Array<Work>
  type:string = "Create"
  fileList: NzUploadFile[] = []
  previewImage: string | undefined = '';
  previewVisible = false;
  saving :boolean =false
  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  spinning: boolean=true;
  editWork: Work;
  constructor(private message:NzMessageService,private workService:WorkService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.type='Create'
      this.editWork=null
      this.workService.getAllWorks().subscribe((results:Array<Work>)=>{
        this.spinning=false
      this.works=results.reverse()
    })
  }

  onAddWork(f: NgForm,uploads:NzUploadFile[]) {
        this.fileList=uploads

        if(this.fileList.length===0 ){
          if (this.type==='Create'){
            this.message.info("You must choose at least one image !",{nzDuration:config.durationMessage})
            return
          }
        }
        this.saving=true
        let workData = new FormData();
        workData.append('title',f.value['title']);
        workData.append('description',f.value['description']);
        workData.append('categories',f.value['categories']);

        for(const i in this.fileList){
          // @ts-ignore

          workData.append('works',this.fileList[i].originFileObj)
        }

        if(this.type==='Create'){
          this.workService.addWork(workData).subscribe((response:any)=>{
            f.reset()
            this.fileList=[]
            this.saving=false
            this.message.success(response.message,{nzDuration:config.durationMessage})
            this.ngOnInit()
          },error => {
            this.saving=false
            this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
          })
        }
        else{

          this.workService.updateWork(this.editWork?._id,workData).subscribe((response:any)=>{
            f.reset()
            this.saving=false
            this.fileList=[]
            this.message.success(response.message,{nzDuration:config.durationMessage})
            this.ngOnInit()
          },error => {
            this.saving=false
            this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
          })
        }


  }
   replacer(key, value) {
    // Filtering out properties
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  }
  ShowModale(_id: string,title:string) {
    if(_id){
      this.modal.confirm({
        nzTitle: 'Are you sure delete this Work ?',
        nzContent:title,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.deleteWork(_id),
        nzCancelText: 'No',
      });
    }
  }

  deleteWork(_id:string){
    if(_id){
      this.workService.deleteWork(_id).subscribe((response:any)=>{
        this.message.success(response.message,{nzDuration:config.durationMessage})
        this.ngOnInit()
      },error => {
        console.log(error);
        this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
      })
    }
  }

  onFitchWork(work: Work) {
    this.type='Edit'
    this.editWork = work

  }

  onAfterCreateWork() {
    this.type='Create'
    this.editWork=null
  }
}
