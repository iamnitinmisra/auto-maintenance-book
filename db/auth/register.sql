INSERT INTO auto_users(user_email, hash)
values ($1, $2)
RETURNING user_email;
