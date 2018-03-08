import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RegistroMySuffix } from './registro-my-suffix.model';
import { RegistroMySuffixPopupService } from './registro-my-suffix-popup.service';
import { RegistroMySuffixService } from './registro-my-suffix.service';

@Component({
    selector: 'jhi-registro-my-suffix-delete-dialog',
    templateUrl: './registro-my-suffix-delete-dialog.component.html'
})
export class RegistroMySuffixDeleteDialogComponent {

    registro: RegistroMySuffix;

    constructor(
        private registroService: RegistroMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.registroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'registroListModification',
                content: 'Deleted an registro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registro-my-suffix-delete-popup',
    template: ''
})
export class RegistroMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private registroPopupService: RegistroMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.registroPopupService
                .open(RegistroMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
