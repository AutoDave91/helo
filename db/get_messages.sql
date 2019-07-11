SELECT hp.*, hu.username FROM helo_posts AS hp
JOIN helo_user AS hu
ON hu.user_id = hp.post_id