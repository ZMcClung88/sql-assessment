select vehicles.make, vehicles.model, vehicles.year, users.firstName, users.lastName from vehicles
  join users on users.id = vehicles.ownerId
    where year > 2000
    order by year desc
