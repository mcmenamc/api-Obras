import { Router } from 'express';
import { GetProveedor, GetProveedores } from '../controllers/Proveedor.Controller.js';

const router = Router();

router.get('/', GetProveedores);

router.get('/:id', GetProveedor);

export default router;
