import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProductoMySuffix } from './producto-my-suffix.model';
import { ProductoMySuffixService } from './producto-my-suffix.service';

@Component({
    selector: 'jhi-producto-my-suffix-detail',
    templateUrl: './producto-my-suffix-detail.component.html'
})
export class ProductoMySuffixDetailComponent implements OnInit, OnDestroy {

    producto: ProductoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private productoService: ProductoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProductos();
    }

    load(id) {
        this.productoService.find(id)
            .subscribe((productoResponse: HttpResponse<ProductoMySuffix>) => {
                this.producto = productoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProductos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'productoListModification',
            (response) => this.load(this.producto.id)
        );
    }
}
