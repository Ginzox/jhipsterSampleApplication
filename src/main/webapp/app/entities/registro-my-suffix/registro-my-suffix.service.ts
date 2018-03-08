import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RegistroMySuffix } from './registro-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RegistroMySuffix>;

@Injectable()
export class RegistroMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/registros';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(registro: RegistroMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(registro);
        return this.http.post<RegistroMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(registro: RegistroMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(registro);
        return this.http.put<RegistroMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RegistroMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RegistroMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RegistroMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RegistroMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RegistroMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RegistroMySuffix[]>): HttpResponse<RegistroMySuffix[]> {
        const jsonResponse: RegistroMySuffix[] = res.body;
        const body: RegistroMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RegistroMySuffix.
     */
    private convertItemFromServer(registro: RegistroMySuffix): RegistroMySuffix {
        const copy: RegistroMySuffix = Object.assign({}, registro);
        copy.fechaAlta = this.dateUtils
            .convertDateTimeFromServer(registro.fechaAlta);
        return copy;
    }

    /**
     * Convert a RegistroMySuffix to a JSON which can be sent to the server.
     */
    private convert(registro: RegistroMySuffix): RegistroMySuffix {
        const copy: RegistroMySuffix = Object.assign({}, registro);

        copy.fechaAlta = this.dateUtils.toDate(registro.fechaAlta);
        return copy;
    }
}
