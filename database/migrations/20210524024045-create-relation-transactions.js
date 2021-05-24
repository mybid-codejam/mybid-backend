'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('transactions', {
      fields: ['assetId'],
      type: 'FOREIGN KEY',
      name: 'transactions_assets_id_fk',
      references: {
        table: 'assets',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });

    await queryInterface.addConstraint('transactions', {
      fields: ['email'],
      type: 'FOREIGN KEY',
      name: 'transactions_users_email_fk',
      references: {
        table: 'users',
        field: 'email',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('transactions', 'transactions_assets_id_fk');

    await queryInterface.removeConstraint('transactions', 'transactions_users_email_fk');
  }
};
