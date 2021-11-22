import { Routes } from '@angular/router';

import { PatientComponent } from 'app/pages/patient/patient.component';
import { MedecinComponent } from 'app/pages/medecin/medecin.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'patient',      component: PatientComponent },
    { path: 'medecin',      component: MedecinComponent },
];
