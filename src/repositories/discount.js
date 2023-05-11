const BaseRepository = require("./base");
const DiscountEntity = require("../models/discount.model");

class DiscountRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: DiscountEntity
        })
    }

    isExpiredDate(start_date, end_date) {
        const isExpired = (new Date() < new Date(start_date) || new Date() > new Date(end_date))
        return isExpired;
    }

    isValidDate(start_date, end_date) {
        const isValid = (new Date(start_date) >= new Date(end_date));
        return isValid;
    }

    isValidTimeToUseDiscount(discount_max_per_user, discount_user_used, userId) {
        return true;
    }
}

module.exports = new DiscountRepository()