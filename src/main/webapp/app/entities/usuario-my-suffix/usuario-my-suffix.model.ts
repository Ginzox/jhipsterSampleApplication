import { BaseEntity } from './../../shared';

export const enum Rol {
    'ADMINISTRADOR',
    'REGISTRO',
    'CONSULTA'
}

export const enum Departamento {
    'LOGISTICA',
    'PRODUCCION',
    'QA'
}

export const enum Idioma {
    'FRENCH',
    'ENGLISH',
    'SPANISH'
}

export class UsuarioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public codigoUsuario?: string,
        public nombre?: string,
        public apellidos?: string,
        public rol?: Rol,
        public departamento?: Departamento,
        public idioma?: Idioma,
        public codigoUsuarioId?: number,
    ) {
    }
}
