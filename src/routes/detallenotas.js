import { Router } from 'express';
import { createDetalleNota, getDetalleNota, getDetalleNotas, DeleteDetalleNota, getDetalleNotasByDate, createDetallesNotaslExcel } from '../controllers/DetalleNota.Controller.js';

const router = Router();

router.get('/', getDetalleNotas);

router.get('/:id', getDetalleNota);

router.post('/', createDetalleNota);

router.delete('/:id', DeleteDetalleNota);

router.post('/excel', createDetallesNotaslExcel);

router.get('/date/:dateInicio/:dateFin/:idObra', getDetalleNotasByDate);

export default router;
