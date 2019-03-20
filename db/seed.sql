CREATE TABLE fitness_users (
id SERIAL NOT NULL,
password VARCHAR(255),
email VARCHAR(50),
username VARCHAR(30),
user_image TEXT,
calorie_goal INTEGER,
fat_goal_percent INTEGER,
protein_goal_percent INTEGER,
carb_goal_percent INTEGER,
PRIMARY KEY(id)
);

CREATE TABLE foods (
id SERIAL NOT NULL,
food VARCHAR(100),
calories INTEGER,
fat INTEGER,
protein INTEGER,
carb INTEGER,
PRIMARY KEY(id)
);

CREATE TABLE food_history (
id SERIAL NOT NULL,
date VARCHAR(50), 
repast VARCHAR(25),
food_id INTEGER NOT NULL,
food_quantity INTEGER,
user_id INTEGER NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (food_id) REFERENCES foods(id),
FOREIGN KEY (user_id) REFERENCES fitness_users(id)
);