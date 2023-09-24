import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getChainArray } from "@axelar-network/axelar-chains-config";
import fs from "fs";

const testnetBridges = getChainArray("testnet");
fs.writeFileSync(
  "./scripts/testnetBridges.json",
  JSON.stringify(testnetBridges)
);

const testnetBridgesTree = StandardMerkleTree.of(
  testnetBridges.map((bridge) => [
    bridge.chainId,
    bridge.contracts.AxelarGateway.address,
    bridge.contracts.AxelarGasService.address,
  ]),
  ["uint256", "address", "address"]
);

console.log(testnetBridgesTree);

const mainnetBridges = getChainArray("mainnet");
fs.writeFileSync(
  "./scripts/mainnetBridges.json",
  JSON.stringify(mainnetBridges)
);

const mainnetBridgesTree = StandardMerkleTree.of(
  mainnetBridges.map((bridge) => [
    bridge.chainId,
    bridge.contracts.AxelarGateway.address,
    bridge.contracts.AxelarGasService.address,
  ]),
  ["uint256", "address", "address"]
);

console.log(mainnetBridgesTree);

const devBridges = [
  [
    "31337",
    "0x6c1a01c2ab554930a937b0a2e8105fb47946c679",
    "0x37cb1a23e763d2f975bff3b2b86cfa901f7b517e",
  ],
];

const devBridgesTree = StandardMerkleTree.of(devBridges, [
  "uint256",
  "address",
  "address",
]);

console.log("Dev Merkle Root:", devBridgesTree.root);
console.log("Testnet Merkle Root:", testnetBridgesTree.root);
console.log("Mainnet Merkle Root:", mainnetBridgesTree.root);

const chainId = 80001;
const chainIndex = testnetBridges.findIndex(
  (bridge) => bridge.chainId == chainId
);
const proof = testnetBridgesTree.getProof(chainIndex);
console.log(
  "Chain Proof: ",
  chainId,
  JSON.stringify(proof).replaceAll('"', "")
);

console.log(
  testnetBridges
    .map((bridge) => [
      bridge.chainId,
      bridge.id,
      bridge.contracts.AxelarGateway.address,
      bridge.contracts.AxelarGasService.address,
    ])
    .filter((bridge) => bridge[0] == chainId)
);

fs.writeFileSync(
  "./scripts/devBridgesTree.json",
  JSON.stringify(devBridgesTree.dump())
);
fs.writeFileSync(
  "./scripts/testnetBridgesTree.json",
  JSON.stringify(testnetBridgesTree.dump())
);
fs.writeFileSync(
  "./scripts/mainnetBridgesTree.json",
  JSON.stringify(mainnetBridgesTree.dump())
);
