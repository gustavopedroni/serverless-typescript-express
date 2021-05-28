import express from 'express'

const router = express.Router()

router.get('/', (_, res) => {
  return res.json({ message: 'This is message route' })
})

export default router
