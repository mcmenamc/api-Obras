import { Router } from 'express';
import { createDetalleNota, getDetalleNota, getDetalleNotas, DeleteDetalleNota, CreateExcelAll, getDetalleNotasByDate } from '../controllers/DetalleNota.Controller.js';

const router = Router();

router.get('/', getDetalleNotas);

router.get('/:id', getDetalleNota);

router.post('/', createDetalleNota);

router.delete('/:id', DeleteDetalleNota);

router.post('/excel', CreateExcelAll);

router.get('/date/:dateInicio/:dateFin', getDetalleNotasByDate);

export default router;
