class AddReviewsToSpots < ActiveRecord::Migration[6.1]
  def change
    add_column :spots, :ugc1_name, :string
    add_column :spots, :ugc1_stars, :integer
    add_column :spots, :ugc1_comment, :text
    add_column :spots, :ugc2_name, :string
    add_column :spots, :ugc2_stars, :integer
    add_column :spots, :ugc2_comment, :text
    add_column :spots, :ugc3_name, :string
    add_column :spots, :ugc3_stars, :integer
    add_column :spots, :ugc3_comment, :text
  end
end
