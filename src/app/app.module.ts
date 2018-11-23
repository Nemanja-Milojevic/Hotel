import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCardModule, NbListModule} from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { ListService } from './list.service';
import { AuthService } from './auth.service';
import { GuardGuard } from './guard.guard';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbListModule
  ],
  providers: [AuthService, ListService, GuardGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
