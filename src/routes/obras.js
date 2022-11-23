import { Router } from 'express';
import { getObra, getObras, createObra } from '../controllers/Obra.Controller.js';

const router = Router();

router.get('/', getObras);

router.get('/:id', getObra);

router.post('/', createObra);

export default router;
