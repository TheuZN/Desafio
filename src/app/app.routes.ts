import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Test1Component } from './pages/test1/test1.component';
import { Test2Component } from './pages/test2/test2.component';
import { Test3Component } from './pages/test3/test3.component';
import { FinishComponent } from './pages/finish/finish.component';
import { progressGuard } from './guards/progress.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "test1", component: Test1Component, canActivate: [progressGuard] },
    { path: "test2", component: Test2Component, canActivate: [progressGuard] },
    { path: "test3", component: Test3Component, canActivate: [progressGuard] },
    { path: "finish", component: FinishComponent, canActivate: [progressGuard] },
    { path: "**", redirectTo: "home" }
];
