package es.garocaru.service;

import es.garocaru.service.dto.RegistroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Registro.
 */
public interface RegistroService {

    /**
     * Save a registro.
     *
     * @param registroDTO the entity to save
     * @return the persisted entity
     */
    RegistroDTO save(RegistroDTO registroDTO);

    /**
     * Get all the registros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RegistroDTO> findAll(Pageable pageable);

    /**
     * Get the "id" registro.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RegistroDTO findOne(Long id);

    /**
     * Delete the "id" registro.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
