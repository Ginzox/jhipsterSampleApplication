package es.garocaru.service.impl;

import es.garocaru.service.RegistroService;
import es.garocaru.domain.Registro;
import es.garocaru.repository.RegistroRepository;
import es.garocaru.service.dto.RegistroDTO;
import es.garocaru.service.mapper.RegistroMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Registro.
 */
@Service
@Transactional
public class RegistroServiceImpl implements RegistroService {

    private final Logger log = LoggerFactory.getLogger(RegistroServiceImpl.class);

    private final RegistroRepository registroRepository;

    private final RegistroMapper registroMapper;

    public RegistroServiceImpl(RegistroRepository registroRepository, RegistroMapper registroMapper) {
        this.registroRepository = registroRepository;
        this.registroMapper = registroMapper;
    }

    /**
     * Save a registro.
     *
     * @param registroDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RegistroDTO save(RegistroDTO registroDTO) {
        log.debug("Request to save Registro : {}", registroDTO);
        Registro registro = registroMapper.toEntity(registroDTO);
        registro = registroRepository.save(registro);
        return registroMapper.toDto(registro);
    }

    /**
     * Get all the registros.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RegistroDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Registros");
        return registroRepository.findAll(pageable)
            .map(registroMapper::toDto);
    }

    /**
     * Get one registro by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RegistroDTO findOne(Long id) {
        log.debug("Request to get Registro : {}", id);
        Registro registro = registroRepository.findOne(id);
        return registroMapper.toDto(registro);
    }

    /**
     * Delete the registro by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Registro : {}", id);
        registroRepository.delete(id);
    }
}
