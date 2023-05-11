const DiscountRepository = require("../repositories/discount");

const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")


const {
    BadRequestError
} = require("../commons/response/error");


class DiscountServices {
    static async createDiscount({
        discount_name, discount_desc, discount_type,
        discount_value, discount_code, discount_start_date,
        discount_end_date, discount_max_uses, discount_used_count,
        discount_max_per_user, discount_min_order_value,
        discount_products_type, discount_shopId, discount_products_applied
    }) {

        if (DiscountRepository.isExpiredDate(discount_start_date, discount_end_date))
            throw new BadRequestError("Code has expired");

        if (DiscountRepository.isValidDate(discount_start_date, discount_end_date))
            throw new BadRequestError("Invalid Date");

        const foundDiscount = await DiscountRepository.getOneByConditions({
            discount_code,
            discount_shopId
        });

        if (foundDiscount && foundDiscount.discount_isActive) throw BadRequestError("Discount Existed");

        const newDiscount = await DiscountRepository.create({
            discount_name,
            discount_desc,
            discount_type,
            discount_value,
            discount_code,
            discount_start_date: new Date(discount_start_date),
            discount_end_date: new Date(discount_end_date),
            discount_max_uses,
            discount_used_count,
            discount_max_per_user,
            discount_min_order_value: discount_min_order_value || 0,
            discount_products_type,
            discount_shopId,
            discount_products_applied: discount_products_type === "all" ? [] : discount_products_applied
        });

        return newDiscount;

    }
    static async updateDiscount() {

    }
}

module.exports = DiscountServices;