# frozen_string_literal: true

# model Field
class Field < ApplicationRecord
  validates :name, presence: true
  validates :shape, presence: true
end
