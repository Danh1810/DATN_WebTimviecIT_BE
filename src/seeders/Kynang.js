'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kynang', [
      {
        id: 1,
        ten: 'JavaScript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        ten: 'Python',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        ten: 'Java',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        ten: 'SQL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        ten: 'DevOps',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kynang', null, {});
  }
};
