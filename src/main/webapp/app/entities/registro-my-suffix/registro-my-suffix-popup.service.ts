import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RegistroMySuffix } from './registro-my-suffix.model';
import { RegistroMySuffixService } from './registro-my-suffix.service';

@Injectable()
export class RegistroMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private registroService: RegistroMySuffixService

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
                this.registroService.find(id)
                    .subscribe((registroResponse: HttpResponse<RegistroMySuffix>) => {
                        const registro: RegistroMySuffix = registroResponse.body;
                        registro.fechaAlta = this.datePipe
                            .transform(registro.fechaAlta, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.registroModalRef(component, registro);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.registroModalRef(component, new RegistroMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    registroModalRef(component: Component, registro: RegistroMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registro = registro;
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
