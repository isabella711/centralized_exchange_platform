const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
app.use(cors()); // Add this line
app.use(bodyParser.json());

const runLitecoinCommand = (command, ...params) => {
  return new Promise((resolve, reject) => {
    const litecoinCli = spawn('litecoin-cli', ['-regtest', command, ...params]);
    let output = '';

    litecoinCli.stdout.on('data', (data) => {
      output += data.toString();
    });

    litecoinCli.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    litecoinCli.on('close', (code) => {
      if (code === 0) {
        console.log(`Output: ${output.trim()}`); // Log the output
        resolve(output.trim());
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });
  });
};

app.post('/api/sendtoaddress', async (req, res) => {
  const { address, amount } = req.body;
  try {
    const txid = await runLitecoinCommand('sendtoaddress', address, amount);
    res.json({ success: true, txid });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});