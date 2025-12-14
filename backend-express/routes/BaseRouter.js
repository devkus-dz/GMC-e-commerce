import express from 'express';

class BaseRouter {
  constructor(controller, middleware = {}) {
    this.router = express.Router();
    this.controller = controller;
    this.middleware = middleware;
    this.initializeRoutes();
  }

  // Helper to safely get a handler or throw a clear error
  getHandler(methodName) {
    const handler = this.controller[methodName];
    if (!handler) {
      console.error(
        `❌ Error: Method '${methodName}' is missing in the ${this.controller.constructor.name}.`
      );
      // Return a dummy function to prevent server crash during startup debugging
      return (req, res) => res.status(500).send('Handler missing');
    }
    return handler;
  }

  initializeRoutes() {
    // 1. GET / -> getAll
    this.router.get('/', this.getHandler('getAll'));

    // 2. GET /:id -> getById
    this.router.get('/:id', this.getHandler('getById'));

    // 3. POST / -> create
    const createMiddleware = this.middleware.create || [];
    this.router.post('/', ...createMiddleware, this.getHandler('create'));

    // 4. PUT /:id -> update
    const updateMiddleware = this.middleware.update || [];
    this.router.put('/:id', ...updateMiddleware, this.getHandler('update'));

    // 5. DELETE /:id -> delete
    const deleteMiddleware = this.middleware.delete || [];
    this.router.delete('/:id', ...deleteMiddleware, this.getHandler('delete'));
  }

  getRouter() {
    return this.router;
  }
}

export default BaseRouter;