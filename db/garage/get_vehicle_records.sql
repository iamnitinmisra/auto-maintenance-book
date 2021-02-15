SELECT auto_u_v_records.vehicle_id, auto_u_v_records.miles, auto_work_type.work_type, auto_parts.category, auto_parts.name  FROM auto_u_v_records
INNER JOIN auto_parts ON auto_u_v_records.part = auto_parts.id
INNER JOIN auto_work_type on auto_u_v_records.work_type = auto_work_type.id
WHERE vehicle_id = $1;