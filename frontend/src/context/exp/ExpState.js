import React, { useState } from 'react';
import ExpContext from './ExpContext';

const ExpState = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [total, setTotal] = useState(0);
    const [exptotal, setExptotal] = useState(0);
    const [available, setAvailable] = useState(0);

    // Income manipulations
    const addIncome = async (income) => {
        try {
            console.log("Adding an income");

            const response = await fetch(`http://localhost:5000/api/v1/add-income`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(income),
            });
            const json = await response.json();
            console.log(json);

            const addin = {
                user: "64719ad62d608481ee49fe86",
                title: income.title,
                amount: income.amount,
                type: "income",
                date: income.date,
                category: income.category,
                description: income.description,
                _id: "647def50c456489e555862e0",
                createdAt: "2023-06-05T14:21:04.712Z",
                updatedAt: "2023-06-05T14:21:04.712Z",
                __v: 0,
            };

            // Adding the new income to the array
            setIncomes((prevIncomes) => [...prevIncomes, addin]);

            alert("Income added successfully");
            getIncome();
        } catch (error) {
            console.error("Failed to add income:", error);
        }
    };

    const getIncome = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/get-incomes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json);
            setIncomes(Array.isArray(json) ? json : []);
            totalIncome(json);
        } catch (error) {
            console.error("Failed to fetch incomes:", error);
            setIncomes([]);
        }
    };

    const deleteIncome = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/delete-income/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json);

            const newincome = incomes.filter((income) => income._id !== id);
            setIncomes(newincome);
            alert("Income deleted successfully");
            getIncome();
        } catch (error) {
            console.error("Failed to delete income:", error);
        }
    };

    const totalIncome = (incomesArray) => {
        const x = incomesArray.reduce((sum, income) => sum + income.amount, 0);
        setTotal(x);
        return x;
    };

    // Expense manipulations
    const addExpense = async (expense) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/add-expense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(expense),
            });
            const json = await response.json();
            console.log(json);

            const addexp = {
                user: "64719ad62d608481ee49fe86",
                title: expense.title,
                amount: expense.amount,
                type: "expense",
                date: expense.date,
                category: expense.category,
                description: expense.description,
                _id: "647def50c456489e555862e0",
                createdAt: "2023-06-05T14:21:04.712Z",
                updatedAt: "2023-06-05T14:21:04.712Z",
                __v: 0,
            };

            // Adding the new expense to the array
            setExpenses((prevExpenses) => [...prevExpenses, addexp]);

            alert("Expense added successfully");
            getExpense();
        } catch (error) {
            console.error("Failed to add expense:", error);
        }
    };

    const getExpense = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/get-expenses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json);
            setExpenses(Array.isArray(json) ? json : []);
            totalExpense(json);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
            setExpenses([]);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/delete-expense/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json);

            const newexpense = expenses.filter((expense) => expense._id !== id);
            setExpenses(newexpense);
            alert("Expense deleted successfully");
            getExpense();
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };

    const totalExpense = (expensesArray) => {
        const x = expensesArray.reduce((sum, expense) => sum + expense.amount, 0);
        setExptotal(x);
        return x;
    };

    const getAvailable = async () => {
        try {
            const [incomesResponse, expensesResponse] = await Promise.all([
                fetch(`http://localhost:5000/api/v1/get-incomes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                }),
                fetch(`http://localhost:5000/api/v1/get-expenses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                }),
            ]);

            const incomesJson = await incomesResponse.json();
            const expensesJson = await expensesResponse.json();

            const inc = totalIncome(incomesJson);
            const exp = totalExpense(expensesJson);

            const sol = inc - exp;
            setAvailable(sol);
        } catch (error) {
            console.error("Failed to calculate available balance:", error);
        }
    };

    return (
        <ExpContext.Provider value={{ 
            getAvailable, available, deleteExpense, getExpense, addExpense, 
            totalIncome, total, incomes, deleteIncome, addIncome, getIncome, 
            exptotal, expenses, totalExpense 
        }}>
            {props.children}
        </ExpContext.Provider>
    );
};

export default ExpState;
