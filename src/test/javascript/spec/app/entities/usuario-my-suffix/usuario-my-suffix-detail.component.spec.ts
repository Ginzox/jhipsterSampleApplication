/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UsuarioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix-detail.component';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.service';
import { UsuarioMySuffix } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.model';

describe('Component Tests', () => {

    describe('UsuarioMySuffix Management Detail Component', () => {
        let comp: UsuarioMySuffixDetailComponent;
        let fixture: ComponentFixture<UsuarioMySuffixDetailComponent>;
        let service: UsuarioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UsuarioMySuffixDetailComponent],
                providers: [
                    UsuarioMySuffixService
                ]
            })
            .overrideTemplate(UsuarioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UsuarioMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.usuario).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
