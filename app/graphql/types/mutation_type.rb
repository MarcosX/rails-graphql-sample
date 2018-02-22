Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :new_game do
    description 'Creates a new game'
    type Types::GameType
    argument :name, !types.String
    argument :launch_year, !types.String
    argument :description, types.String

    resolve -> (root, args, _ctx) do
      Game.create(name: args[:name],
                  launch_year: args[:launch_year],
                  description: args[:description])
    end
  end

  field :add_char_to_game do
    description 'Adds a character to a game'
    type Types::GameType
    argument :game_id, !types.Int
    argument :characters_id, !types[types.Int]

    resolve -> (root, args, _ctx) do
      game = Game.find(args[:game_id])
      args[:characters_id].each do |id|
        char = Character.find(id)
        game.characters << char unless game.characters.include?(char)
      end
      game.save
      game
    end
  end
end
