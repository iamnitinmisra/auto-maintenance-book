DELETE FROM auto_u_vehicles
where VIN = $1
and user_id = $2;

select * from auto_u_vehicles
where user_id = $2;