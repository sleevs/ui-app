import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './user/create/user-create.component';
import { UserProfileComponent} from './user/profile/user-profile.component';

@NgModule({
    imports:[
        ReactiveFormsModule,
        CreateUserComponent,
        UserProfileComponent
    ],
    exports:[
        CreateUserComponent,
        UserProfileComponent
      
    ],
    declarations:[]
})
export class AppModule { }