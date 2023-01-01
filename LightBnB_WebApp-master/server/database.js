const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let queryEmail = email.toLowerCase();
  return pool
    .query(`
      SELECT * 
      FROM users 
      WHERE email = $1;`, [queryEmail])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
      SELECT * 
      FROM users 
      WHERE id = $1;`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  let name = user.name;
  let email = user.email;
  let password = user.password;

  return pool
    .query(`
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)
      RETURNING *;`, [name, email, password])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guestId, limit = 10) {
  return pool.query(`
    SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE property_reviews.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC
    LIMIT $2;`, [guestId, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city.slice(1)}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    let minimumPrice = Number(options.minimum_price_per_night) * 100;
    queryParams.push(`${minimumPrice}`);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
    } else if (queryParams.length === 2) {
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    }
  }

  if (options.maximum_price_per_night) {
    let maximumPrice = Number(options.maximum_price_per_night) * 100;
    queryParams.push(`${maximumPrice}`);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    }
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch(err => console.log(err.message));
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  return pool
    .query(`
      INSERT INTO properties (
      title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
      VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;`, [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night * 100, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.province, property.city, property.country, property.street, property.post_code])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });

};
exports.addProperty = addProperty;
