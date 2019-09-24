SET SESSION default_storage_engine = "InnoDB";
SET SESSION time_zone = "+0:00";
ALTER DATABASE CHARACTER SET "utf8";


CREATE TABLE person (
  id INTEGER NOT NULL AUTO_INCREMENT,

  full_name VARCHAR(255),

  -- avatar?
  -- credentials?
  -- notification channels?
  -- public / private?
  -- discussion open, concluded?

  PRIMARY KEY (id)
);


CREATE TABLE problem (
  id INTEGER NOT NULL AUTO_INCREMENT,

  question TEXT,
  -- log?

  PRIMARY KEY (id)
);


CREATE TABLE thesis (
  id INTEGER NOT NULL AUTO_INCREMENT,

  problem_id INTEGER NOT NULL,
  content TEXT,
  solution CHAR(1) NOT NULL DEFAULT 'N',
  -- log?

  FOREIGN KEY (problem_id) REFERENCES problem (id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);


CREATE TABLE relation (
  id INTEGER NOT NULL AUTO_INCREMENT,

  thesis1_id INTEGER NOT NULL,
  thesis2_id INTEGER NOT NULL,

  -- rel_type can be either S (support) or C (contradiction)
  rel_type CHAR(1) NOT NULL DEFAULT 'S',

  FOREIGN KEY (thesis1_id) REFERENCES thesis (id) ON DELETE CASCADE,
  FOREIGN KEY (thesis2_id) REFERENCES thesis (id) ON DELETE CASCADE,
  UNIQUE(thesis1_id, thesis2_id,rel_type),
  PRIMARY KEY (id)
);


CREATE TABLE relation_vote (
  relation_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  vote INTEGER NOT NULL,

  FOREIGN KEY (relation_id) REFERENCES relation (id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE,
  PRIMARY KEY (relation_id, person_id)
);


CREATE TABLE thesis_vote (
  thesis_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  vote INTEGER NOT NULL,

  FOREIGN KEY (thesis_id) REFERENCES thesis (id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE,
  PRIMARY KEY (thesis_id, person_id)
);
