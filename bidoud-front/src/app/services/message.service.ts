import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const BACKEND_URL =environment.apiUri
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  addMessage(data:any){
    return this.http.post(BACKEND_URL+"messages",data)
  }
}
