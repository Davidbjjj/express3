const { Pool } = require('pg');
const fs = require('fs');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'expreess_user',
  host: 'dpg-d0ru73u3jp1c73e4la50-a.oregon-postgres.render.com',
  database: 'expreess',
  password: 'w9TT2XodXFYEXmzy9jj986cQdMSa7bx5',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função para executar o script SQL
async function executeSqlScript() {
  const client = await pool.connect();
  
  try {
    // Lê o arquivo SQL
    const sqlScript = fs.readFileSync('setup.sql', 'utf8');
    
    console.log('Iniciando execução do script SQL...');
    
    // Divide o script em comandos individuais (separados por ;)
    const commands = sqlScript.split(';').filter(command => command.trim() !== '');
    
    // Executa cada comando sequencialmente
    for (const command of commands) {
      if (command.trim()) {
        console.log(`Executando: ${command.trim().substring(0, 50)}...`);
        await client.query(command);
      }
    }
    
    console.log('Script SQL executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar script SQL:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Chama a função principal
executeSqlScript();