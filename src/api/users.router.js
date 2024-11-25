const { Router } = require('express');

const usersService = require('../services/users.service');

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  try {
    const users = usersService.getAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching users',
      error: error.message,
    });
  }
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(id);

  if (!user) {
    res.status(404).end();

    return;
  }

  res.status(200).json(user);
});

usersRouter.post('/', (req, res) => {
  const user = req.body;

  if (!user.name) {
    res.status(400).json({
      message: 'Name is required',
    });

    return;
  }

  const newUser = usersService.create(user);

  res.status(201).json(newUser);
});

usersRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  const updatedUser = usersService.update(id, user);

  if (!updatedUser) {
    res.status(404).end();

    return;
  }

  res.status(200).json(updatedUser);
});

usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  const updatedUser = usersService.update(id, user);

  if (!updatedUser) {
    res.status(404).end();

    return;
  }

  res.status(200).json(updatedUser);
});

usersRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const isDeleted = usersService.remove(id);

    if (!isDeleted) {
      res.status(404).end();

      return;
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the user',
      error: error.message,
    });
  }
});

module.exports = { usersRouter };
