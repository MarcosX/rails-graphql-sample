class Game < ApplicationRecord
  has_many :projects
  has_many :characters, through: :projects

  def self.nil_game
    Game.new(name: 'NOT A GAME', description: 'NOT A GAME', launch_year: 0, characters: [])
  end
end
