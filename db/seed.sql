DROP TABLE IF EXISTS auto_u_v_records;
DROP TABLE IF EXISTS auto_work_type;
DROP TABLE IF EXISTS auto_parts;
DROP TABLE IF EXISTS auto_u_auth;
DROP TABLE IF EXISTS auto_u_profiles;
DROP TABLE IF EXISTS auto_u_vehicles;
DROP TABLE IF EXISTS auto_u_authusers;
DROP TABLE IF EXISTS auto_users;

CREATE TABLE auto_users (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(100) NOT NULL
);

CREATE TABLE auto_u_auth (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES auto_users(id),
    hash TEXT
);

CREATE TABLE auto_u_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES auto_users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street1 VARCHAR(1000),
    street2 VARCHAR(1000),
    city TEXT,
    st TEXT,
    zip INT
);

CREATE TABLE auto_u_vehicles (
    id SERIAL PRIMARY KEY,
    VIN VARCHAR(200) UNIQUE,
    user_id INT REFERENCES auto_users(id),
    make TEXT NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL
);

CREATE TABLE auto_parts (
    id SERIAL PRIMARY KEY,
    category TEXT,
    name VARCHAR(200) 
);

CREATE TABLE auto_work_type (
    id SERIAL PRIMARY KEY,
    work_type TEXT
);

CREATE TABLE auto_u_v_records (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(200) REFERENCES auto_u_vehicles(VIN),
    work_type INT REFERENCES auto_work_type(id),
    part INT REFERENCES auto_parts(id), 
    miles INT
);

INSERT INTO auto_work_type (work_type)
VALUES
('Clean'),
('Inspect'),
('Install'),
('Repair'),
('Replacement'),
('Other');


INSERT INTO auto_parts (category, name)
VALUES 
('Belts', 'Power Steering'),
('Belts', 'Air Conditioning'),
('Belts', 'Alternator'),
('Belts', 'Timing');

INSERT INTO auto_users (user_email)
VALUES ('n@m.com');

INSERT INTO auto_u_auth (user_id, hash)
VALUES (1, 'DSFGHSRJFG');

INSERT INTO auto_u_profiles (user_id, first_name, last_name)
VALUES (1, 'Nitin', 'Misra');

INSERT INTO auto_u_vehicles (VIN, user_id, make, model, year)
VALUES ('WRAF3453AGJ435ADFF3TSDSGS', 1, 'Nissan', 'Sentra', 1989 );

INSERT INTO auto_u_v_records (vehicle_id, work_type, part, miles)
VALUES ('WRAF3453AGJ435ADFF3TSDSGS', 5, 1, 29424);


SELECT auto_u_v_records.vehicle_id, auto_u_v_records.miles, auto_work_type.work_type, auto_parts.category, auto_parts.name  FROM auto_u_v_records
INNER JOIN auto_parts ON auto_u_v_records.part = auto_parts.id
INNER JOIN auto_work_type on auto_u_v_records.work_type = auto_work_type.id;
