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

router.get('/:id', mw.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post(
  '/', 
  mw.checkAccountPayload, 
  mw.checkAccountNameUnique, 
  (req, res, next) => {
  try {
    res.json('post accounts')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', 
  mw.checkAccountId, 
  mw.checkAccountNameUnique, 
  mw.checkAccountPayload, 
  (req, res, next) => {
  try {
    res.json('edit accounts by id')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
  try {
    res.json('delete accounts by id')
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
