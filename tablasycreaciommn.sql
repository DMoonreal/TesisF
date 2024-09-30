CREATE TABLE Asesores (
    numero_cuenta INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

-- Tabla de Alumnos
CREATE TABLE Alumnos (
    numero_cuenta INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    asesor_numero_cuenta INT,
    FOREIGN KEY (asesor_numero_cuenta) REFERENCES Asesores(numero_cuenta)
);

-- Tabla de Tesis
CREATE TABLE Tesis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tesis VARCHAR(255) NOT NULL,
    notas_v VARCHAR(255) NOT NULL,
    sugerencia VARCHAR(255) NOT NULL,
    archivo_pdf LONGBLOB NOT NULL,
    numero_version INT NOT NULL DEFAULT 1,
    estado VARCHAR(50) DEFAULT 'En progreso',
    asesor_numero_cuenta INT,
    FOREIGN KEY (asesor_numero_cuenta) REFERENCES Asesores(numero_cuenta)
);

-- Tabla intermedia para asociar alumnos con tesis (muchos a muchos)
CREATE TABLE Alumnos_Tesis (
    alumno_numero_cuenta INT,
    tesis_id INT,
    PRIMARY KEY (alumno_numero_cuenta, tesis_id),
    FOREIGN KEY (alumno_numero_cuenta) REFERENCES Alumnos(numero_cuenta),
    FOREIGN KEY (tesis_id) REFERENCES Tesis(id)
);

-- Tabla de Comentarios
CREATE TABLE Comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tesis_id INT,
    alumno_numero_cuenta INT,
    asesor_numero_cuenta INT,
    comentario TEXT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    version_tesis INT NOT NULL,
    FOREIGN KEY (tesis_id) REFERENCES Tesis(id),
    FOREIGN KEY (alumno_numero_cuenta) REFERENCES Alumnos(numero_cuenta),
    FOREIGN KEY (asesor_numero_cuenta) REFERENCES Asesores(numero_cuenta)
);