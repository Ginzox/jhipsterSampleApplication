package es.garocaru.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import es.garocaru.domain.enumeration.Rol;
import es.garocaru.domain.enumeration.Departamento;
import es.garocaru.domain.enumeration.Idioma;

/**
 * A DTO for the Usuario entity.
 */
public class UsuarioDTO implements Serializable {

    private Long id;

    private String codigoUsuario;

    private String nombre;

    private String apellidos;

    private Rol rol;

    private Departamento departamento;

    private Idioma idioma;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoUsuario() {
        return codigoUsuario;
    }

    public void setCodigoUsuario(String codigoUsuario) {
        this.codigoUsuario = codigoUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Idioma getIdioma() {
        return idioma;
    }

    public void setIdioma(Idioma idioma) {
        this.idioma = idioma;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UsuarioDTO usuarioDTO = (UsuarioDTO) o;
        if(usuarioDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuarioDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsuarioDTO{" +
            "id=" + getId() +
            ", codigoUsuario='" + getCodigoUsuario() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", rol='" + getRol() + "'" +
            ", departamento='" + getDepartamento() + "'" +
            ", idioma='" + getIdioma() + "'" +
            "}";
    }
}
