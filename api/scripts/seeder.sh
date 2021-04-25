echo "
----------------------
  seed mongodb
----------------------
"

mongo
use simple_db
db.users.insert({
    "firstName" : "Admin",
    "lastName" : "Admin",
    "userName": "admin",
    "email" : "admin@test.com",
    "deleted": false,
    "disabled": false,
    "role" : "admin",
    "password": "\$2b\$12$\zYDiNpsOEJzb2DVnHjlY5OESl/ymRp3W7BtuZJgqehtuei.bkfdsS"
})