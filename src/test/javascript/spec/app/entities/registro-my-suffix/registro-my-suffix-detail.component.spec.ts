/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { RegistroMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix-detail.component';
import { RegistroMySuffixService } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.service';
import { RegistroMySuffix } from '../../../../../../main/webapp/app/entities/registro-my-suffix/registro-my-suffix.model';

describe('Component Tests', () => {

    describe('RegistroMySuffix Management Detail Component', () => {
        let comp: RegistroMySuffixDetailComponent;
        let fixture: ComponentFixture<RegistroMySuffixDetailComponent>;
        let service: RegistroMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [RegistroMySuffixDetailComponent],
                providers: [
                    RegistroMySuffixService
                ]
            })
            .overrideTemplate(RegistroMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegistroMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegistroMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RegistroMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.registro).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
