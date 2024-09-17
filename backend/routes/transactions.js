const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

const router = require('express').Router();
var fetchuser = require('../middleware/fetchuser')
router.post('/add-income', fetchuser, addIncome)
    .get('/get-incomes', fetchuser, getIncomes)
    .delete('/delete-income/:id', fetchuser, deleteIncome)
    .post('/add-expense', fetchuser, addExpense)
    .get('/get-expenses', fetchuser, getExpense)
    .delete('/delete-expense/:id', fetchuser, deleteExpense)

module.exports = router
