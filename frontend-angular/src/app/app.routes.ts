import { Routes } from '@angular/router';
import { Kanban } from './(kanban)/kanban/kanban';
import { Landing } from './landing/landing';

export const routes: Routes = [
    {
        path: '',
        component: Landing,
    },
    {
        path: 'kanban',
        component: Kanban,
    }
];
