import { Router } from 'express';
import { GetProveedores, GetProveedor, CreateProveedor, createProveedoresExcel } from '../controllers/Proveedor.Controller.js';

const router = Router();

router.get('/', GetProveedores);

router.get('/:id', GetProveedor);

router.post('/', CreateProveedor);

router.post('/excel', createProveedoresExcel);

export default router;
