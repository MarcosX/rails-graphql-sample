# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

mario = Character.create(name: "Mario")
peach = Character.create(name: "Peach")
dk = Character.create(name: "Donkey Kong")
zelda = Character.create(name: "Zelda")

mario_world = Game.create(name: "Super Mario World", description: "SNES game", launch_year: "1990", characters: [mario, peach])
mario_kart = Game.create(name: "Mario Kart 8", description: "Wii U Game", launch_year: "2014", characters: [mario, peach, dk])
smash_bros = Game.create(name: "Super Smash Bros Wii U", description: "Wii U Game", launch_year: "2014", characters: [mario, peach, dk, zelda])

mario.games << [mario_world, mario_kart, smash_bros]
mario.save

peach.games << [mario_world, mario_kart, smash_bros]
peach.save

zelda.games << [smash_bros]
zelda.save

dk.games << [mario_kart, smash_bros]
dk.save

