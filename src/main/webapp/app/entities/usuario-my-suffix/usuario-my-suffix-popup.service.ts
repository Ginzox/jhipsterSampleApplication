import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Injectable()
export class UsuarioMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private usuarioService: UsuarioMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.usuarioService.find(id)
                    .subscribe((usuarioResponse: HttpResponse<UsuarioMySuffix>) => {
                        const usuario: UsuarioMySuffix = usuarioResponse.body;
                        this.ngbModalRef = this.usuarioModalRef(component, usuario);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.usuarioModalRef(component, new UsuarioMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    usuarioModalRef(component: Component, usuario: UsuarioMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.usuario = usuario;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
