INSERT INTO foods (user_id, food, calories, protein, carb, fat)
VALUES (${id},${food},${calories},${protein},${carb},${fat});

SELECT id
FROM foods
WHERE user_id = ${id};