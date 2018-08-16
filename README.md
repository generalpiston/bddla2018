# Big Data Day LA 2018 -- Blockchain Tutorial

See the [slides](https://docs.google.com/presentation/d/1DtlKXo5ViC0DpFxQ7iuGjx9EXLCQ7tcbto26zMK-2c0/edit?usp=sharing).

## Activity

`activity` subdirectory.

### Building

```
npm i -g truffle
npm i
npm run build
npm start
```

### Solution

The solution is available under the `solution` branch.

## Parity

`parity` subdirectory contains the private chain that was launched to help facilitate the class. In particular, look at:

* `chain.json`: The genesis block configuration
* `start.sh`: The parameters passed to the parity instance when starting

See the [documentation](https://wiki.parity.io/Private-development-chain) on how to turn parity into a development chain.

I've deployed this to bddla.mobidex.io. It'll be up until September 16, 2018.

# References

* https://blog.ethereum.org/2015/09/14/on-slow-and-fast-block-times/
* https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274
* https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51
* https://en.bitcoin.it/wiki/Block_size_limit_controversy
* https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQs
* http://www.cs.huji.ac.il/~yoni_sompo/pubs/15/inclusive_full.pdf
* https://medium.com/cybermiles/diving-into-ethereums-world-state-c893102030ed
* https://github.com/willitscale/learning-solidity
* http://solidity.readthedocs.io/en/v0.4.24/miscellaneous.html#tips-and-tricks
* https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369

# License

MIT
