import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // localhost:4200
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }, // localhost:4200/users/:id/:name
    ] }, // localhost:4200/users
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ':id', component: ServerComponent, children: [
          { path: 'edit', component: EditServerComponent } // localhost:4200/servers/:id/edit
        ] }, // localhost:4200/servers/:id
    ] }, // localhost:4200/servers
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' } // this has to be the last one
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}