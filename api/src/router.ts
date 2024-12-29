import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createProduct, listProducts } from './app/useCases/products';
import { cancelOrder, changeOrderStatus, createOrder, listOrders } from './app/useCases/orders';
import { createCategory, listCategories, listProductsByCategory } from './app/useCases/categories';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'uploads'))
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    })
})

// List categories
router.get('/categories', listCategories);

// Create category 
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product 
router.get('/products', upload.single('image'), createProduct);

// Get products by category 
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders 
router.get('/orders', listOrders);

// Create order 
router.post('/orders', createOrder);

// Change order status 
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel order 
router.delete('/orders/:orderId', cancelOrder);
