cons db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const addNew = (car) => {
  return db('cars').insert(car, 'id').then(([id]) => getById(id))
}

const updateById = (id, changes) => {
  if (id) {
    return db('cars').where('id', id).update(changes).then((count) => (count > 0 ? getById(id) : null))
  }
}

const removeById = (id) => {
  if (id) {
    return db('cars').where('id', id).del()
  }
}

module.exports ={
  getAll, getById, addNew, updateById, removeById,
}