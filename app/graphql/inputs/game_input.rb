Inputs::GameInput = GraphQL::InputObjectType.define do
  name 'GameInput'
  description 'Game attributes'

  argument :name, !types.String
  argument :launch_year, !types.String
  argument :description, types.String
end
