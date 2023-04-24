const fs = require('fs');
const Joi = require('joi');
const faker = require('faker');

// Define schemas
const locationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});

const inventorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  locationId: Joi.string().required(),
});

const employeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  hourlyPayRate: Joi.number().integer().min(0).required(),
  locationId: Joi.string().required(),
});

// Generate sample data
const locations = Array.from({ length: 10 }, () => ({
  name: faker.company.companyName(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumber(),
}));

const inventory = Array.from({ length: 10 }, () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  quantity: faker.random.number(100),
  price: parseFloat(faker.commerce.price(1, 100)),
  locationId: faker.random.arrayElement(locations).id,
}));

const employees = Array.from({ length: 10 }, () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  hourlyPayRate: faker.random.number(50),
  locationId: faker.random.arrayElement(locations).id,
}));

// Write data to file
const data = {
  locations,
  inventory,
  employees,
};

fs.writeFileSync('data.json', JSON.stringify(data));
console.log('Sample data saved to data.json');
