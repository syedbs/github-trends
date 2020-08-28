import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {GitDetailsComponent} from './pages/git-details/git-details.component';
import {TopUserComponent} from './pages/top-user/top-user.component';
import {TopReposComponent} from './pages/top-repos/top-repos.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details/:type/:id', component: GitDetailsComponent
  },
  {
    path: 'top-users', component: TopUserComponent
  },
  {
    path: 'top-repos', component: TopReposComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
