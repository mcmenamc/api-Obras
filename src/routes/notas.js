import { Router } from 'express';
import { getNota, getNotas, createNota, createNotaExcel } from '../controllers/Nota.Controller.js';

const router = Router();

router.get('/', getNotas);

router.get('/:id', getNota);

router.post('/', createNota);

router.post('/excel', createNotaExcel);

export default router;
