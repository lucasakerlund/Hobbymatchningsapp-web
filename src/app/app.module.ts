  import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FlowComponent } from './flow/flow.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextComponent } from './components/text/text.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { UserViewComponent } from './user-view/user-view.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateComponent } from './components/date/date.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { Httpinterceptor } from './services/http.interceptor';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    ContactsComponent,
    FlowComponent,
    RegisterComponent,
    TextComponent,
    UserViewComponent,
    TextComponent,
    CheckboxComponent,
    DateComponent,
    DropdownComponent,
    ToastContainerComponent,
    LandingPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSliderModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Httpinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
