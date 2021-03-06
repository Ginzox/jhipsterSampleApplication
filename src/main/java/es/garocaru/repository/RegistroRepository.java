package es.garocaru.repository;

import es.garocaru.domain.Registro;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Registro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {

}
