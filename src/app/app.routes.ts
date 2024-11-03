import { Routes } from '@angular/router';
import { SignupComponent } from './shared/auth/signup/signup.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/error-pages/not-found/not-found.component';
import { MembersComponent } from './components/members/members.component';
import { MealScheduleComponent } from './components/meal-schedule/meal-schedule.component';
import { MarketingListComponent } from './components/marketing-list/marketing-list.component';
import { DepositRemainComponent } from './components/deposit-remain/deposit-remain.component';
import { MealsCalculationComponent } from './components/meals-calculation/meals-calculation.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    title: 'Signup',
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    title: 'Login',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { showHeader: true, title: 'Dashboard' },
    title: 'Dashboard',
  },
  {
    path: 'members',
    component: MembersComponent,
    data: { showHeader: true, title: 'Members' },
    title: 'Members',
  },
  {
    path: 'meal-schedule',
    component: MealScheduleComponent,
    data: { showHeader: true, title: 'Meal Schedule' },
    title: 'Meal Schedule',
  },
  {
    path: 'marketing-list',
    component: MarketingListComponent,
    data: { showHeader: true, title: 'Marketing List' },
    title: 'Marketing List',
  },
  {
    path: 'deposit-remain',
    component: DepositRemainComponent,
    data: { showHeader: true, title: 'Deposit-Remain' },
    title: 'Deposit-Remain',
  },
  {
    path: 'meals-calculation',
    component: MealsCalculationComponent,
    data: { showHeader: true, title: 'Meals Calculation' },
    title: 'Meals Calculation',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { showHeader: false },
  },
];
