CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE company(
	id SERIAL primary key,
    uuid UUID DEFAULT uuid_generate_v4(),
	company_name VARCHAR(200) NOT NULL,
	fantasy_name VARCHAR(200) NOT NULL
);

CREATE TABLE employee(
    id SERIAL primary key,
    uuid UUID DEFAULT uuid_generate_v4(),
    company_id INTEGER,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    wage INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    username VARCHAR(200) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company (id)
);


CREATE TABLE loan(
    id SERIAL primary key,
    uuid UUID DEFAULT uuid_generate_v4(),
    company_id INTEGER,
    description VARCHAR(200) NOT NULL,
    minimum_score INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (company_id) REFERENCES company (id)
);


CREATE TABLE employee_loan(
    id SERIAL primary key,
    loan_id INTEGER,
    employee_id INTEGER,
    FOREIGN KEY (loan_id) REFERENCES loan (id),
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);