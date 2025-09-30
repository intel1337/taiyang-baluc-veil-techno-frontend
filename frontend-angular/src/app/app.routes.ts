import { Routes } from '@angular/router';
import { Kanban } from './(kanban)/kanban/kanban';
import { Landing } from './landing/landing';

export const routes: Routes = [
    {
        path: '',
        component: Landing, // déclaration de la route pour la landing page
    },
    {
        path: 'kanban',
        component: Kanban, // déclaration de la route pour le kanban
    }
];
