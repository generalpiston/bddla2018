#!/bin/bash
docker run \
  -d \
  -p 30303:30303 \
  -p 8180:8180 \
  -p 8545:8545 \
  -p 8546:8546 \
  -v ~/.local/share/io.parity.ethereum/docker/:/root/.local/share/io.parity.ethereum/ \
  --name parity \
  parity/parity:bddla2018 \
  --config dev \
  --reseal-min-period 0 \
  --gasprice 0 \
  --base-path /root/.local/share/io.parity.ethereum/ \
  --jsonrpc-cors all \
  --jsonrpc-hosts all \
  --jsonrpc-interface all \
  --ws-hosts all \
  --ws-interface all \
  --ui-hosts all \
  --chain /chain.json
