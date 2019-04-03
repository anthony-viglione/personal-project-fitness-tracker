SELECT foods.id, foods.food, foods.calories, foods.fat, foods.protein, foods.carb, fu.email
FROM foods
JOIN fitness_users fu ON foods.user_id = fu.id
WHERE user_id = ${id}