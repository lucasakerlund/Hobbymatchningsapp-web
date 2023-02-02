import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { FlowComponent } from './flow/flow.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ProfileResolver } from './resolvers/user.resolver';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {path: 'user', component: UserViewComponent},
  {path: 'flode', component: FlowComponent},
  {path: 'profile', component: ProfileComponent, resolve: {
    profileData: ProfileResolver
  }},
  {path: 'contacts', component: ContactsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
