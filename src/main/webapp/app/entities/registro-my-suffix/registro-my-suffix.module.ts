import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    RegistroMySuffixService,
    RegistroMySuffixPopupService,
    RegistroMySuffixComponent,
    RegistroMySuffixDetailComponent,
    RegistroMySuffixDialogComponent,
    RegistroMySuffixPopupComponent,
    RegistroMySuffixDeletePopupComponent,
    RegistroMySuffixDeleteDialogComponent,
    registroRoute,
    registroPopupRoute,
    RegistroMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...registroRoute,
    ...registroPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegistroMySuffixComponent,
        RegistroMySuffixDetailComponent,
        RegistroMySuffixDialogComponent,
        RegistroMySuffixDeleteDialogComponent,
        RegistroMySuffixPopupComponent,
        RegistroMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RegistroMySuffixComponent,
        RegistroMySuffixDialogComponent,
        RegistroMySuffixPopupComponent,
        RegistroMySuffixDeleteDialogComponent,
        RegistroMySuffixDeletePopupComponent,
    ],
    providers: [
        RegistroMySuffixService,
        RegistroMySuffixPopupService,
        RegistroMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationRegistroMySuffixModule {}
