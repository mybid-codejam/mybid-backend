'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('carts', {
      fields: ['assetId'],
      type: 'FOREIGN KEY',
      name: 'carts_assets_id_fk',
      references: {
        table: 'assets',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint('carts', {
      fields: ['email'],
      type: 'FOREIGN KEY',
      name: 'carts_users_email_fk',
      references: {
        table: 'users',
        field: 'email',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('carts', 'carts_assets_id_fk');

    await queryInterface.removeConstraint('carts', 'carts_users_email_fk');
  }
};
