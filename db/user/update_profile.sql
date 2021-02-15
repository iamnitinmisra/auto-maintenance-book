INSERT INTO auto_u_profiles (user_id, first_name, last_name)
VALUES ($1, $2, $3)
returning *;