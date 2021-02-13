import { Component, OnInit } from '@angular/core';
import {CommentsService} from '../services/comments.service';
import {Comment} from '../modeles/comment';
import {config} from '../../Config/config';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  itemsPerPage: number = config.itemsPerPage;
  page: number=1;
  comments : Array<Comment>
  commentFitched: Comment;
  spinning: boolean=true;
  constructor(private commentsService:CommentsService,private message:NzMessageService,private modal :NzModalService) { }

  ngOnInit(): void {
    this.commentsService.getAllComments().subscribe((results:Array<Comment>)=>{
      this.spinning=false
      this.comments=results
    })
  }

  getDate(date: string) {
    return Comment.dateToString(date)
  }

  onUpdateState(_id: string) {
    this.commentsService.updateStateComment(_id).subscribe((response:any)=>{

      this.ngOnInit()
      this.message.success("Comment updated successfully ",{nzDuration:config.durationMessage})
    },error => {
      this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
    })
  }

  onFitched(comment: Comment) {
    this.commentFitched=comment
  }

  checkClassName(stateVu: boolean) {

      if(!stateVu) return "commentairenonvu"

  }

  ShowModale(_id: string, message: string) {
      if(_id){
        this.modal.confirm({
          nzTitle: 'Are you sure delete this Comment ?',
          nzContent:message,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => this.deleteComment(_id),
          nzCancelText: 'No',
        });
      }
  }

  deleteComment(_id: string) {
    if(_id){
      this.commentsService.deleteComment(_id).subscribe((response:any)=>{
        this.ngOnInit()
        this.message.success(response.message,{nzDuration:config.durationMessage})
      },error => {
        this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
      })
    }
  }
}
