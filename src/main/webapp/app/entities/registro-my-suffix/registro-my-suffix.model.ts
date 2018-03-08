import { BaseEntity } from './../../shared';

export class RegistroMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public producto?: string,
        public fechaAlta?: any,
        public usuario?: string,
        public productoId?: number,
        public usuarioId?: number,
    ) {
    }
}
