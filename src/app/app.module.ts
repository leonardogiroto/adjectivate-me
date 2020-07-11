import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { AppService } from './app.service';
import { Routes, RouterModule } from '@angular/router';
import { GenerateComponent } from './generate/generate.component';
import { AdjectivateComponent } from './adjectivate/adjectivate.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [{
  path: ':personId',
  component: AdjectivateComponent,
  pathMatch: 'full'
}, {
  path: 'results/:personId',
  component: ResultsComponent,
  pathMatch: 'full'
}, {
  path: '**',
  component: GenerateComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    AdjectivateComponent,
    GenerateComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ChartsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
