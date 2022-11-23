import { Router } from 'express';
import { getMaterial, getMaterials, createMaterial } from '../controllers/Material.Controller.js';

const router = Router();

router.get('/', getMaterials);

router.get('/:id', getMaterial);

router.post('/', createMaterial);

export default router;
