const db = require('../../data/db-config');

const getAll = () => {
  // select * from accounts;
  return db('accounts');
}

const getById = id => {
  // select * from accounts where accountid = id
  return db('accounts').where('id', id)
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
