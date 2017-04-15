import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploaderComponent } from './uploader/uploader.component';
import { AboutComponent } from './about/about.component';

import { AuthenticationRouteGuard } from './routeguards/authentication.routeguard';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'uploader', component: UploaderComponent, canActivate: [AuthenticationRouteGuard] },
    { path: 'about', component: AboutComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);