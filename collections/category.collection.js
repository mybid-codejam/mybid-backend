const { dateTimeFormat } = require('../helper/helper');

class CategoryCollection {
  static toArray(categories) {
    const data = [];
    for (let i = 0; i < categories.length; i++) {
      data.push({
        id: categories[i].id,
        name: categories[i].name,
        createdAt: categories[i].createdAt,
        createdAtDesc: dateTimeFormat(categories[i].createdAt),
        updatedAt: categories[i].updatedAt,
        updatedAtDesc: dateTimeFormat(categories[i].updatedAt),
      });
    }
    return data;
  }

  static toJson(category) {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      createdAtDesc: dateTimeFormat(category.createdAt),
      updatedAt: category.updatedAt,
      updatedAtDesc: dateTimeFormat(category.updatedAt),
    };
  }
}

module.exports = CategoryCollection;
