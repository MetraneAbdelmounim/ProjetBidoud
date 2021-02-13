import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {config} from '../../Config/config';
import {MemberService} from './member.service';
const BACKEND_URL = environment.apiUri;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token : string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  private tokenTimer: any;
  private  memberIndicatif : string;

  private memberRoleSub =new Subject<boolean>();

  constructor(private http : HttpClient, private router : Router,private message:NzMessageService,private  memberService:MemberService) { }
  getToken(){
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAuthStatus(){
    return this.isAuthenticated;
  }
  signIn(username : String, password : String) {
    const authData = {username : username, password : password};
    this.http.post<{token : string, expiresIn : number, memberId : string,role : string}>(
      BACKEND_URL+'login',authData).subscribe((result)=>{

      const token = result.token;
      this.token = token;

      if(token){
        const expiresInDuration = result.expiresIn;

        this.setAuthTimer(expiresInDuration);

        const now = new Date();

        const expirationDate = new Date(now.getTime()+expiresInDuration*1000);

        this.saveAuthData(token,expirationDate);

        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['']);
      }

    },(error)=>{
      this.message.error(error.error.error,{nzDuration:config.durationMessage})
    });

  }
  logout(){

    this.token = null;
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['']);
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());

  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date (expirationDate),
    };
  }
  getMemberStatus(){
    this.memberService.getMemberFromToken(this.getToken())
    this.memberService.userFromTokenSubject.asObservable().subscribe((user:any)=>{
      this.memberRoleSub.next(true)
    })
    return this.memberRoleSub.asObservable()
  }
  getMemberIndicatif(){
    return this.memberIndicatif;
  }
  getTokenFromLocal(){
    return localStorage.getItem('token')
  }
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }

    // @ts-ignore
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {

      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
