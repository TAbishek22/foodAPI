import mongoose from "mongoose";

const { Schema } = mongoose;

const foodRecord = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    allergens: { type: [String] },
    food_group: String,
    description: String,
    ingredients: {
        type: [String],
    },

    serving_size: String,
    certifications: [{ type: [String] }],
    food_item_name: String,
    health_benefits: {
        type: [String],
    },

    country_of_origin: String,
    preparation_methods: {
        type: [String],
    },

    dietary_restrictions: { type: [String] },
    brand_or_manufacturer: String,
    nutritional_information: {
        fat: Number,
        fiber: Number,
        protein: Number,
        calories: Number,
        carbohydrates: Number,
    },
});

const foodAPI = new mongoose.model("Food_API", foodRecord);
export default foodAPI;
