const dbConfig = {
  host: 'localhost',
  username: 'postgres',
  password: 'desafioluby',
  database: 'desafiolubynode',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  }
} 

module.exports = dbConfig;