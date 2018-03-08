import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RegistroMySuffixComponent } from './registro-my-suffix.component';
import { RegistroMySuffixDetailComponent } from './registro-my-suffix-detail.component';
import { RegistroMySuffixPopupComponent } from './registro-my-suffix-dialog.component';
import { RegistroMySuffixDeletePopupComponent } from './registro-my-suffix-delete-dialog.component';

@Injectable()
export class RegistroMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const registroRoute: Routes = [
    {
        path: 'registro-my-suffix',
        component: RegistroMySuffixComponent,
        resolve: {
            'pagingParams': RegistroMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'registro-my-suffix/:id',
        component: RegistroMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const registroPopupRoute: Routes = [
    {
        path: 'registro-my-suffix-new',
        component: RegistroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registro-my-suffix/:id/edit',
        component: RegistroMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'registro-my-suffix/:id/delete',
        component: RegistroMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.registro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
