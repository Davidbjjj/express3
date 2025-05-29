require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoints para Pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

app.post('/pessoas', async (req, res) => {
  const { nome, titulo, resumo, foto_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pessoas (nome, titulo, resumo, foto_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, titulo, resumo, foto_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar pessoa' });
  }
});

// Endpoints para Experiências
app.get('/pessoas/:id/experiencias', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM experiencias WHERE pessoa_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar experiências' });
  }
});

app.post('/pessoas/:id/experiencias', async (req, res) => {
  const { id } = req.params;
  const { cargo, empresa, periodo, descricao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO experiencias (pessoa_id, cargo, empresa, periodo, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, cargo, empresa, periodo, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar experiência' });
  }
});

// Endpoints para Formação
app.get('/pessoas/:id/formacao', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM formacao WHERE pessoa_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar formação' });
  }
});

app.post('/pessoas/:id/formacao', async (req, res) => {
  const { id } = req.params;
  const { curso, instituicao, periodo, descricao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO formacao (pessoa_id, curso, instituicao, periodo, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, curso, instituicao, periodo, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar formação' });
  }
});

// Endpoints para Habilidades
app.get('/pessoas/:id/habilidades', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM habilidades WHERE pessoa_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar habilidades' });
  }
});

app.post('/pessoas/:id/habilidades', async (req, res) => {
  const { id } = req.params;
  const { nome, nivel, categoria } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO habilidades (pessoa_id, nome, nivel, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, nome, nivel, categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar habilidade' });
  }
});

// Endpoints para Projetos
app.get('/pessoas/:id/projetos', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projetos WHERE pessoa_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
});

app.post('/pessoas/:id/projetos', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, tecnologias, link } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projetos (pessoa_id, nome, descricao, tecnologias, link) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, nome, descricao, tecnologias, link]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar projeto' });
  }
});

// Endpoints para Contatos
app.get('/pessoas/:id/contatos', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM contatos WHERE pessoa_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar contatos' });
  }
});

app.post('/pessoas/:id/contatos', async (req, res) => {
  const { id } = req.params;
  const { tipo, valor, icone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contatos (pessoa_id, tipo, valor, icone) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, tipo, valor, icone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar contato' });
  }
});

// Endpoint para inicialização do banco (executa todo o SQL)
app.post('/init-database', async (req, res) => {
  try {
    // Aqui você pode incluir todo o seu script SQL como uma string
    // Ou ler de um arquivo como no exemplo anterior
    const sqlScript = `
      -- Seu script SQL completo aqui
      -- (o mesmo que você tinha no arquivo setup.sql)
    `;
    
    const commands = sqlScript.split(';').filter(cmd => cmd.trim() !== '');
    
    for (const command of commands) {
      if (command.trim()) {
        await pool.query(command);
      }
    }
    
    res.json({ message: 'Banco de dados inicializado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao inicializar banco de dados' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});