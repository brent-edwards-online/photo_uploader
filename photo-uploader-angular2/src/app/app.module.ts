import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchFieldsComponent } from './search-fields/search-fields.component';
import { ImageComponent } from './image/image.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { UploaderComponent } from './uploader/uploader.component';

import { routes } from './app.router';
import { AuthenticationService } from './service/authentication.service';
import { LocalStorage } from "angular2-localstorage/WebStorage";
import { AuthenticationRouteGuard } from './routeguards/authentication.routeguard'
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

// Set tokenGetter to use the same storage in AuthenticationService.Helpers.
export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: false,
        tokenGetter: (() => localStorage.getItem('id_token'))
    }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchFieldsComponent,
    ImageComponent,
    SearchResultsComponent,
    HomeComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    routes
  ],
  providers: [
        AuthenticationService,
        AuthenticationRouteGuard,
        ToasterService,
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
