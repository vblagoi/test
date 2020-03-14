# frozen_string_literal: true

# Fields controller
class FieldsController < ApplicationController
  def index
    @field = Field.all
  end

  def show
    @field = Field.find(params[:id])
  end

  def new; end

  def edit; end
end
