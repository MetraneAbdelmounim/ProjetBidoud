import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const BACKEND_URL =environment.apiUri
@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http:HttpClient) { }

  addWork(workData: FormData) {
    return this.http.post(BACKEND_URL+"works",workData)
  }

  getAllWorks() {
    return this.http.get(BACKEND_URL+"works")
  }

  deleteWork(_id: string) {
    return this.http.delete(BACKEND_URL+'works/'+_id)
  }

  getWorkById(idWork: string) {
    return this.http.get(BACKEND_URL+'works/'+idWork)
  }
}
