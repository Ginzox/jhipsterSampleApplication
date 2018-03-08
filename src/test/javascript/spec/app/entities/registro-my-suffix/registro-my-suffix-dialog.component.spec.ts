/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegistroMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix-dialog.component';
import { RegistroMySuffixService } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.service';
import { RegistroMySuffix } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.model';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix';
import { ProductoMySuffixService } from '../../../../../../main/webapp/app/entities/producto-my-suffix';

describe('Component Tests', () => {

    describe('RegistroMySuffix Management Dialog Component', () => {
        let comp: RegistroMySuffixDialogComponent;
        let fixture: ComponentFixture<RegistroMySuffixDialogComponent>;
        let service: RegistroMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RegistroMySuffixDialogComponent],
                providers: [
                    UsuarioMySuffixService,
                    ProductoMySuffixService,
                    RegistroMySuffixService
                ]
            })
            .overrideTemplate(RegistroMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistroMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RegistroMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.registro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'registroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RegistroMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.registro = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'registroListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
