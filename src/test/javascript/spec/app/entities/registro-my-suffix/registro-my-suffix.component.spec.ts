/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegistroMySuffixComponent } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.component';
import { RegistroMySuffixService } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.service';
import { RegistroMySuffix } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.model';

describe('Component Tests', () => {

    describe('RegistroMySuffix Management Component', () => {
        let comp: RegistroMySuffixComponent;
        let fixture: ComponentFixture<RegistroMySuffixComponent>;
        let service: RegistroMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RegistroMySuffixComponent],
                providers: [
                    RegistroMySuffixService
                ]
            })
            .overrideTemplate(RegistroMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistroMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RegistroMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.registros[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
