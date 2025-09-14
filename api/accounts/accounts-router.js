const router = require('express').Router()
const mw = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next({ status: 422, message: 'error in the GET request to /' })
  }
})

router.get('/:id', mw.checkAccountId, async (req, res, next) => { // eslint-disable-line
  res.json(req.account)
})

router.post(
  '/', 
  mw.checkAccountPayload, 
  mw.checkAccountNameUnique, 
  async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', 
  mw.checkAccountId, 
  mw.checkAccountPayload, 
  async (req, res, next) => {
    const updated = await Account.updateById(req.params.id, req.body)
  try {
    res.json(updated)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
