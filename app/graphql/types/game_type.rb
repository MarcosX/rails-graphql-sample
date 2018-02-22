Types::GameType = GraphQL::ObjectType.define do
  name 'Game'
  description 'Type for Game models'

  field :name, !types.String
  field :description, types.String
  field :launch_year, !types.String
  field :characters, types[Types::CharacterType]
end
