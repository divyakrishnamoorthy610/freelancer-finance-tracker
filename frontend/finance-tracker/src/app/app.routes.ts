import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Transactions } from './components/transactions/transactions';
import { TaxEstimator } from './components/tax-estimator/tax-estimator';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'transactions', component: Transactions },
  { path: 'tax-estimator', component: TaxEstimator }
];