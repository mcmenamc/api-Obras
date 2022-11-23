import { Router } from 'express';
import { getNota, getNotas, createNota } from '../controllers/Nota.Controller.js';

const router = Router();

router.get('/', getNotas);

router.get('/:id', getNota);

router.post('/', createNota);

export default router;
