-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS users;

create table users (
  id serial primary key,
  firstName varchar(25),
  lastName varchar(25),
  email varchar(30)
)

insert into users (firstName, lastName, email) values ( 'John', 'Smith', 'John@Smith.com'),
insert into users (firstName, lastName, email) values( 'Dave', 'Davis', 'Dave@Davis.com'),
insert into users (firstName, lastName, email) values( 'Jane', 'Janis', 'Jane@Janis.com');
