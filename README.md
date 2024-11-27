npx sequelize-cli db:seed:all

npx sequelize-cli db:migrate

UPDATE datn.quyen
SET URL = JSON_ARRAY(
'/hoso',
'/hoso/detail',
'/ngtviec/detail',
'/ngtviec/hoso',
'/ngtviec/lcv',
'/tintd',
'/nhatd',
'/tintd/details'
)
WHERE id = <id cần cập nhật>;

npx kill-port 3060
