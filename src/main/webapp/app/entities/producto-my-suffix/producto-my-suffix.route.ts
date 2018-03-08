import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductoMySuffixComponent } from './producto-my-suffix.component';
import { ProductoMySuffixDetailComponent } from './producto-my-suffix-detail.component';
import { ProductoMySuffixPopupComponent } from './producto-my-suffix-dialog.component';
import { ProductoMySuffixDeletePopupComponent } from './producto-my-suffix-delete-dialog.component';

export const productoRoute: Routes = [
    {
        path: 'producto-my-suffix',
        component: ProductoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.producto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'producto-my-suffix/:id',
        component: ProductoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.producto.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productoPopupRoute: Routes = [
    {
        path: 'producto-my-suffix-new',
        component: ProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto-my-suffix/:id/edit',
        component: ProductoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'producto-my-suffix/:id/delete',
        component: ProductoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.producto.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
