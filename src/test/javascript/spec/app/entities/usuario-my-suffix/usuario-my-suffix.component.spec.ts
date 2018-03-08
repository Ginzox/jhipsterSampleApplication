/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { UsuarioMySuffixComponent } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.component';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.service';
import { UsuarioMySuffix } from '../../../../../../main/webapp/app/entities/usuario-my-suffix/usuario-my-suffix.model';

describe('Component Tests', () => {

    describe('UsuarioMySuffix Management Component', () => {
        let comp: UsuarioMySuffixComponent;
        let fixture: ComponentFixture<UsuarioMySuffixComponent>;
        let service: UsuarioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [UsuarioMySuffixComponent],
                providers: [
                    UsuarioMySuffixService
                ]
            })
            .overrideTemplate(UsuarioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UsuarioMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
