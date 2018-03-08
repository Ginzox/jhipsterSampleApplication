import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    UsuarioMySuffixService,
    UsuarioMySuffixPopupService,
    UsuarioMySuffixComponent,
    UsuarioMySuffixDetailComponent,
    UsuarioMySuffixDialogComponent,
    UsuarioMySuffixPopupComponent,
    UsuarioMySuffixDeletePopupComponent,
    UsuarioMySuffixDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...usuarioRoute,
    ...usuarioPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixDetailComponent,
        UsuarioMySuffixDialogComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixPopupComponent,
        UsuarioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixDialogComponent,
        UsuarioMySuffixPopupComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixDeletePopupComponent,
    ],
    providers: [
        UsuarioMySuffixService,
        UsuarioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationUsuarioMySuffixModule {}
