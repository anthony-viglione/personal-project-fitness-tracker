INSERT INTO fitness_users (
    email, password, user_image
)
values(${email}, ${password}, ${user_image})

returning id, email, user_image