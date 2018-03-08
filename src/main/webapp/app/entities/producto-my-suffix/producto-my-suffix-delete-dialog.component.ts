import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProductoMySuffix } from './producto-my-suffix.model';
import { ProductoMySuffixPopupService } from './producto-my-suffix-popup.service';
import { ProductoMySuffixService } from './producto-my-suffix.service';

@Component({
    selector: 'jhi-producto-my-suffix-delete-dialog',
    templateUrl: './producto-my-suffix-delete-dialog.component.html'
})
export class ProductoMySuffixDeleteDialogComponent {

    producto: ProductoMySuffix;

    constructor(
        private productoService: ProductoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'productoListModification',
                content: 'Deleted an producto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-producto-my-suffix-delete-popup',
    template: ''
})
export class ProductoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productoPopupService: ProductoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productoPopupService
                .open(ProductoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
