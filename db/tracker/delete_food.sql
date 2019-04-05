DELETE FROM foods WHERE id = $1;

SELECT foods.id, foods.food, foods.calories, foods.fat, foods.protein, foods.carb, fitness_users.email
FROM foods
JOIN fitness_users ON foods.user_id = fitness_users.id
WHERE fitness_users.id = $2