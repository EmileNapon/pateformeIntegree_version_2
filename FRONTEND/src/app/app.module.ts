
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/calendrier/create/create.component';
import { ModelKNNClientComponent } from './model-knn-client/model-knn-client.component';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core'; 
import { CreatevvComponent } from './components/v/create/create.component';
import { TimelineComponent } from './compox/components/timeline/timeline.component';
import { PhaseListComponent } from './compox/components/phase-list/phase-list.component';
import { PhaseFormComponent } from './compox/components/phase-form/phase-form.component';
import { PhaseDetailComponent } from './compox/components/phase-detail/phase-detail.component';
import { PhaseCardComponent } from './compox/components/phase-card/phase-card.component';
import { LivrableListComponent } from './compox/components/livrable-list/livrable-list.component';
import { LivrableFormComponent } from './compox/components/livrable-form/livrable-form.component';
import { HeaderComponent } from './compox/components/header/header.component';
import { DashboardComponent } from './compox/components/dashboard/dashboard.component';
import { App } from './x/x.component';



@NgModule({
  declarations: [AppComponent, CreateComponent, ModelKNNClientComponent, CreatevvComponent, App,
    TimelineComponent, PhaseListComponent, PhaseFormComponent, PhaseDetailComponent, PhaseCardComponent, LivrableListComponent, LivrableFormComponent, HeaderComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatIconModule,
    MatOptionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
