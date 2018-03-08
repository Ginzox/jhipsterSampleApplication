import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixPopupService } from './usuario-my-suffix-popup.service';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix-delete-dialog',
    templateUrl: './usuario-my-suffix-delete-dialog.component.html'
})
export class UsuarioMySuffixDeleteDialogComponent {

    usuario: UsuarioMySuffix;

    constructor(
        private usuarioService: UsuarioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarioListModification',
                content: 'Deleted an usuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-my-suffix-delete-popup',
    template: ''
})
export class UsuarioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarioPopupService
                .open(UsuarioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
