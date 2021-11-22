import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientComponent } from 'app/pages/patient/patient.component';
import { MedecinComponent } from 'app/pages/medecin/medecin.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  declarations: [

    PatientComponent,
    MedecinComponent
  ]
})

export class AdminLayoutModule {}
