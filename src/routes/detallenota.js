import { Router } from 'express';
import { createDetalleNota, getDetalleNota, getDetalleNotas } from '../controllers/DetalleNota.Controller.js';

const router = Router();

router.get('/', getDetalleNotas);

router.get('/:id', getDetalleNota);

router.post('/', createDetalleNota);

export default router;
