INSERT INTO auto_u_v_records (vehicle_vin, work_type, part, miles)
VALUES ($1, $2, $3, $4)
returning *;

