import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessageService} from '../../services/message.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {config} from '../../../Config/config'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  saving: boolean=false;

  constructor(private messageService:MessageService , private message:NzMessageService) { }

  ngOnInit(): void {


  }


  onSendMessage(f: NgForm) {
    this.saving=true
    this.messageService.addMessage(f.value).subscribe((response:any)=>{
      this.saving=false
      f.reset()
      this.message.success(response.message,{nzDuration:config.durationMessage})
    },error => {
      this.saving=false
      this.message.error("an error occurred , please try again !",{nzDuration:config.durationMessage})
    })
  }
}
