INSERT INTO auto_u_v_records (vehicle_vin, work_type, part, miles, notes)
VALUES ($1, $2, $3, $4, $5)
returning *;

