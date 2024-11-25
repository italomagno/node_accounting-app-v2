const { Router } = require('express');
const expensesService = require('../services/expenses.service');

const expensesRouter = Router();

expensesRouter.get('/', (req, res) => {
  const query = req.query;

  if (Object.keys(query).length > 0) {
    const filteredExpenses = expensesService.getExpenseByQuery(query);

    res.status(200).json(filteredExpenses);

    return;
  }

  const expenses = expensesService.getAll();

  res.status(200).json(expenses);
});

expensesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.status(404).json({
      message: 'Expense not found',
    });

    return;
  }

  res.json(expense);
});

expensesRouter.post('/', (req, res) => {
  const expense = req.body;

  if (!expense.userId) {
    res.status(400).json({
      message: 'userId is required',
    });

    return;
  }

  const createdExpense = expensesService.create(expense);

  if (!createdExpense) {
    res.status(400).json({
      message: 'User not found',
    });

    return;
  }

  res.status(201).json(createdExpense);
});

expensesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  const updatedExpense = expensesService.update(id, expense);

  if (!updatedExpense) {
    res.status(404).json({
      message: 'Expense not found',
    });

    return;
  }

  res.status(200).json(updatedExpense);
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const hasRemovedExpense = expensesService.remove(id);

  if (!hasRemovedExpense) {
    res.status(404).json({
      message: 'Expense not found',
    });

    return;
  }

  res.status(204).end();
});

module.exports = {
  expensesRouter,
};
