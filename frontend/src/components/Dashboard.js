import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ExpContext from '../context/exp/ExpContext';
import Chart from './Chart.js';

function Dashboard() {
    const context = useContext(ExpContext);
    const { incomes, expenses, getAvailable, available, getExpense, getIncome, total, exptotal } = context;
    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getExpense();
            getIncome();
            getAvailable();
            history("/dashboard");
        } else {
            history("/");
        }
    }, []);

    return (
        <DashboardStyled>
            <div className="container-fluid">
                <h1 className="heading">Dashboard</h1>
                <div className="row">
                    <div className="col">
                        <h2 className="total-income">Budget Graph</h2>
                        <div className="container">
                            <Chart />
                        </div>
                    </div>
                    <div className="setcol col-md-4 mx-4">
                        <div className="history-con">
                            <h2 className="salary-title1">Min <span>Salary</span>Max</h2>
                            <div className="salary-item">
                                <p>${Math.min(...incomes.map(item => item.amount))}</p>
                                <p>${Math.max(...incomes.map(item => item.amount))}</p>
                            </div>
                            <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                            <div className="salary-item">
                                <p>${Math.min(...expenses.map(item => item.amount))}</p>
                                <p>${Math.max(...expenses.map(item => item.amount))}</p>
                            </div>
                        </div>
                        <h2 className="total-incomes mt-4">Total Expense: <span>${exptotal}</span></h2>
                        <h2 className="total-income my-1">Total Income: <span> ${total}</span></h2>
                        <h2 className="total-incomee">Available Balance: <span>${available}</span></h2>
                    </div>
                </div>
            </div>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income, .total-incomes, .total-incomee {
        display: flex;
        justify-content: center;
        align-items: left;
        background: #ffffff;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2rem;
            font-weight: 500;
        }
    }

    .total-incomee span {
        color: chocolate;
    }

    .total-incomes span {
        color: red;
    }
    .total-income span {
        color: green;
    }

    .heading {
        color: rgb(16, 124, 227);
    }

    .income-content {
        display: flex;
        gap: 2rem;
        .incomes {
            flex: 1;
           
        }
    }

    .history-con {
        grid-column: 4 / -1;
        h2 {
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title1, .salary-title {
            font-size: 1.2rem;
            color: rgba(11, 114, 212);
            span {
                font-size: 1.8rem;
            }
        }
        .salary-item {
            background: #FFFFFF;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
    }
`;

export default Dashboard;
