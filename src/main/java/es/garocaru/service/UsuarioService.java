package es.garocaru.service;

import es.garocaru.service.dto.UsuarioDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Usuario.
 */
public interface UsuarioService {

    /**
     * Save a usuario.
     *
     * @param usuarioDTO the entity to save
     * @return the persisted entity
     */
    UsuarioDTO save(UsuarioDTO usuarioDTO);

    /**
     * Get all the usuarios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UsuarioDTO> findAll(Pageable pageable);
    /**
     * Get all the UsuarioDTO where CodigoUsuario is null.
     *
     * @return the list of entities
     */
    List<UsuarioDTO> findAllWhereCodigoUsuarioIsNull();

    /**
     * Get the "id" usuario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UsuarioDTO findOne(Long id);

    /**
     * Delete the "id" usuario.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
