import Item from "../model/itemSchema.js";
import fs from 'fs/promises';
import Cart from "../model/cartSchema.js";
import Order from "../model/orderSchema.js";

export const getItemById = async (req, res) => {
    try {
        const { _id } = req.body;
        const items = await Item.find({ createUser: _id });
        const populatedProducts = await Item.populate(items, { path: 'userId' });
        res.json({ items: populatedProducts });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllItems = async (req, res) => {
    try {
        const { _id } = req.body;
        const items = await Item.find().populate({ path: 'createUser' });
        const cart = await Cart.findOne({ userId: _id });
        const cartCount = cart ? cart.items.length : 0;
        res.json({ items, cartCount });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Error fetching items." });
    }
};


export const addItemToList = async (req, res) => {
    try {
        const { description, title, amount, quantity, createUser, createTimestamp } = req.body;
        const imageUrl = req.file.filename;
        const newProduct = new Item({ description, title, amount, quantity, imageUrl, createUser, createTimestamp });
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ error: "Error adding data" });
    }
}

export const deleteItemFromList = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await Item.findByIdAndDelete(id);
        const filePath = `uploads/${result.imageUrl}`;
        await fs.unlink(filePath);
        await Cart.updateMany(
            { "items.itemId": id },
            { $pull: { items: { itemId: id } } }
        );
        res.status(200).json({ message: "Data deleted successfully" });
    } catch (err) {
        console.error("Error deleting data:", err);
        res.status(500).json({ error: "Error deleting data" });
    }
}

export const updateItemInList = async (req, res) => {
    try {
        const { _id, description, title, amount, quantity } = req.body;
        const updatedData = { description, title, amount, quantity };
        if (req.file) {
            updatedData.imageUrl = req.file.filename;
            const findProductToBeUpdated = await Item.findById(_id);
            const filePath = `uploads/${findProductToBeUpdated.imageUrl}`;
            await fs.unlink(filePath);
        }
        const updatedProduct = await Item.findByIdAndUpdate(_id, updatedData, { new: true }).populate({ path: 'createUser' });
        updatedProduct ?
            res.status(200).json(updatedProduct) :
            res.status(404).json({ message: "Data not found" });
    } catch (err) {
        console.error("Error updating data:", err);
        res.status(500).json({ error: "Error updating data" });
    }
};

export const updateUserCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    let itemUpdated = false;
    try {
        let cart = await Cart.findOne({ userId }).populate({ path: 'userId' });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
            const findProductToBeUpdated = await Item.findById({ _id: itemId });
            const quantityFlag = quantity !== undefined ? false : true;
            if (itemIndex > -1 && cart.items[itemIndex].quantity + 1 > findProductToBeUpdated.quantity && quantityFlag) {
                return res.status(500).json({ error: "Exceeded availability of product." });
            }
            if (quantity === 0) {
                cart.items.splice(itemIndex, 1);
            }
            else if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity !== undefined
                    ? quantity
                    : cart.items[itemIndex].quantity + 1;
                itemUpdated = true;
            }
            else {
                cart.items.push({ itemId, quantity: 1 });
            }
        }
        else {
            cart = new Cart({ userId, items: [{ itemId, quantity: 1 }] });
        }
        await cart.save();
        const updatedCartData = await Cart.findOne({ userId }).populate({ path: 'userId' }).populate({ path: 'items.itemId' });
        const message = itemUpdated
            ? 'Cart updated successfully.'
            : 'Item added to cart successfully.';
        res.status(200).json({ message, cartData: updatedCartData });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Unable to add item to cart." });
    }
};

export const getUserCartData = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartData = await Cart.findOne({ userId }).populate({ path: 'items.itemId' }).populate({ path: 'userId' });
        res.json({ cartData });
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

export const buyProductsFromCart = async (req, res) => {
    try {
        const { id } = req.body;
        const cart = await Cart.findOne({ userId: id });
        const itemIds = cart.items.map((cartItem) => cartItem.itemId);
        const items = await Item.find({ _id: { $in: itemIds } });
        for (let cartItem of cart.items) {
            const item = items.find((i) => i._id.toString() == cartItem.itemId.toString());
            if (item) {
                item.quantity -= cartItem.quantity;
                if (item.quantity < 0) {
                    return res.status(400).json({ error: `Insufficient stock for item: ${item.title}` });
                }
                await item.save();
            }
        }
        let order = await Order.findOne({userId: id}).populate({ path: 'userId' });
        if (order) {
            order.items.push(...cart.items);
        }
        else {
            order = new Order({ userId: id, items: cart.items });
        }
        await order.save();
        await Cart.deleteOne({ userId: id });
        res.status(200).json(order);
    } catch (err) {
        console.error("Error buying products:", err);
        res.status(500).json({ error: "An error occurred while buying products." });
    }
};

export const getFilteredItems = async (req, res) => {
    try {
        const {searchQuery} = req.body || '';
        const items = await Item.find().populate({ path: 'createUser' });
        const filteredItems = items.filter(
            (item) => item.title.toLowerCase().includes(searchQuery) 
        );
        res.json(filteredItems);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ error: `An error occurred while searching.${err}` });
    }
};

export const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.body;
        const orders = await Order.findOne({ userId: id }).populate({ path: 'userId' }).populate({ path: 'items.itemId' });
        res.json({orders: orders});
    }
    catch(err) {
        res.status(500).json({ error: `An error occurred while getting history.${err}` });
    }
};
