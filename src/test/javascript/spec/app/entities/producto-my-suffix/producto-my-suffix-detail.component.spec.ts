/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ProductoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix-detail.component';
import { ProductoMySuffixService } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix.service';
import { ProductoMySuffix } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix.model';

describe('Component Tests', () => {

    describe('ProductoMySuffix Management Detail Component', () => {
        let comp: ProductoMySuffixDetailComponent;
        let fixture: ComponentFixture<ProductoMySuffixDetailComponent>;
        let service: ProductoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ProductoMySuffixDetailComponent],
                providers: [
                    ProductoMySuffixService
                ]
            })
            .overrideTemplate(ProductoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.producto).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
