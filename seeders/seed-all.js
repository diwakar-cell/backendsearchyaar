'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // ----------------- Countries -----------------
      await queryInterface.bulkInsert('countries', [
        { name: 'India', created_At: new Date(),
        updated_At: new Date() }
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
        created_At: new Date(),
        updated_At: new Date()
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
            created_At: new Date(),
            updated_At: new Date()
          });
        });
      }

      await queryInterface.bulkInsert('cities', citiesToInsert, {});
      console.log('✅ Cities inserted');

      // ----------------- Categories -----------------
      await queryInterface.bulkInsert('categories', [
        { name: 'Restaurants & Food Places', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Hotels & Travel', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Restaurants & Food Places', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Hotels & Travel', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Healthcare & Medical Services', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Education & Training Institutes', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Home Services & Repairs', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Shopping & Retail Stores', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Automobiles (Sales, Service, Rentals)', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Real Estate & Property Services', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Beauty & Personal Care', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Professional Services (Legal, Finance)', type: 'service', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Categories inserted');

      // ----------------- Products -----------------
      await queryInterface.bulkInsert('products', [
        { name: 'Electronics (mobiles, laptops, appliances)', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Clothing & fashion wear', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Electronics (mobiles, laptops, appliances)', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Clothing & fashion wear', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Furniture & home décor', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Groceries & daily essentials', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Medicines & health supplies', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Jewelry & accessories', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Kitchen appliances & cookware', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Sports & fitness equipment', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Automobiles & auto parts', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Books, stationery & office supplies', type: 'physical', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Products inserted');

      // ----------------- Services -----------------
      await queryInterface.bulkInsert('services', [
        { name: 'Hair Salon services', type: 'personal care', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Hair Salon services', type: 'personal care', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Electrician, carpenter services', type: 'home service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'AC repair & installation', type: 'home service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'House shifting & packers/movers', type: 'logistics', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Accounting and GST consultation', type: 'finance', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Doctor appointments consultations', type: 'healthcare', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Travel booking & tour packages', type: 'travel', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Catering services for events', type: 'food service', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Car/bike service & repair', type: 'automobile', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Digital Marketing Services', type: 'professional', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Services inserted');

      // ----------------- Deals -----------------
      await queryInterface.bulkInsert('deals', [
        { name: 'Flat 20% off on first-time AC service bookings this week', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Flat 20% off on first-time AC service bookings this week', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        { name: '₹299 health check-up at selected diagnostic centers', type: 'health', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Exclusive room discount (up to 25%) on hotel bookings', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        { name: '15% off on gold & diamond jewelry at listed outlets', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        { name: '10% cashback on online payments for home cleaning', type: 'cashback', createdAt: new Date(), updatedAt: new Date() },
        { name: '0 service charges on local packers for same-city', type: 'offer', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Buy 1 Get 1 Free pizza deal at top restaurants near you', type: 'bogo', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Festive offer: 15% off on gold jewelry at listed outlets', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Food festival weekend showcasing local restaurants', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Flat 20% off on recharge and DTH', type: 'discount', createdAt: new Date(), updatedAt: new Date() },
        // ... rest
      ], {});
      console.log('✅ Deals inserted');

      // ----------------- Events -----------------
      await queryInterface.bulkInsert('events', [
        { name: 'Food Festival Weekend - Discover top restaurants', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Food Festival Weekend - Discover top restaurants', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Auto Showcase - Latest bikes & cars from leading dealers', type: 'expo', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Wellness Fair - Free yoga sessions, Near You', type: 'wellness', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Tech Carnival - Mobile stores launching new models', type: 'expo', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Real Estate Showcase - Builders presenting new projects', type: 'expo', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Food festival weekend showcasing local restaurants', type: 'festival', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Art and book fair featuring authors, workshops, exhibits', type: 'fair', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Education open house offering demo classes sessions', type: 'education', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Home expo presenting furniture, decor limited-time deal', type: 'expo', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Photography exhibition showcasing local talent', type: 'exhibition', createdAt: new Date(), updatedAt: new Date() },
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
          otp_expires: Date.now() + 1800000,
          // otp_expires: new Date(Date.now() + 3600000),
          is_verified: true,
          created_At: new Date(),
          updated_At: new Date()
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

