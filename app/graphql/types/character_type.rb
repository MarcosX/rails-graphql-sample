Types::CharacterType = GraphQL::ObjectType.define do
  name 'Character'
  description 'Type for Character models'

  field :name, !types.String
  field :games, types[Types::GameType]
end

