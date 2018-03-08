/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UsuarioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix-delete-dialog.component';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.service';

describe('Component Tests', () => {

    describe('UsuarioMySuffix Management Delete Component', () => {
        let comp: UsuarioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UsuarioMySuffixDeleteDialogComponent>;
        let service: UsuarioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UsuarioMySuffixDeleteDialogComponent],
                providers: [
                    UsuarioMySuffixService
                ]
            })
            .overrideTemplate(UsuarioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
