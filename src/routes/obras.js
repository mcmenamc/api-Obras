import { Router } from 'express';
import { getObra, getObras, createObra, createObrasExcel } from '../controllers/Obra.Controller.js';

const router = Router();

router.get('/', getObras);

router.get('/:id', getObra);

router.post('/', createObra);

router.post('/excel', createObrasExcel);

export default router;
