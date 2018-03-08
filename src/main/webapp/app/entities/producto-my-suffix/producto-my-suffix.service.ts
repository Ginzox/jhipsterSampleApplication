import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProductoMySuffix } from './producto-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProductoMySuffix>;

@Injectable()
export class ProductoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/productos';

    constructor(private http: HttpClient) { }

    create(producto: ProductoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(producto);
        return this.http.post<ProductoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(producto: ProductoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(producto);
        return this.http.put<ProductoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProductoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProductoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProductoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProductoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProductoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProductoMySuffix[]>): HttpResponse<ProductoMySuffix[]> {
        const jsonResponse: ProductoMySuffix[] = res.body;
        const body: ProductoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProductoMySuffix.
     */
    private convertItemFromServer(producto: ProductoMySuffix): ProductoMySuffix {
        const copy: ProductoMySuffix = Object.assign({}, producto);
        return copy;
    }

    /**
     * Convert a ProductoMySuffix to a JSON which can be sent to the server.
     */
    private convert(producto: ProductoMySuffix): ProductoMySuffix {
        const copy: ProductoMySuffix = Object.assign({}, producto);
        return copy;
    }
}
