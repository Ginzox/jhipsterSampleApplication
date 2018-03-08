import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-usuario-my-suffix',
    templateUrl: './usuario-my-suffix.component.html'
})
export class UsuarioMySuffixComponent implements OnInit, OnDestroy {

    usuarios: UsuarioMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private usuarioService: UsuarioMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.usuarios = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.usuarioService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<UsuarioMySuffix[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    reset() {
        this.page = 0;
        this.usuarios = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UsuarioMySuffix) {
        return item.id;
    }
    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.usuarios.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
