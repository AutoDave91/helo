SELECT * FROM helo_posts
WHERE title ILIKE '%'||$1||'%'