package es.garocaru.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Registro.
 */
@Entity
@Table(name = "registro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Registro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "producto")
    private String producto;

    @Column(name = "fecha_alta")
    private Instant fechaAlta;

    @Column(name = "usuario")
    private String usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Producto producto;

    @ManyToOne
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public Registro producto(String producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public Registro fechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getUsuario() {
        return usuario;
    }

    public Registro usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public Producto getProducto() {
        return producto;
    }

    public Registro producto(Producto producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Registro usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Registro registro = (Registro) o;
        if (registro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Registro{" +
            "id=" + getId() +
            ", producto='" + getProducto() + "'" +
            ", fechaAlta='" + getFechaAlta() + "'" +
            ", usuario='" + getUsuario() + "'" +
            "}";
    }
}
