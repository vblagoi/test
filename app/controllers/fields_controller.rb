# frozen_string_literal: true

# Fields controller
class FieldsController < ApplicationController
  def index
    @field = Field.all
  end

  def show
    @field = Field.find(params[:id])

    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @field = Field.new
  end

  def edit
    @field = Field.find(params[:id])
  end

  def create
    @field = Field.new(name: params[:field][:name], shape: field_params)

    if @field.save
      redirect_to @field
    else
      render 'new'
    end
  end

  def update
    @field = Field.find(params[:id])
    if @field.update_attributes(name: params[:field][:name],
                                shape: field_params)
      redirect_to @field
    else
      render 'edit'
    end
  end

  def destroy
    @field = Field.find(params[:id])
    @field.destroy if @field.present?
    redirect_to root_url
  end

  private

  def field_params
    RGeo::GeoJSON.decode(params[:field][:shape]).geometry
  end
end
