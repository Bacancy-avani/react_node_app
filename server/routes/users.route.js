const users = require('../controllers/users.controller.js');

const routes = (app) => {
  // app.get('/basic-questions/:limit?/:search?/:skip?/:sort?/:asc?', basicQuestionsControllers.list);
  app.get('/users/', users.list);
  app.get('/users/:id', users.listById);
  app.post('/users', users.create);
  app.put('/users/:id', users.edit);
  app.delete('/users/:id', users.delete);
  app.put('/users/:id/active', users.active);
  app.put('/users/:id/deactive', users.deActive);
};

module.exports = { routes };
