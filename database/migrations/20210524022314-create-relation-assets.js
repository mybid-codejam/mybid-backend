'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('assets', {
      fields: ['email'],
      type: 'FOREIGN KEY',
      name: 'assets_users_email_fk',
      references: {
        table: 'users',
        field: 'email',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint('assets', {
      fields: ['categoryId'],
      type: 'FOREIGN KEY',
      name: 'assets_categories_id_fk',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('assets', 'assets_users_email_fk');

    await queryInterface.removeConstraint('assets', 'assets_categories_id_fk');
  }
};
