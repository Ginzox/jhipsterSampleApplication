package es.garocaru.service.mapper;

import es.garocaru.domain.*;
import es.garocaru.service.dto.RegistroDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Registro and its DTO RegistroDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductoMapper.class, UsuarioMapper.class})
public interface RegistroMapper extends EntityMapper<RegistroDTO, Registro> {

    @Mapping(source = "producto.id", target = "productoId")
    @Mapping(source = "usuario.id", target = "usuarioId")
    RegistroDTO toDto(Registro registro);

    @Mapping(source = "productoId", target = "producto")
    @Mapping(source = "usuarioId", target = "usuario")
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
