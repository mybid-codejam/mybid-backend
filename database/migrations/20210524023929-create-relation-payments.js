'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('payments', {
      fields: ['transactionId'],
      type: 'FOREIGN KEY',
      name: 'payments_transactions_id_fk',
      references: {
        table: 'transactions',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('payments', 'payments_transactions_id_fk');
  }
};
