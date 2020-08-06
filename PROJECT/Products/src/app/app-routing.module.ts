import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component'
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent} from './home/home.component';
import { AuthGuard} from './auth.guard';
import { StudentformComponent } from './studentform/studentform.component';
import { AboutComponent } from './about/about.component';
import { ResultComponent } from './result/result.component';
const routes: Routes = [
                         {path:'students',component:ProductListComponent},
                         {path:'add',component:NewProductComponent, canActivate:[AuthGuard]},
                         {path:'edit/:p_id',component:EditProductComponent},
                         {path:'login',component:LoginComponent},
                         {path:'',component:HomeComponent},
                         {path:'register',component:RegisterComponent},
                         {path:'studentform',component:StudentformComponent},
                         {path:'result/:student_id',component:ResultComponent},
                         {path:'about',component:AboutComponent}
                        ]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
