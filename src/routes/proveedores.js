import { Router } from 'express';
import { GetProveedores, GetProveedor } from '../controllers/Proveedor.Controller.js';

const router = Router();

router.get('/', GetProveedores);

router.get('/:id', GetProveedor);

export default router;
