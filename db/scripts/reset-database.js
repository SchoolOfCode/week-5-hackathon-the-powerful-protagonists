import { pool } from "../index.js";

async function resetDatabase() {
  try {
    await pool.query(`
            DROP TABLE IF EXISTS character CASCADE;
            DROP TABLE IF EXISTS universe CASCADE;
            `);
    // create universe table
    await pool.query(`
            CREATE TABLE universe (
                id BIGINT PRIMARY KEY generated ALWAYS AS IDENTITY,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(300),
                creator VARCHAR(255)
                );
            `);
            
    // create character table
    await pool.query(`
            CREATE TABLE character (
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(255) NOT NULL,
            universe_id BIGINT REFERENCES universe (id),
            age INT,
            intellect INT,
            power INT,
            charisma INT,
            morality INT,
            fun_fact VARCHAR(300)
            );
        `);

    // seed universe table
    await pool.query(`
            INSERT INTO universe (name, description, creator)
            VALUES
            ('Harry Potter', 'A series of fantasy novels that chronicle the life of a young wizard, Harry Potter, and his friends.', 'J.K. Rowling'),
            ('Star Wars', 'An epic space opera franchise that depicts the adventures of various characters in a galaxy far, far away.', 'George Lucas'),
            ('Lord of the Rings', 'An epic high-fantasy novel that follows the quest to destroy the One Ring.', 'J.R.R. Tolkien'),
            ('DC Universe', 'A fictional universe that features a large number of superheroes, including Superman, Batman, and Wonder Woman.', 'DC Comics'),
            ('Marvel Universe', 'A fictional universe that is home to superheroes like Spider-Man, the X-Men, and the Avengers.', 'Marvel Comics');
        `);

    // seed character table
    await pool.query(`
          INSERT INTO character (name, universe_id, age, intellect, power, charisma, morality, fun_fact)
          VALUES
          (
    'Harry Potter',
    1,
    17,
    85,
    70,
    80,
    90,
    'Harry is known as "The Boy Who Lived."'
  ),
  (
    'Hermione Granger',
    1,
    17,
    95,
    60,
    75,
    95,
    'Hermione is the brightest witch of her age.'
  ),
  (
    'Ron Weasley',
    1,
    17,
    70,
    65,
    85,
    85,
    'Ron has a fear of spiders.'
  ),
  (
    'Albus Dumbledore',
    1,
    115,
    100,
    95,
    90,
    100,
    'Dumbledore is known for his wisdom and power.'
  ),
  (
    'Severus Snape',
    1,
    38,
    90,
    80,
    70,
    60,
    'Snape was a double agent during the war.'
  ),
  -- Star Wars Characters
  (
    'Luke Skywalker',
    2,
    53,
    80,
    90,
    85,
    95,
    'Luke is a legendary Jedi Master.'
  ),
  (
    'Darth Vader',
    2,
    45,
    75,
    95,
    70,
    50,
    'Darth Vader was once Anakin Skywalker.'
  ),
  (
    'Leia Organa',
    2,
    53,
    85,
    70,
    90,
    95,
    'Leia is a princess and a general.'
  ),
  (
    'Han Solo',
    2,
    55,
    70,
    65,
    95,
    80,
    'Han is a skilled pilot and smuggler.'
  ),
  (
    'Yoda',
    2,
    900,
    100,
    85,
    80,
    100,
    'Yoda is one of the most powerful Jedi.'
  ),
  -- Lord of the Rings Characters
  (
    'Frodo Baggins',
    3,
    50,
    70,
    60,
    75,
    90,
    'Frodo is the ring-bearer.'
  ),
  (
    'Gandalf',
    3,
    2019,
    95,
    95,
    85,
    100,
    'Gandalf is a wizard of great power.'
  ),
  (
    'Aragorn',
    3,
    87,
    85,
    90,
    80,
    95,
    'Aragorn is the heir to the throne of Gondor.'
  ),
  (
    'Legolas',
    3,
    2931,
    80,
    85,
    80,
    90,
    'Legolas is an elf and a skilled archer.'
  ),
  (
    'Gollum',
    3,
    589,
    60,
    50,
    40,
    30,
    'Gollum was once a hobbit named Sméagol.'
  ),
  -- DC Universe Characters
  (
    'Superman',
    4,
    35,
    85,
    100,
    90,
    95,
    'Superman is from the planet Krypton.'
  ),
  (
    'Batman',
    4,
    40,
    95,
    85,
    85,
    80,
    'Batman is also known as Bruce Wayne.'
  ),
  (
    'Wonder Woman',
    4,
    3000,
    90,
    90,
    85,
    100,
    'Wonder Woman is an Amazonian princess.'
  ),
  (
    'The Flash',
    4,
    28,
    80,
    90,
    80,
    85,
    'The Flash is the fastest man alive.'
  ),
  (
    'Aquaman',
    4,
    32,
    75,
    85,
    80,
    90,
    'Aquaman is the king of Atlantis.'
  ),
  -- Marvel Universe Characters
  (
    'Spider-Man',
    5,
    18,
    85,
    80,
    85,
    90,
    'Spider-Man is also known as Peter Parker.'
  ),
  (
    'Iron Man',
    5,
    48,
    95,
    85,
    90,
    85,
    'Iron Man is a genius billionaire.'
  ),
  (
    'Captain America',
    5,
    101,
    80,
    85,
    90,
    95,
    'Captain America was frozen in ice for decades.'
  ),
  (
    'Thor',
    5,
    1500,
    75,
    95,
    80,
    90,
    'Thor is the Norse god of thunder.'
  ),
  (
    'Black Widow',
    5,
    34,
    85,
    75,
    85,
    80,
    'Black Widow is a former Russian spy.'); 
  `);
    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // end pool
    await pool.end();
  }
}

await resetDatabase();

/* create table universes (
    id bigint primary key generated always as identity,
    name text not null,
    description text,
    creator text
  ); 
  

  create table characters (
    id bigint primary key generated always as identity,
    name text not null,
    universe_id bigint references universes (id),
    age int,
    intellect int,
    power int,
    charisma int,
    morality int,
    fun_fact text
  );

  */
