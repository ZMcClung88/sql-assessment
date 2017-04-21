select * from vehicles
  join users on users.id = vehicles.ownerId
    where email = $1
