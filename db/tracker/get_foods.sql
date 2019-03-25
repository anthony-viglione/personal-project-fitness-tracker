SELECT foods.food, foods.calories, foods.fat, foods.protein, foods.carb, fu.email
FROM foods
join fitness_users fu on foods.user_id = fu.id
WHERE user_id = ${id}