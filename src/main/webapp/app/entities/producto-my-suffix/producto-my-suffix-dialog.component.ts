import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductoMySuffix } from './producto-my-suffix.model';
import { ProductoMySuffixPopupService } from './producto-my-suffix-popup.service';
import { ProductoMySuffixService } from './producto-my-suffix.service';
import { RegistroMySuffix, RegistroMySuffixService } from '../registro-my-suffix';

@Component({
    selector: 'jhi-producto-my-suffix-dialog',
    templateUrl: './producto-my-suffix-dialog.component.html'
})
export class ProductoMySuffixDialogComponent implements OnInit {

    producto: ProductoMySuffix;
    isSaving: boolean;

    registros: RegistroMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productoService: ProductoMySuffixService,
        private registroService: RegistroMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.registroService.query()
            .subscribe((res: HttpResponse<RegistroMySuffix[]>) => { this.registros = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.producto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productoService.update(this.producto));
        } else {
            this.subscribeToSaveResponse(
                this.productoService.create(this.producto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductoMySuffix>>) {
        result.subscribe((res: HttpResponse<ProductoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductoMySuffix) {
        this.eventManager.broadcast({ name: 'productoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegistroById(index: number, item: RegistroMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-producto-my-suffix-popup',
    template: ''
})
export class ProductoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productoPopupService: ProductoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productoPopupService
                    .open(ProductoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.productoPopupService
                    .open(ProductoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
