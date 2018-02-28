class Resolvers::FindGame < GraphQL::Function
  argument :id, !types.Int

  type Types::GameType

  def call(root, args, ctx)
    game = Game.find_by_id(args[:id])
    game.nil? ? Game.nil_game : game
  end
end
