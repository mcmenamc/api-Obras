import { Router } from 'express';
import { GetProveedores, GetProveedor, CreateProveedor } from '../controllers/Proveedor.Controller.js';

const router = Router();

router.get('/', GetProveedores);

router.get('/:id', GetProveedor);

router.post('/', CreateProveedor);

export default router;
