const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_cms_db');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Page = conn.define('page', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING
  }
});

const mapAndSave = (pages)=> Promise.all(pages.map( page => Page.create(page)));

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const home = await Page.create({ title: 'Home Page' });
}

syncAndSeed();
