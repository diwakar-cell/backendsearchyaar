'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // ----------------- Countries -----------------
      await queryInterface.bulkInsert('countrys', [
        { name: 'India', createdAt: new Date(),
        updatedAt: new Date() }
      ], {});
      console.log('✅ Countries inserted');

      // Fetch India ID
      const [countries] = await queryInterface.sequelize.query(
        `SELECT id FROM countries WHERE name = 'India';`
      );
      const indiaId = countries[0].id;

      // ----------------- States -----------------
      const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
        'Jammu and Kashmir', 'Ladakh', 'Puducherry'
      ];

      const statesToInsert = indianStates.map(state => ({
        name: state,
        country_id: indiaId,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('states', statesToInsert, {});
      console.log('✅ States inserted');

      const [states] = await queryInterface.sequelize.query(
        `SELECT id, name FROM states WHERE country_id = ${indiaId};`
      );

      const stateMap = {};
      states.forEach(state => stateMap[state.name] = state.id);

      // ----------------- Cities -----------------
      const citiesData = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
        'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Pasighat'],
        'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat'],
        'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
        // ... continue for all states
      };

      const citiesToInsert = [];
      for (const [stateName, cityList] of Object.entries(citiesData)) {
        const state_id = stateMap[stateName];
        if (!state_id) continue;
        cityList.forEach(city => {
          citiesToInsert.push({
            name: city,
            state_id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }

      await queryInterface.bulkInsert('cities', citiesToInsert, {});
      console.log('✅ Cities inserted');

      // ----------------- Categories -----------------
      await queryInterface.bulkInsert('categories', [
        { name: 'Restaurants & Food Places', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Hotels & Travel', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Categories inserted');

      // ----------------- Products -----------------
      await queryInterface.bulkInsert('products', [
        { name: 'Electronics (mobiles, laptops, appliances)', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Clothing & fashion wear', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Products inserted');

      // ----------------- Services -----------------
      await queryInterface.bulkInsert('services', [
        { name: 'Hair Salon services', type: 'personal care', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Services inserted');

      // ----------------- Deals -----------------
      await queryInterface.bulkInsert('deals', [
        { name: 'Flat 20% off on first-time AC service bookings this week', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Deals inserted');

      // ----------------- Events -----------------
      await queryInterface.bulkInsert('events', [
        { name: 'Food Festival Weekend - Discover top restaurants', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Events inserted');

      // ----------------- Users -----------------
      await queryInterface.bulkInsert('users', [
        {
          fullName: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          password: '$2b$10$7Qjz8M0b/7zPZheT0FJmUuF/3dFQ3dSbl2B0TX5DhpXZqXrI5Zg0a',
          mobile: '9876543210',
          gender: 'Female',
          otp: '123456',
          otp_expires: new Date(Date.now() + 3600000),
          is_verified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // ... rest users
      ], {});
      console.log('✅ Users inserted');

      console.log('🎉 Seeder completed successfully!');
    } catch (err) {
      console.error('❌ Seeder failed:', err);
      throw err; // Important to let Sequelize know the seed failed
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('events', null, {});
      await queryInterface.bulkDelete('deals', null, {});
      await queryInterface.bulkDelete('services', null, {});
      await queryInterface.bulkDelete('products', null, {});
      await queryInterface.bulkDelete('categories', null, {});
      await queryInterface.bulkDelete('cities', null, {});
      await queryInterface.bulkDelete('states', null, {});
      await queryInterface.bulkDelete('countries', null, {});
      console.log('🗑️  Seed rollback completed!');
    } catch (err) {
      console.error('❌ Seed rollback failed:', err);
      throw err;
    }
  }
};
