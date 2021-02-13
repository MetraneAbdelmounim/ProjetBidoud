import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const BACKEND_URL=environment.apiUri
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }

  getAllComments(){
    return this.http.get(BACKEND_URL+"messages")
  }
  updateStateComment(_id:string){
    return this.http.put(BACKEND_URL+"messages/"+_id+"/state",null);
  }

  deleteComment(_id: string) {
    return this.http.delete(BACKEND_URL+"messages/"+_id)
  }
}
