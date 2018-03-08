package es.garocaru.service.mapper;

import es.garocaru.domain.*;
import es.garocaru.service.dto.RegistroDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Registro and its DTO RegistroDTO.
 */
@Mapper(componentModel = "spring", uses = {UsuarioMapper.class, ProductoMapper.class})
public interface RegistroMapper extends EntityMapper<RegistroDTO, Registro> {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "producto.id", target = "productoId")
    RegistroDTO toDto(Registro registro);

    @Mapping(source = "usuarioId", target = "usuario")
    @Mapping(source = "productoId", target = "producto")
    Registro toEntity(RegistroDTO registroDTO);

    default Registro fromId(Long id) {
        if (id == null) {
            return null;
        }
        Registro registro = new Registro();
        registro.setId(id);
        return registro;
    }
}
