import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: "dashboard", component: UserlistComponent },
  { path: "userlayout", component: UserlayoutComponent },
  { path: "newuser", component: NewuserComponent },
  { path: "edituser/:phone", component: NewuserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
