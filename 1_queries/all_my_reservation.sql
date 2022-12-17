SELECT reservations.id, title, start_date, cost_per_night, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, title, cost_per_night
ORDER BY start_date
LIMIT 10;