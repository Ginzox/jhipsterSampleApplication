package es.garocaru.service;

import es.garocaru.service.dto.ProductoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Producto.
 */
public interface ProductoService {

    /**
     * Save a producto.
     *
     * @param productoDTO the entity to save
     * @return the persisted entity
     */
    ProductoDTO save(ProductoDTO productoDTO);

    /**
     * Get all the productos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProductoDTO> findAll(Pageable pageable);
    /**
     * Get all the ProductoDTO where CodigoProducto is null.
     *
     * @return the list of entities
     */
    List<ProductoDTO> findAllWhereCodigoProductoIsNull();

    /**
     * Get the "id" producto.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductoDTO findOne(Long id);

    /**
     * Delete the "id" producto.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
