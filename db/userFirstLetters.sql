select * from users
  join vehicles on users.id = vehicles.ownerId
    where users.firstName like $1;
