import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './template/about/about.component';
import { ContactComponent } from './template/contact/contact.component';
import { ServicesComponent } from './template/services/services.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NzMessageModule} from 'ng-zorro-antd/message';
import { HomeComponent } from './home/home.component';
import { AdminWorksComponent } from './admin-works/admin-works.component';
import {QuillModule} from 'ngx-quill';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';

import { PlusOutline,DeleteOutline } from '@ant-design/icons-angular/icons';
import {NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS, NzIconModule} from 'ng-zorro-antd/icon';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import { DetailsWorkComponent } from './details-work/details-work.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { AdminSigninComponent } from './admin-signin/admin-signin.component';
import {AdminGuardService} from './services/admin-guard.service';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { WorksTagComponent } from './works-tag/works-tag.component';

const icons: IconDefinition[] = [ PlusOutline,DeleteOutline ];


const appRoutes: Routes = [
  {path:'' ,component: HomeComponent},
  {path : 'about-me',component:AboutComponent},
  {path:'contact-me' ,component: ContactComponent},
  {path:'services' ,component: ServicesComponent},
  {path:'admin-works' ,component: AdminWorksComponent,canActivate:[AdminGuardService]},
  {path:'admin-comments' ,component: AdminCommentsComponent,canActivate:[AdminGuardService]},
  {path:'administrator' ,component: AdminSigninComponent},
  {path:'works/:idWork' ,component: DetailsWorkComponent},
  {path:'works/tags/:categorie' ,component:WorksTagComponent},
  {path: 'not-found',component:NotFoundComponent},
  {path: '**',redirectTo:'not-found'}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    HomeComponent,
    AdminWorksComponent,
    DetailsWorkComponent,
    AdminCommentsComponent,
    SafeHtmlPipe,
    AdminSigninComponent,
    NotFoundComponent,
    WorksTagComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzMessageModule,
    QuillModule.forRoot(),
    NzUploadModule,
    NzModalModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzModalModule,
    NgxPaginationModule,
    NzSpinModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, it is Ant Design's theme blue
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
