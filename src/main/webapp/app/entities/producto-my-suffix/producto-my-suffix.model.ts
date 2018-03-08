import { BaseEntity } from './../../shared';

export class ProductoMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigoProducto?: string,
        public nombreProducto?: string,
        public codigoProductoId?: number,
    ) {
    }
}
