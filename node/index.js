const express = require('express');
const app = express();
const { Repository } = require('./repository');

const PORT = 3000;

app.get('/', async (_, res) => {
  const selectSql = `SELECT * FROM people`;
  const people = await Repository.query(selectSql);

  const title = '<h1>Full Cycle Rocks!</h1>';
  const list = `
    <ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

  res.send(title + list);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const createTable = `
    CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));
  `;
  Repository.query(createTable);
  const insertSql = `
    INSERT INTO people (name) values ('Anderson'), ('Henryck'), ('Leandro');
  `;
  Repository.query(insertSql);
});