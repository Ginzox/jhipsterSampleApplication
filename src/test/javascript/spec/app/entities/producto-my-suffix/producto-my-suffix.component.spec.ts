/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ProductoMySuffixComponent } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix.component';
import { ProductoMySuffixService } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix.service';
import { ProductoMySuffix } from '../../../../../../main/webapp/app/entities/producto-my-suffix/producto-my-suffix.model';

describe('Component Tests', () => {

    describe('ProductoMySuffix Management Component', () => {
        let comp: ProductoMySuffixComponent;
        let fixture: ComponentFixture<ProductoMySuffixComponent>;
        let service: ProductoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ProductoMySuffixComponent],
                providers: [
                    ProductoMySuffixService
                ]
            })
            .overrideTemplate(ProductoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
