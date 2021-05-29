const { Category } = require('../models');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');

class CategoryController extends Controller {
  async getAll() {
    const categories = await Category.findAll();
    const data = [];
    for (let i = 0; i < categories.length; i++) {
      data.push({
        id: categories[i].id,
        name: categories[i].name,
        createdAt: categories[i].createdAt,
        updatedAt: categories[i].updatedAt,
      });
    }

    return this.sendResponse(data);
  }

  async create() {
    const validate = this.validate(['name']);

    if (validate) {
      const { name } = validate;

      const category = await Category.create({ name });

      return this.sendResponse({
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }, 'Success create category', 201);
    }

    return null;
  }

  async update() {
    const { id } = this.req.params;
    const validate = this.validate(['name']);

    if (validate) {
      const { name } = validate;

      const category = await Category.findOne({ where: { id } });
      category.name = name;
      category.save();

      return this.sendResponse({
        id: category.id,
        name: category.name,
        cratedAt: category.createdAt,
        updatedAt: category.updatedAt,
      }, 'Success update');
    }

    return null;
  }

  async delete() {
    const { id } = this.req.params;
    const category = await Category.findOne({ where: { id } });

    if (category === null) {
      throw new ResponseError('Category not found', 404);
    } else {
      await category.destroy();

      return this.sendResponse(null, 'Success delete category');
    }
  }
}

module.exports = CategoryController;
