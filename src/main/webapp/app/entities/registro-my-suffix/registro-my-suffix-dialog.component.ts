import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RegistroMySuffix } from './registro-my-suffix.model';
import { RegistroMySuffixPopupService } from './registro-my-suffix-popup.service';
import { RegistroMySuffixService } from './registro-my-suffix.service';
import { UsuarioMySuffix, UsuarioMySuffixService } from '../usuario-my-suffix';
import { ProductoMySuffix, ProductoMySuffixService } from '../producto-my-suffix';

@Component({
    selector: 'jhi-registro-my-suffix-dialog',
    templateUrl: './registro-my-suffix-dialog.component.html'
})
export class RegistroMySuffixDialogComponent implements OnInit {

    registro: RegistroMySuffix;
    isSaving: boolean;

    usuarios: UsuarioMySuffix[];

    productos: ProductoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private registroService: RegistroMySuffixService,
        private usuarioService: UsuarioMySuffixService,
        private productoService: ProductoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService
            .query({filter: 'codigousuario-is-null'})
            .subscribe((res: HttpResponse<UsuarioMySuffix[]>) => {
                if (!this.registro.usuarioId) {
                    this.usuarios = res.body;
                } else {
                    this.usuarioService
                        .find(this.registro.usuarioId)
                        .subscribe((subRes: HttpResponse<UsuarioMySuffix>) => {
                            this.usuarios = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productoService
            .query({filter: 'codigoproducto-is-null'})
            .subscribe((res: HttpResponse<ProductoMySuffix[]>) => {
                if (!this.registro.productoId) {
                    this.productos = res.body;
                } else {
                    this.productoService
                        .find(this.registro.productoId)
                        .subscribe((subRes: HttpResponse<ProductoMySuffix>) => {
                            this.productos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.registro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.registroService.update(this.registro));
        } else {
            this.subscribeToSaveResponse(
                this.registroService.create(this.registro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RegistroMySuffix>>) {
        result.subscribe((res: HttpResponse<RegistroMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RegistroMySuffix) {
        this.eventManager.broadcast({ name: 'registroListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: UsuarioMySuffix) {
        return item.id;
    }

    trackProductoById(index: number, item: ProductoMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-registro-my-suffix-popup',
    template: ''
})
export class RegistroMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registroPopupService: RegistroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.registroPopupService
                    .open(RegistroMySuffixDialogComponent as Component, params['id']);
            } else {
                this.registroPopupService
                    .open(RegistroMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
