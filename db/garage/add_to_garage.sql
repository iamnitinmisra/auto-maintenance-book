insert into auto_u_vehicles(VIN, user_id, make, model, year)
values ($1, $2, $3, $4, $5);

select * from auto_u_vehicles
where user_id = $2;