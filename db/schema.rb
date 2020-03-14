# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_200_314_182_559) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'
  enable_extension 'postgis'

  create_table 'fields', force: :cascade do |t|
    t.string 'name'
    t.geography 'shape', limit: { srid: 4326, type: 'multi_polygon',
                                  geographic: true }
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end
end
