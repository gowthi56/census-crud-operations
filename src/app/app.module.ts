import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { UserservService } from './userserv.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlldetailsComponent } from './alldetails/alldetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { NewcompComponent } from './newcomp/newcomp.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';
import { TokenComponent } from './token/token.component';
import { PasswordComponent } from './password/password.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { CartsComponent } from './carts/carts.component';
import { DummyComponent } from './dummy/dummy.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateComponent } from './update/update.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    AlldetailsComponent,
    NewcompComponent,
    AboutComponent,
    NavComponent,
    ContactComponent,
    TokenComponent,
    PasswordComponent,
    SearchComponent,
    FilterComponent,
    CartsComponent,
    DummyComponent,
    AddUserComponent,
    UpdateComponent,
    DeleteuserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserservService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
