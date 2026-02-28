const Cart = require("../data/models/cart");
const Order = require("../data/models/order");
const Product = require("../data/models/product");
const { fetchProductsFromAPI } = require("../services/productService");
const catchAsync = require("../utils/catchAsync");

// POST /cart/add/:productId (where productId is numeric from API)
exports.addToCart = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const quantity = parseInt(req.body.quantity) || 1;
    const userId = req.user._id;

    // 1. Find product in local DB by numeric ID
    let product = await Product.findOne({ id: parseInt(productId) });

    // 2. If not found locally, fetch from API and save to DB
    if (!product) {
        const apiProducts = await fetchProductsFromAPI();
        const apiProduct = apiProducts.find(p => p.id === parseInt(productId));

        if (!apiProduct) {
            req.flash("error", "Product not found.");
            return res.redirect("/products");
        }

        product = new Product({
            id: apiProduct.id,
            name: apiProduct.title,
            title: apiProduct.title,
            description: apiProduct.description,
            price: apiProduct.price,
            image: apiProduct.image,
            category: apiProduct.category,
            stock: 100, // Default stock for API products
        });
        await product.save();
    }

    // 3. Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // 4. Add item to cart
    const existingItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: product._id, quantity });
    }

    // 5. Save and recalculate total
    await cart.save();

    // Re-fetch with populated products to compute total accurately
    const populatedCart = await Cart.findById(cart._id).populate("items.product");
    populatedCart.totalPrice = populatedCart.items.reduce(
        (sum, item) => {
            if (item.product && item.product.price) {
                return sum + item.product.price * item.quantity;
            }
            return sum;
        },
        0
    );
    await populatedCart.save();

    req.flash("success", `"${product.title}" added to cart!`);
    res.redirect("/cart");
});

// POST /cart/remove/:productId (where productId is numeric or ObjectId)
exports.removeFromCart = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.redirect("/cart");

    cart.items = cart.items.filter(item => {
        if (!item.product) return false;
        return item.product.id.toString() !== productId && item.product._id.toString() !== productId;
    });

    cart.totalPrice = cart.items.reduce(
        (sum, item) => {
            if (item.product && item.product.price) {
                return sum + item.product.price * item.quantity;
            }
            return sum;
        },
        0
    );

    await cart.save();
    req.flash("success", "Item removed from cart.");
    res.redirect("/cart");
});

// POST /cart/update/:productId
exports.updateQuantity = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const quantity = parseInt(req.body.quantity);
    const userId = req.user._id;

    if (!quantity || quantity < 1) {
        req.flash("error", "Invalid quantity.");
        return res.redirect("/cart");
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.redirect("/cart");

    const item = cart.items.find(item => {
        if (!item.product) return false;
        return item.product.id.toString() === productId || item.product._id.toString() === productId;
    });

    if (item) item.quantity = quantity;

    cart.totalPrice = cart.items.reduce(
        (sum, item) => {
            if (item.product && item.product.price) {
                return sum + item.product.price * item.quantity;
            }
            return sum;
        },
        0
    );

    await cart.save();
    res.redirect("/cart");
});

exports.processCheckout = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { firstName, lastName, phone, address, city, postalCode, country, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        req.flash("error", "Your cart is empty.");
        return res.redirect("/cart");
    }

    // Create Order
    const order = new Order({
        user: userId,
        items: cart.items
            .filter(item => item.product) // Ensure product exists
            .map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
        totalAmount: cart.totalPrice,
        shippingAddress: {
            firstName,
            lastName,
            phone,
            address,
            city,
            postalCode,
            country
        },
        paymentMethod: paymentMethod || "COD",
        status: "Pending"
    });

    await order.save();

    // Clear Cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    req.flash("success", "Order placed successfully!");
    res.redirect("/orders");
});