const Todo = require("../Models/Todo");

class TodoController {
  async getAll(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Cannot get all todos" });
    }
  }

  async addTodo(req, res) {
    try {
      const newTodo = new Todo({
        id: req.body.id,
        taskName: req.body.taskName,
        done: false,
      });
      console.log(newTodo);
      await newTodo.save();
      res.status(200).json(newTodo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка при добавлении таски" });
    }
  }

  async deleteTodo(req, res) {
    try {
      const todo = await Todo.findById(req.params.id);
      console.log(todo);
      await todo.deleteOne();
      res.status(200).json({ msg: "Таска была успешно удалена" });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Выбранная таска не найдена" });
    }
  }

  async updateTodo(req, res) {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, req.body)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: `Таска с id ${id} не найдена` });
        } else {
          res.json(data);
        }
      })
      .catch((error) => {
        return res.status(500).json({ message: "Ошибка при обновлении таски" });
      });
  }
}

module.exports = new TodoController();
