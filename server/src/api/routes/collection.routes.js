import { Router } from 'express'
import * as collectionController from '../controllers/collection.controller.js'
import {
  hasRequiredValues,
  isDuplicate,
} from '../middlewares/collection.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
const router = Router()

/* Public */
router.get('/', collectionController.getMovies)
router.get('/search', collectionController.searchMovies)
router.get('/recent', collectionController.recentlyAdded)
router.get('/info', collectionController.collectionInfo)

/* Protected */
router.use(verifyToken)
router.post('/', hasRequiredValues, isDuplicate, collectionController.addMovie)
router.put('/:id', collectionController.updateMovie)
router.delete('/:id', collectionController.removeMovie)
router.get('/movie/:id', collectionController.getMovieById)

export default router
