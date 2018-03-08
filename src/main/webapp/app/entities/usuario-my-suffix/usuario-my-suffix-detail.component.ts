import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix-detail',
    templateUrl: './usuario-my-suffix-detail.component.html'
})
export class UsuarioMySuffixDetailComponent implements OnInit, OnDestroy {

    usuario: UsuarioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarioService: UsuarioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarios();
    }

    load(id) {
        this.usuarioService.find(id)
            .subscribe((usuarioResponse: HttpResponse<UsuarioMySuffix>) => {
                this.usuario = usuarioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarioListModification',
            (response) => this.load(this.usuario.id)
        );
    }
}
