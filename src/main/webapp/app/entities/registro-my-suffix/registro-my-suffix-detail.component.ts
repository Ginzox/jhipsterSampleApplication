import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RegistroMySuffix } from './registro-my-suffix.model';
import { RegistroMySuffixService } from './registro-my-suffix.service';

@Component({
    selector: 'jhi-registro-my-suffix-detail',
    templateUrl: './registro-my-suffix-detail.component.html'
})
export class RegistroMySuffixDetailComponent implements OnInit, OnDestroy {

    registro: RegistroMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private registroService: RegistroMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegistros();
    }

    load(id) {
        this.registroService.find(id)
            .subscribe((registroResponse: HttpResponse<RegistroMySuffix>) => {
                this.registro = registroResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegistros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'registroListModification',
            (response) => this.load(this.registro.id)
        );
    }
}
