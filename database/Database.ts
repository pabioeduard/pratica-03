import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

const db: SQLiteDatabase = openDatabaseSync('app.db');

export const createTable = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL
    );
  `);
};

export const addProduto = async (nome: string, preco: number, callback: () => void) => {
  await db.runAsync('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
  callback();
};

export const getProdutos = async (callback: (produtos: any[]) => void) => {
  const result = await db.getAllAsync('SELECT * FROM produtos');
  callback(result);
};

export const updateProduto = async (id: number, nome: string, preco: number, callback: () => void) => {
  await db.runAsync('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id]);
  callback();
};

export const deleteProduto = async (id: number, callback: () => void) => {
  await db.runAsync('DELETE FROM produtos WHERE id = ?', [id]);
  callback();
};