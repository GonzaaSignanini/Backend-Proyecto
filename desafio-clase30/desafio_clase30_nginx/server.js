const express = require('express')
const os = require('os')
const fork = require('child_process')

const app = express()
const PORT = parseInt(process.argv[2]||8080)

app.use(express.static('/public'))

app.get('/info', (req, res) => {
    res.send({
      status: 'success',
      payload: {
        args: process.argv,
        os: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        execPath: process.execPath,
        processId: process.pid,
        projectFolder: process.cwd(),
        cores: os.cpus().length
      }
    })
  })

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

app.get("/api/random", (req, res) => {
    const cant = parseInt(req.query.cant || 100000000);
        if (isNaN(cant)) {
        res.status(400).send({
            error: "Parameter 'cant' must be a number",
        });
        return;
        }
        const random = fork("utils/random.js", [cant]);
        random.on("message", (data) => {
        res.json({ iterations: cant, numbers: data });
        });
    })