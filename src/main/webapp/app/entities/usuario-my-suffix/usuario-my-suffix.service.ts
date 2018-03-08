import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UsuarioMySuffix } from './usuario-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UsuarioMySuffix>;

@Injectable()
export class UsuarioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/usuarios';

    constructor(private http: HttpClient) { }

    create(usuario: UsuarioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.post<UsuarioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(usuario: UsuarioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(usuario);
        return this.http.put<UsuarioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UsuarioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UsuarioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UsuarioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UsuarioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UsuarioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UsuarioMySuffix[]>): HttpResponse<UsuarioMySuffix[]> {
        const jsonResponse: UsuarioMySuffix[] = res.body;
        const body: UsuarioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UsuarioMySuffix.
     */
    private convertItemFromServer(usuario: UsuarioMySuffix): UsuarioMySuffix {
        const copy: UsuarioMySuffix = Object.assign({}, usuario);
        return copy;
    }

    /**
     * Convert a UsuarioMySuffix to a JSON which can be sent to the server.
     */
    private convert(usuario: UsuarioMySuffix): UsuarioMySuffix {
        const copy: UsuarioMySuffix = Object.assign({}, usuario);
        return copy;
    }
}
