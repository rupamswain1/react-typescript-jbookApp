import express from 'express'

import fs from 'fs/promises'
import path from 'path'

interface Cell {
  id: string
  content: 'string'
  type: 'text' | 'code'
}

export const createCellRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())
  const fullPath = path.join(dir, filename)
  router.get('/cells', async (req, res) => {
    try {
      //read the file
      console.log(fullPath)
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })
      return res.send(JSON.parse(result))
    } catch (err) {
      let e:any=err;
      if (e.code) {
        await fs.writeFile(fullPath, '[]', 'utf-8')
      } else {
        throw err
      }
    }
  })

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body
    //make sure the file exists
    //if not create a file
    //take the list of cells, serialize them

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')
    //wirte the cells into the file
    res.status(201)
    res.send('created')
  })

  return router
}
