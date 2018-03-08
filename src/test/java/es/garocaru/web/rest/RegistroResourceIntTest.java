package es.garocaru.web.rest;

import es.garocaru.JhipsterSampleApplicationApp;

import es.garocaru.domain.Registro;
import es.garocaru.repository.RegistroRepository;
import es.garocaru.service.RegistroService;
import es.garocaru.service.dto.RegistroDTO;
import es.garocaru.service.mapper.RegistroMapper;
import es.garocaru.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static es.garocaru.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RegistroResource REST controller.
 *
 * @see RegistroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class RegistroResourceIntTest {

    private static final String DEFAULT_PRODUCTO = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_ALTA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_ALTA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    @Autowired
    private RegistroRepository registroRepository;

    @Autowired
    private RegistroMapper registroMapper;

    @Autowired
    private RegistroService registroService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegistroMockMvc;

    private Registro registro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RegistroResource registroResource = new RegistroResource(registroService);
        this.restRegistroMockMvc = MockMvcBuilders.standaloneSetup(registroResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Registro createEntity(EntityManager em) {
        Registro registro = new Registro()
            .producto(DEFAULT_PRODUCTO)
            .fechaAlta(DEFAULT_FECHA_ALTA)
            .usuario(DEFAULT_USUARIO);
        return registro;
    }

    @Before
    public void initTest() {
        registro = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegistro() throws Exception {
        int databaseSizeBeforeCreate = registroRepository.findAll().size();

        // Create the Registro
        RegistroDTO registroDTO = registroMapper.toDto(registro);
        restRegistroMockMvc.perform(post("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registroDTO)))
            .andExpect(status().isCreated());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeCreate + 1);
        Registro testRegistro = registroList.get(registroList.size() - 1);
        assertThat(testRegistro.getProducto()).isEqualTo(DEFAULT_PRODUCTO);
        assertThat(testRegistro.getFechaAlta()).isEqualTo(DEFAULT_FECHA_ALTA);
        assertThat(testRegistro.getUsuario()).isEqualTo(DEFAULT_USUARIO);
    }

    @Test
    @Transactional
    public void createRegistroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = registroRepository.findAll().size();

        // Create the Registro with an existing ID
        registro.setId(1L);
        RegistroDTO registroDTO = registroMapper.toDto(registro);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegistroMockMvc.perform(post("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registroDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegistros() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);

        // Get all the registroList
        restRegistroMockMvc.perform(get("/api/registros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registro.getId().intValue())))
            .andExpect(jsonPath("$.[*].producto").value(hasItem(DEFAULT_PRODUCTO.toString())))
            .andExpect(jsonPath("$.[*].fechaAlta").value(hasItem(DEFAULT_FECHA_ALTA.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.toString())));
    }

    @Test
    @Transactional
    public void getRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);

        // Get the registro
        restRegistroMockMvc.perform(get("/api/registros/{id}", registro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(registro.getId().intValue()))
            .andExpect(jsonPath("$.producto").value(DEFAULT_PRODUCTO.toString()))
            .andExpect(jsonPath("$.fechaAlta").value(DEFAULT_FECHA_ALTA.toString()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRegistro() throws Exception {
        // Get the registro
        restRegistroMockMvc.perform(get("/api/registros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);
        int databaseSizeBeforeUpdate = registroRepository.findAll().size();

        // Update the registro
        Registro updatedRegistro = registroRepository.findOne(registro.getId());
        // Disconnect from session so that the updates on updatedRegistro are not directly saved in db
        em.detach(updatedRegistro);
        updatedRegistro
            .producto(UPDATED_PRODUCTO)
            .fechaAlta(UPDATED_FECHA_ALTA)
            .usuario(UPDATED_USUARIO);
        RegistroDTO registroDTO = registroMapper.toDto(updatedRegistro);

        restRegistroMockMvc.perform(put("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registroDTO)))
            .andExpect(status().isOk());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeUpdate);
        Registro testRegistro = registroList.get(registroList.size() - 1);
        assertThat(testRegistro.getProducto()).isEqualTo(UPDATED_PRODUCTO);
        assertThat(testRegistro.getFechaAlta()).isEqualTo(UPDATED_FECHA_ALTA);
        assertThat(testRegistro.getUsuario()).isEqualTo(UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingRegistro() throws Exception {
        int databaseSizeBeforeUpdate = registroRepository.findAll().size();

        // Create the Registro
        RegistroDTO registroDTO = registroMapper.toDto(registro);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegistroMockMvc.perform(put("/api/registros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registroDTO)))
            .andExpect(status().isCreated());

        // Validate the Registro in the database
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegistro() throws Exception {
        // Initialize the database
        registroRepository.saveAndFlush(registro);
        int databaseSizeBeforeDelete = registroRepository.findAll().size();

        // Get the registro
        restRegistroMockMvc.perform(delete("/api/registros/{id}", registro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Registro> registroList = registroRepository.findAll();
        assertThat(registroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Registro.class);
        Registro registro1 = new Registro();
        registro1.setId(1L);
        Registro registro2 = new Registro();
        registro2.setId(registro1.getId());
        assertThat(registro1).isEqualTo(registro2);
        registro2.setId(2L);
        assertThat(registro1).isNotEqualTo(registro2);
        registro1.setId(null);
        assertThat(registro1).isNotEqualTo(registro2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegistroDTO.class);
        RegistroDTO registroDTO1 = new RegistroDTO();
        registroDTO1.setId(1L);
        RegistroDTO registroDTO2 = new RegistroDTO();
        assertThat(registroDTO1).isNotEqualTo(registroDTO2);
        registroDTO2.setId(registroDTO1.getId());
        assertThat(registroDTO1).isEqualTo(registroDTO2);
        registroDTO2.setId(2L);
        assertThat(registroDTO1).isNotEqualTo(registroDTO2);
        registroDTO1.setId(null);
        assertThat(registroDTO1).isNotEqualTo(registroDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(registroMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(registroMapper.fromId(null)).isNull();
    }
}
