import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path : 'home', component : HomePageComponent},
  { path : '', component : HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
