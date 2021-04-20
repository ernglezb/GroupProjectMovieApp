DROP DATABASE IF EXISTS moviesDB;
CREATE DATABASE moviesDB;

USE moviesDB;

create table Users(
    user_id int primary key auto_increment,
    user_first_name varchar(15) not null,
	user_last_name varchar(15) not null,
    user_email varchar(25) not null,
    user_password varchar(15) not null,
    user_join_date datetime default current_timestamp

);

create table Movies(
	movie_id int primary key,    
    movie_name varchar(45) not null,
    movie_description varchar(600) not null,
    movie_revenue int,
    movie_image varchar(80),
    movie_budget int,
    movie_release_date varchar(10),
    movie_rating_average decimal(2,1)
    
	);
    
create table UserLists
(
    list_id          int primary key auto_increment,
    list_name        varchar(30) not null,
    list_description varchar(50) not null,
    user_id          int         not null,
    foreign key (user_id) references Users (user_id)
);
create table Movies
(
    movie_id             int primary key,
    movie_name           varchar(90) not null,
    movie_description    text        not null,
    movie_revenue        int,
    movie_image          varchar(80),
    movie_budget         int,
    movie_runtime        int,
    movie_release_date   varchar(10),
    movie_rating_average decimal(2, 1),
    date_added           TIMESTAMP default CURRENT_TIMESTAMP

);

create table Genres
(
    genre_id   int primary key,
    genre_type varchar(20) not null
);

create table MovieGenres
(
    movie_id int not null,
    foreign key (movie_id) references Movies (movie_id),
    genre_id int not null,
    foreign key (genre_id) references Genres(genre_id),
    PRIMARY KEY (genre_id, movie_id)
);

create table MovieLists(
	list_id  int  not null, 
    foreign key (list_id) references UserLists(list_id),
    movie_id int not null, 
    foreign key (movie_id) references movies(movie_id), 
    PRIMARY KEY (list_id, movie_id)

	);
    

    

-- Populating Movies Table

INSERT INTO `moviesdb`.`movies` (`movie_id`, `movie_name`, `movie_description`, `movie_revenue`, `movie_image`, `movie_budget`, `movie_release_date`, `movie_rating_average`) VALUES ('468552', 'Wonder Woman 1984', 'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.', '131400000', 'https://www.themoviedb.org/t/p/original/8AQRfTuTHeFTddZN4IUAqprN8Od.jpg', '200000000','2020-12-16','7');
INSERT INTO `moviesdb`.`movies` (`movie_id`, `movie_name`, `movie_description`, `movie_revenue`, `movie_image`, `movie_budget`, `movie_release_date`, `movie_rating_average`) VALUES ('107315', 'Below Zero', 'When Jack (Edward Furlong) is in danger of missing a deadline, his manager orders him to take whatever measures are needed to complete his screenplay. Jack locks himself in a slaughterhouse freezer but discovers that his inner demons are keeping him company. Despite the cold, Jack\'s imagination is red-hot as he concocts the story of Frank (Furlong), a tow truck driver who\'s locked in a fridge with the dying victim of a serial killer.', '0', 'https://www.themoviedb.org/t/p/original/1ePasxbdMO0AMMqeLMdji6El3qu.jpg', '0','2021-01-29', '6.5');
INSERT INTO `moviesdb`.`movies` (`movie_id`, `movie_name`, `movie_description`, `movie_revenue`, `movie_image`, `movie_budget`, `movie_release_date`, `movie_rating_average`) VALUES ('602269', 'The Little Things', 'Deputy Sheriff Joe \"Deke\" Deacon joins forces with Sgt. Jim Baxter to search for a serial killer who\'s terrorizing Los Angeles. As they track the culprit, Baxter is unaware that the investigation is dredging up echoes of Deke\'s past, uncovering disturbing secrets that could threaten more than his case.', '13000000', 'https://www.themoviedb.org/t/p/original/c7VlGCCgM9GZivKSzBgzuOVxQn7.jpg', '30000000','2021-01-27', '6.4');
INSERT INTO `moviesdb`.`movies` (`movie_id`, `movie_name`, `movie_description`,  `movie_revenue`, `movie_image`, `movie_budget`, `movie_release_date`, `movie_rating_average`) VALUES ('775996', 'Outside the Wire', 'In the near future, a drone pilot is sent into a deadly militarized zone and must work with an android officer to locate a doomsday device.','0', 'https://www.themoviedb.org/t/p/original/kzq4ibnNeZrp00zpBWv3st1QCOh.png','0','2021-01-15', '6.5');



-- Population Genres Table

INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('28', 'Action');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('12', 'Adventure');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('16', 'Animation');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('35', 'Comedy');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('80', 'Crime');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('99', 'Documentary');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('18', 'Drama');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('10751', 'Family');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('14', 'Fantasy');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('36', 'History');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('27', 'Horror');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('10402', 'Music');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('9648', 'Mystery');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('10749', 'Romance');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('878', 'Science Fiction');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('10770', 'TV Movie');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('53', 'Thriller');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('10752', 'War');
INSERT INTO `moviesdb`.`genres` (`genre_id`, `genre_type`) VALUES ('37', 'Western');


-- Inserting some Users

insert into moviesdb.users(user_first_name,user_last_name,user_email,user_password) values("Ernesto","Gonzalez","eg@fau.com","pass");
INSERT INTO `moviesdb`.`users` (`user_first_name`, `user_last_name`, `user_email`, `user_password`) VALUES ('David', 'Smith', 'ds@sg.org', 'sss');
