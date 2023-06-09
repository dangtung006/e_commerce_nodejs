const DiscountRepository = require("../repositories/discount");
const ProductsRepository = require("../repositories/products/index");

const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")


const {
    NotFoundError,
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
    static async updateDiscount() { }

    static async getAllProductsByDiscountCodeShop({ discount_code, discount_shopId, page, limit }) {
        const foundDiscount = await DiscountRepository.getOneByConditions({
            discount_code,
            discount_shopId
        });

        if (!foundDiscount || !foundDiscount.discount_isActive)
            throw new BadRequestError("Discount not exist");

        const { discount_products_type, discount_products_applied } = foundDiscount;

        if (discount_products_type === "All")
            return ProductsRepository.getListByConditions(
                {
                    product_shop: discount_shopId,
                    isPublished: true
                },
                { page, limit }
            )

        return ProductsRepository.getListByConditions({
            _id: { $in: discount_products_applied },
            isPublished: true
        }, { page, limit });
    }

    static async getAllDiscountCodeByShop({ shop_id, page, limit }) {
        return DiscountRepository.getListByConditions({
            discount_shopId: shop_id,
            discount_isActive: true
        }, { page, limit });
    }

    static async calculateDiscountAmount({ code_id, shop_id, userId, products }) {

        const foundDiscount = await DiscountRepository.getOneByConditions({
            discount_shopId: shop_id,
            code_id: code_id
        });

        if (!foundDiscount) throw new NotFoundError("Discount doesn't exists");

        const {
            discount_is_active,
            discount_max_uses,
            discount_min_order_value,
            discount_max_per_user,
            discount_user_used,
            discount_start_date,
            discount_end_date,
            discount_type,
            discount_value

        } = foundDiscount;

        if (!discount_is_active) throw new BadRequestError("Discount has expried");//discount_is_active === false
        if (!discount_max_uses) throw new BadRequestError("Discounts are out"); // discount_max_uses === 0
        if (!DiscountRepository.isExpiredDate(discount_start_date, discount_end_date)) throw new BadRequestError("Discount has expried");

        var totalOrder
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((val, product) => val + product.price * product.quantity, 0);
            if (totalOrder < discount_min_order_value)
                throw new BadRequestError(`discount require min value is ${discount_min_order_value}`)
        }

        if (!DiscountRepository.isValidTimeToUseDiscount(discount_max_per_user, discount_user_used, userId))
            throw new BadRequestError(
                `discount require max time value is ${discount_max_per_user}`
            );

        const amountDiscount
            = discount_type === "fixed_amount"
                ? discount_value
                : totalOrder * (discount_value / 100);

        return {
            totalOrder,
            amountDiscount,
            discountOrder: totalOrder - amountDiscount
        }
    }

    static async cancelDiscountCodeByUser({ shop_id, code_id, user_id }) {
        const foundDiscount = await DiscountRepository.getOneByConditions({
            discount_shopId: shop_id,
            code_id: code_id
        });

        if (!foundDiscount) throw new NotFoundError("Discount doesn't exists");

        return DiscountRepository.updateOneByCondition(
            { _id: foundDiscount._id },
            {
                $pull: { discount_user_used: user_id },
                $inc: {
                    discount_max_uses: 1,
                    discount_used_count: -1
                }
            }
        )
    }

    static async deleteDiscountCode({ shop_id, code_id }) {
        return DiscountRepository.deleteOneByCondition({
            discount_shopId: shop_id,
            discount_code: code_id
        })
    }
}

module.exports = DiscountServices;