# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_15_015547) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "schedule_spots", force: :cascade do |t|
    t.integer "order"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "spot_id"
    t.bigint "schedule_id"
    t.index ["schedule_id"], name: "index_schedule_spots_on_schedule_id"
    t.index ["spot_id"], name: "index_schedule_spots_on_spot_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.integer "day_order"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "trip_id"
    t.index ["trip_id"], name: "index_schedules_on_trip_id"
  end

  create_table "spots", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.text "description"
    t.string "phone"
    t.string "monday_hr"
    t.string "tuesday_hr"
    t.string "wednesday_hr"
    t.string "thursday_hr"
    t.string "friday_hr"
    t.string "saturday_hr"
    t.string "sunday_hr"
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "place_id"
    t.string "photo_reference_1"
    t.string "photo_reference_2"
    t.string "photo_reference_3"
    t.string "photo_reference_4"
    t.string "photo_reference_5"
    t.string "photo_reference_6"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "address"
    t.string "ugc1_name"
    t.integer "ugc1_stars"
    t.text "ugc1_comment"
    t.string "ugc2_name"
    t.integer "ugc2_stars"
    t.text "ugc2_comment"
    t.string "ugc3_name"
    t.integer "ugc3_stars"
    t.text "ugc3_comment"
    t.string "poi_type"
  end

  create_table "trips", force: :cascade do |t|
    t.string "name"
    t.integer "length", default: 1
    t.datetime "start_date"
    t.datetime "end_date"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_trips", force: :cascade do |t|
    t.integer "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "trip_id"
    t.index ["trip_id"], name: "index_user_trips_on_trip_id"
    t.index ["user_id"], name: "index_user_trips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "remember_created_at"
    t.string "name"
    t.string "provider", default: "register"
    t.string "uid"
    t.string "image"
    t.string "avatar"
    t.index ["email", "provider"], name: "index_users_on_email_and_provider", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "schedule_spots", "schedules", on_delete: :cascade
  add_foreign_key "schedule_spots", "spots", on_delete: :cascade
  add_foreign_key "schedules", "trips", on_delete: :cascade
  add_foreign_key "user_trips", "trips", on_delete: :cascade
  add_foreign_key "user_trips", "users", on_delete: :cascade
end
