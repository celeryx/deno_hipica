CREATE TABLE STUD
(
    id_stud     BIGSERIAL PRIMARY KEY,
    nombre_stud VARCHAR(100),
    rut_stud    NUMERIC(20),
    dv_stud     VARCHAR(3)
);

CREATE TABLE HARAS
(
    id_haras     BIGSERIAL PRIMARY KEY,
    nombre_haras VARCHAR(100),
    rut_haras    NUMERIC(20),
    dv_haras     VARCHAR(3)
);

CREATE TABLE PREPARADOR
(
    id_preparador     BIGSERIAL PRIMARY KEY,
    nombre_preparador VARCHAR(100),
    rut_preparador    NUMERIC(20),
    dv_preparador     VARCHAR(3)
);

CREATE TABLE JINETE
(
    id_jinete     BIGSERIAL PRIMARY KEY,
    nombre_jinete VARCHAR(100),
    rut_jinete    NUMERIC(20),
    dv_jinete     VARCHAR(3)
);

CREATE TABLE CABALLO
(
    id_caballo            BIGSERIAL PRIMARY KEY,
    nombre_ejemplar       VARCHAR(100),
    rut_ejemplar          NUMERIC(20),
    dv_ejemplar           VARCHAR(3),
    sexo                  VARCHAR(10),
    nombre_padre          VARCHAR(100),
    nombre_madre          VARCHAR(100),
    nombre_abuelo_materno VARCHAR(100),
    glosa_contratiempo    TEXT,
    debutante             BOOLEAN,
    id_preparador         BIGSERIAL NOT NULL,
    id_stud               BIGSERIAL NOT NULL,
    id_haras              BIGSERIAL NOT NULL
);

CREATE TABLE ESTADISTICA_CABALLO
(
    id_estadistica_caballo BIGSERIAL PRIMARY KEY,
    fs_rut                 NUMERIC(20),
    fs_dv                  VARCHAR(3),
    fecha_calculo          VARCHAR(20),
    vel_maxima             DOUBLE PRECISION,
    vel_1rtos_200_t1       DOUBLE PRECISION,
    vel_tren_carr_t1       DOUBLE PRECISION,
    vel_pos_fs_t1          DOUBLE PRECISION,
    vel_ult_200_t1         DOUBLE PRECISION,
    vel_final_t1           DOUBLE PRECISION,
    perfil_fs_t1           VARCHAR(50),
    perfil_fs_t2           VARCHAR(50),
    id_caballo             BIGSERIAL NOT NULL,
    FOREIGN KEY (id_caballo) REFERENCES CABALLO (id_caballo)
);



CREATE TABLE TIPO_CAMPANIAS
(
    id_tipo_campanias BIGSERIAL PRIMARY KEY,
    nombre_campania   VARCHAR(50)
);

CREATE TABLE CAMPANIAS
(
    id_campanias_top   BIGSERIAL PRIMARY KEY,
    fecha              VARCHAR(30),
    numero_carrera     NUMERIC(4),
    estado_pista       VARCHAR(10),
    partidor           NUMERIC(3),
    edad_ejemplar      NUMERIC(3),
    peso_ejemplar      NUMERIC(5),
    resultado          NUMERIC(5),
    tiempo             VARCHAR(30),
    handicap           NUMERIC(3),
    dividendo          VARCHAR(6),
    distancia_2        VARCHAR(10),
    nombre_jinete      VARCHAR(100),
    peso_jinete        NUMERIC(5),
    velocidad_promedio DOUBLE PRECISION,

    id_caballo         BIGSERIAL NOT NULL,
    id_tipo_campanias  BIGSERIAL NOT NULL,
    FOREIGN KEY (id_caballo) REFERENCES CABALLO (id_caballo),
    FOREIGN KEY (id_tipo_campanias) REFERENCES TIPO_CAMPANIAS (id_tipo_campanias)
);



CREATE TABLE CONTRATIEMPOS
(
    id_contratiempos BIGSERIAL PRIMARY KEY,
    fecha_carrera    VARCHAR(30),
    glosa            VARCHAR(500),
    observaciones    VARCHAR(500),

    id_caballo       BIGSERIAL NOT NULL,
    FOREIGN KEY (id_caballo) REFERENCES CABALLO (id_caballo)
);



----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------

CREATE TABLE PISTA
(
    id_pista              BIGSERIAL PRIMARY KEY,
    tipo_pista            VARCHAR(30),
    cancha                VARCHAR(20),
    humedad               VARCHAR(10),
    dureza                VARCHAR(10),
    rodillo               VARCHAR(10),
    corte_pasto           VARCHAR(10),
    rastra                VARCHAR(10),
    acondicionador        VARCHAR(10),
    profundidad_de_rastra VARCHAR(10)
);


CREATE TABLE TIPO_PRONOSTICO
(
    id_tipo_pronostico BIGSERIAL PRIMARY KEY,
    nombre             VARCHAR(100)
);


CREATE TABLE CARRERA
(
    id_carrera      BIGSERIAL PRIMARY KEY,

    fecha_carrera   VARCHAR(30),
    hora_carrera    VARCHAR(20),
    numero_carrera  NUMERIC(3),
    distancia       NUMERIC(10),
    numero_pista    NUMERIC(3),
    peso_pedido     NUMERIC(3),
    edad            VARCHAR(5),
    sexo            VARCHAR(5),
    nombre_carrera  VARCHAR(200),
    tipo_carrera    VARCHAR(20),
    indice_superior NUMERIC(4),
    indice_inferior NUMERIC(3),

    id_pista        BIGSERIAL not null,
    FOREIGN KEY (id_pista) REFERENCES PISTA (id_pista)
);


CREATE TABLE PRONOSTICO
(
    id_pronostico      BIGSERIAL PRIMARY KEY,
    nombre_cab1        VARCHAR(100),
    numero_cab1        VARCHAR(5),
    nombre_cab2        VARCHAR(100),
    numero_cab2        VARCHAR(5),
    numero_carrera     NUMERIC(3),
    id_tipo_pronostico BIGSERIAL,
    id_carrera         BIGSERIAL,
    FOREIGN KEY (id_tipo_pronostico) REFERENCES TIPO_PRONOSTICO (id_tipo_pronostico),
    FOREIGN KEY (id_carrera) REFERENCES CARRERA (id_carrera)
);


CREATE TABLE CARRERA_CABALLO_JINETE
(
    id_carrera_caballo_jinete BIGSERIAL PRIMARY KEY,
    partidor                  NUMERIC(3),
    indice_inscrito           NUMERIC(3),
    ajuste_indice             NUMERIC(3),
    reajuste_indice           NUMERIC(3),
    peso_ejemplar             NUMERIC(5),
    dividendo                 DOUBLE PRECISION,
    posicion_llegada          NUMERIC(3),
    tiempo                    VARCHAR(15),
    distanciamiento           VARCHAR(30),
    velocidad_promedio        DOUBLE PRECISION,
    estado_inscripcion        CHAR(1),
    anteojeras_caballo        CHAR(1),
    nombre_jinete             VARCHAR(100),
    peso_jinete               NUMERIC(5),

    id_caballo                BIGSERIAL NOT NULL,
    id_jinete                 BIGSERIAL NOT NULL,
    id_carrera                BIGSERIAL NOT NULL,
    FOREIGN KEY (id_caballo) REFERENCES CABALLO (id_caballo),
    FOREIGN KEY (id_jinete) REFERENCES JINETE (id_jinete),
    FOREIGN KEY (id_carrera) REFERENCES CARRERA (id_carrera)
);


