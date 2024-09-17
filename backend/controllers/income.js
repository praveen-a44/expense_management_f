const IncomeSchema = require("../models/IncomeModel")
const { body, validationResult } = require('express-validator')


exports.addIncome = async (req, res) => {
    try {
        let success = false;
        const { title, amount, category, description, date } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        const income = IncomeSchema({
            title,
            amount,
            category,
            description,
            date, user: req.user.id
        })
        const inSave = await income.save()
        res.json(inSave)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {
    let income = IncomeSchema.findById(req.params.id);
    if (!income) {
        return res.status(404).send("not found")
    }
    if (!{ user: req.user.id }) {
        return res.status(401).send("unauthorized")
    }
    await IncomeSchema.findByIdAndDelete(req.params.id)
    res.json("Income Deleted")
}