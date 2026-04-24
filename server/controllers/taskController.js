const { Task } = require('../models');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt','DESC']] });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    
    const existing = await Task.findOne({ where: { title, userId: req.user.id } });
    if (existing) return res.status(400).json({ message: 'A task with this title already exists' });

    const task = await Task.create({ title, description, priority, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.update(req.body);
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};
