import { Routes } from '@angular/router';
import { CreateUserComponent } from './user/create/user-create.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user/profile/user-profile.component';


export const routes: Routes = [
    {  path:'',component: CreateUserComponent   } ,
    {  path:'create-user' , component: CreateUserComponent },
    {  path:'login', component: LoginComponent } ,
    {  path:'profile', component: UserProfileComponent}
    

];
