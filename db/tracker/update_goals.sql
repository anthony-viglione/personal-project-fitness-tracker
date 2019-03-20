UPDATE fitness_users 
SET calorie_goal = ${calorieGoal}, fat_goal_percent = ${fatGoalPercent}, protein_goal_percent = ${proteinGoalPercent}, carb_goal_percent = ${carbGoalPercent}
WHERE email = ${email}

returning id, email, user_image, calorie_goal, fat_goal_percent,protein_goal_percent, carb_goal_percent;