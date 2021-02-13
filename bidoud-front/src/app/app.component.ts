import {Component, ElementRef, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'bidoud-front';
  memberIsAuthenticated : boolean=false;
  private authListenerSub:Subscription;
  constructor(private router: Router,private loginService:LoginService) {}

  ngOnInit(): void {
    this.loginService.autoAuthUser();
    this.memberIsAuthenticated =this.loginService.getAuthStatus();
    this.authListenerSub=this.loginService.getAuthStatusListener().subscribe((isAuthenticated)=>{
      this.memberIsAuthenticated=isAuthenticated;
    })
    this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scroll({
        top:0,
        left:0,
        behavior: 'smooth',

      });

    } )
  }
}
