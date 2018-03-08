import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UsuarioMySuffixComponent } from './usuario-my-suffix.component';
import { UsuarioMySuffixDetailComponent } from './usuario-my-suffix-detail.component';
import { UsuarioMySuffixPopupComponent } from './usuario-my-suffix-dialog.component';
import { UsuarioMySuffixDeletePopupComponent } from './usuario-my-suffix-delete-dialog.component';

export const usuarioRoute: Routes = [
    {
        path: 'usuario-my-suffix',
        component: UsuarioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario-my-suffix/:id',
        component: UsuarioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-my-suffix-new',
        component: UsuarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-my-suffix/:id/edit',
        component: UsuarioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-my-suffix/:id/delete',
        component: UsuarioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
