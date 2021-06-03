const { Category } = require('../models');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');
const { CategoryCollection } = require('../collections');

class CategoryController extends Controller {
  async getAll() {
    const categories = await Category.findAll();
    const data = CategoryCollection.toArray(categories);

    return this.sendResponse(data);
  }

  // *Middleware Auth
  async create() {
    const validate = this.validate(['name']);

    if (validate) {
      const { name } = validate;
      const category = await Category.create({ name });

      const data = CategoryCollection.toJson(category);
      return this.sendResponse(data, 'Success create category', 201);
    }

    return null;
  }

  // *Middleware Auth
  async update() {
    const { id } = this.req.params;
    const validate = this.validate(['name']);

    if (validate) {
      const { name } = validate;

      const category = await Category.findOne({ where: { id } });
      category.name = name;
      await category.save();

      const data = CategoryCollection.toJson(category);
      return this.sendResponse(data, 'Success update');
    }

    return null;
  }

  // *Middleware Auth
  async delete() {
    const { id } = this.req.params;
    const category = await Category.findOne({ where: { id } });

    if (category === null) {
      throw new ResponseError('Category not found', 404);
    }

    await category.destroy();
    return this.sendResponse(null, 'Success delete category');
  }
}

module.exports = CategoryController;
