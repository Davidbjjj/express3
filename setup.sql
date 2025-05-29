-- Criação das tabelas

CREATE TABLE pessoas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  titulo VARCHAR(100),
  resumo TEXT,
  foto_url VARCHAR(255)
);

CREATE TABLE experiencias (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER REFERENCES pessoas(id),
  cargo VARCHAR(100) NOT NULL,
  empresa VARCHAR(100) NOT NULL,
  periodo VARCHAR(50),
  descricao TEXT
);

CREATE TABLE formacao (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER REFERENCES pessoas(id),
  curso VARCHAR(100) NOT NULL,
  instituicao VARCHAR(100) NOT NULL,
  periodo VARCHAR(50),
  descricao TEXT
);

CREATE TABLE habilidades (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER REFERENCES pessoas(id),
  nome VARCHAR(100) NOT NULL,
  nivel VARCHAR(50),
  categoria VARCHAR(50)
);

CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER REFERENCES pessoas(id),
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  tecnologias VARCHAR(255),
  link VARCHAR(255)
);

CREATE TABLE contatos (
  id SERIAL PRIMARY KEY,
  pessoa_id INTEGER REFERENCES pessoas(id),
  tipo VARCHAR(50) NOT NULL,
  valor VARCHAR(100) NOT NULL,
  icone VARCHAR(50)
);

-- Inserção de dados para duas pessoas

-- Pessoa 1
INSERT INTO pessoas (nome, titulo, resumo, foto_url) VALUES (
  'João Silva',
  'Desenvolvedor Full Stack',
  'Desenvolvedor com 5 anos de experiência em JavaScript, React, Node.js e PostgreSQL. Apaixonado por criar soluções eficientes e escaláveis.',
  'https://example.com/foto-joao.jpg'
);

-- Pessoa 2
INSERT INTO pessoas (nome, titulo, resumo, foto_url) VALUES (
  'Maria Souza',
  'UX/UI Designer',
  'Designer com foco em experiência do usuário e interfaces intuitivas. Especializada em design thinking e prototipagem rápida.',
  'https://example.com/foto-maria.jpg'
);

-- Experiências para João
INSERT INTO experiencias (pessoa_id, cargo, empresa, periodo, descricao) VALUES
(1, 'Desenvolvedor Sênior', 'Tech Solutions Inc', '2020 - Presente', 'Liderança de equipe de desenvolvimento de aplicações web. Arquitetura de sistemas.'),
(1, 'Desenvolvedor Pleno', 'WebDev Corp', '2018 - 2020', 'Desenvolvimento de aplicações React e Node.js.');

-- Experiências para Maria
INSERT INTO experiencias (pessoa_id, cargo, empresa, periodo, descricao) VALUES
(2, 'UX Designer', 'DesignHub', '2019 - Presente', 'Criação de interfaces e fluxos de usuário para aplicativos móveis.'),
(2, 'UI Designer', 'Creative Agency', '2017 - 2019', 'Design de interfaces para websites e aplicativos.');

-- Formação para João
INSERT INTO formacao (pessoa_id, curso, instituicao, periodo, descricao) VALUES
(1, 'Ciência da Computação', 'Universidade Federal', '2014 - 2018', 'Formação com ênfase em sistemas distribuídos.');

-- Formação para Maria
INSERT INTO formacao (pessoa_id, curso, instituicao, periodo, descricao) VALUES
(2, 'Design Gráfico', 'Escola de Design', '2013 - 2017', 'Especialização em design de interação.');

-- Habilidades para João
INSERT INTO habilidades (pessoa_id, nome, nivel, categoria) VALUES
(1, 'JavaScript', 'Avançado', 'Programação'),
(1, 'React', 'Avançado', 'Front-end'),
(1, 'Node.js', 'Avançado', 'Back-end'),
(1, 'PostgreSQL', 'Intermediário', 'Banco de Dados');

-- Habilidades para Maria
INSERT INTO habilidades (pessoa_id, nome, nivel, categoria) VALUES
(2, 'Figma', 'Avançado', 'Design'),
(2, 'Adobe XD', 'Avançado', 'Design'),
(2, 'UI Design', 'Avançado', 'Design'),
(2, 'UX Research', 'Intermediário', 'Pesquisa');

-- Projetos para João
INSERT INTO projetos (pessoa_id, nome, descricao, tecnologias, link) VALUES
(1, 'Sistema de Gestão', 'Sistema completo para gestão de pequenas empresas', 'React, Node.js, PostgreSQL', 'https://github.com/joao/gestao'),
(1, 'App de Tarefas', 'Aplicativo para gerenciamento de tarefas pessoais', 'React Native, Firebase', 'https://github.com/joao/tasks');

-- Projetos para Maria
INSERT INTO projetos (pessoa_id, nome, descricao, tecnologias, link) VALUES
(2, 'Redesign App Bancário', 'Redesign completo da experiência do usuário', 'Figma, Adobe XD', 'https://dribbble.com/maria/bank'),
(2, 'Site Institucional', 'Design e protótipo para site corporativo', 'Sketch, InVision', 'https://dribbble.com/maria/corporate');

-- Contatos para João
INSERT INTO contatos (pessoa_id, tipo, valor, icone) VALUES
(1, 'Email', 'joao@example.com', 'email'),
(1, 'LinkedIn', 'linkedin.com/in/joao', 'linkedin'),
(1, 'GitHub', 'github.com/joao', 'github'),
(1, 'Telefone', '+55 11 99999-9999', 'phone');

-- Contatos para Maria
INSERT INTO contatos (pessoa_id, tipo, valor, icone) VALUES
(2, 'Email', 'maria@example.com', 'email'),
(2, 'Behance', 'behance.net/maria', 'behance'),
(2, 'Dribbble', 'dribbble.com/maria', 'dribbble'),
(2, 'Telefone', '+55 11 98888-8888', 'phone');