import { Router } from 'express';
import { getMaterial, getMaterials, createMaterial, createMaterialExcel } from '../controllers/Material.Controller.js';

const router = Router();

router.get('/', getMaterials);

router.get('/:id', getMaterial);

router.post('/', createMaterial);

router.post('/excel', createMaterialExcel);

export default router;
