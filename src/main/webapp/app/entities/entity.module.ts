import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationUsuarioMySuffixModule } from './usuario-my-suffix/usuario-my-suffix.module';
import { JhipsterSampleApplicationRegistroMySuffixModule } from './registro-my-suffix/registro-my-suffix.module';
import { JhipsterSampleApplicationProductoMySuffixModule } from './producto-my-suffix/producto-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationUsuarioMySuffixModule,
        JhipsterSampleApplicationRegistroMySuffixModule,
        JhipsterSampleApplicationProductoMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
