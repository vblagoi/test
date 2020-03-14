# frozen_string_literal: true

# Create name and shape for field
class CreateFields < ActiveRecord::Migration[6.0]
  def change
    create_table :fields do |t|
      t.string :name
      t.multi_polygon :shape, geographic: true, srid: 4326

      t.timestamps
    end
  end
end
