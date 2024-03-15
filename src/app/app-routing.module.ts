import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { AlldetailsComponent } from './alldetails/alldetails.component';
import { checkingGuard } from './checking.guard';
import { NewcompComponent } from './newcomp/newcomp.component';
import { AboutComponent } from './about/about.component';
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

const routes: Routes = [
  {path:'home', component: NewcompComponent},
  {path: 'about', component: AboutComponent},
  {path:'user', component: DisplayComponent},
  {path: 'token', component: TokenComponent},
  {path:'search', component: SearchComponent},
  {path: 'password', component: PasswordComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'add', component: AddUserComponent},
  {path: 'update', component: UpdateComponent},
  {path:'dummy', component: DummyComponent},
  {path: 'cart', component: CartsComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'delete', component: DeleteuserComponent},
  { path: 'detail/:id', component: AlldetailsComponent, canActivate:[checkingGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
