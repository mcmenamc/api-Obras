import { Router } from 'express';
import { getNota, getNotas } from '../controllers/Nota.Controller.js';

const router = Router();

router.get('/', getNotas);

router.get('/:id', getNota);

export default router;
