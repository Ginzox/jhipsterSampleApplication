package es.garocaru.service.impl;

import es.garocaru.service.ProductoService;
import es.garocaru.domain.Producto;
import es.garocaru.repository.ProductoRepository;
import es.garocaru.service.dto.ProductoDTO;
import es.garocaru.service.mapper.ProductoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Producto.
 */
@Service
@Transactional
public class ProductoServiceImpl implements ProductoService {

    private final Logger log = LoggerFactory.getLogger(ProductoServiceImpl.class);

    private final ProductoRepository productoRepository;

    private final ProductoMapper productoMapper;

    public ProductoServiceImpl(ProductoRepository productoRepository, ProductoMapper productoMapper) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
    }

    /**
     * Save a producto.
     *
     * @param productoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductoDTO save(ProductoDTO productoDTO) {
        log.debug("Request to save Producto : {}", productoDTO);
        Producto producto = productoMapper.toEntity(productoDTO);
        producto = productoRepository.save(producto);
        return productoMapper.toDto(producto);
    }

    /**
     * Get all the productos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Productos");
        return productoRepository.findAll(pageable)
            .map(productoMapper::toDto);
    }


    /**
     *  get all the productos where CodigoProducto is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<ProductoDTO> findAllWhereCodigoProductoIsNull() {
        log.debug("Request to get all productos where CodigoProducto is null");
        return StreamSupport
            .stream(productoRepository.findAll().spliterator(), false)
            .filter(producto -> producto.getCodigoProducto() == null)
            .map(productoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one producto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductoDTO findOne(Long id) {
        log.debug("Request to get Producto : {}", id);
        Producto producto = productoRepository.findOne(id);
        return productoMapper.toDto(producto);
    }

    /**
     * Delete the producto by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Producto : {}", id);
        productoRepository.delete(id);
    }
}
