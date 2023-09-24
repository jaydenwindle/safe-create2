import {
  useAccount,
  useContractRead,
  useNetwork,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Text,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  FormHelperText,
  Button,
  Flex,
  Center,
  Heading,
  Code,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useClipboard,
  useToast,
  CheckboxIcon,
  Link,
} from "@chakra-ui/react";
import {
  CloseIcon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

import { ethers } from "ethers";
import { useEthersSigner } from "./ethers";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { chains } from "./wagmi";

import testnetBridges from "./public/testnetBridges.json";

import {
  getContractAddress,
  encodePacked,
  encodeAbiParameters,
  parseAbiParameters,
  toHex,
  pad,
  parseAbi,
  encodeFunctionData,
  keccak256,
} from "viem";
import { useEffect, useState, useMemo } from "react";

const FACTORY_ADDRESS = "0xfc7195b175171566aCeD6ED23fD8cD7689cf9681";

function ChainRow({
  bridge,
  safeInstance,
  safeApiKit,
  salt,
  bytecode,
  deployedAddress,
}: {
  bridge: any;
  safeInstance: any;
  safeApiKit: any;
  salt: `0x${string}`;
  bytecode: `0x${string}`;
  deployedAddress: `0x${string}`;
}) {
  const { chain: originChain } = useNetwork();
  const { address } = useAccount();

  const destinationChain = Object.keys(chains)
    .map((chain) => chains[chain])
    .find((chain) => chain.id == bridge.chainId);

  if (!destinationChain) return null;

  const publicClient = usePublicClient({
    chainId: bridge.chainId,
  });

  const { data: contractExists, error } = useSWR(
    [bridge.chainId, deployedAddress, "bytecodeSize"],
    async () => {
      const bytecode = await publicClient.getBytecode({
        address: deployedAddress,
      });
      return (bytecode?.length || 0) > 0;
    }
  );

  console.log(destinationChain);

  return (
    <Tr>
      <Td>{bridge.name} (testnet)</Td>
      <Td>
        {contractExists ? (
          <Flex alignItems={"center"}>
            <CheckIcon mr={2} color={"green.200"} />
            <Text color={"green.200"}>Deployed</Text>
            <Link
              color={"green.200"}
              ml={2}
              target="_blank"
              rel="noreferrer"
              href={`${destinationChain?.blockExplorers?.etherscan?.url}/address/${deployedAddress}`}
            >
              (View)
            </Link>
          </Flex>
        ) : (
          <Flex alignItems={"center"}>
            <Button
              size="sm"
              onClick={async () => {
                console.log(salt, bytecode);

                let safeTransactionData;
                if (originChain?.id !== destinationChain.id) {
                  const calldata = encodeFunctionData({
                    abi: parseAbi([
                      "function createRemote(bytes32 salt, bytes memory bytecode, bytes calldata initData, string calldata destinationChain) external payable",
                    ]),
                    functionName: "createRemote",
                    args: [salt, bytecode, "0x", bridge.id],
                  });
                  safeTransactionData = {
                    to: FACTORY_ADDRESS,
                    value: "10000000000000000",
                    data: calldata,
                    operation: 0,
                  };
                } else {
                  const calldata = encodeFunctionData({
                    abi: parseAbi([
                      "function createLocal(bytes32 salt, bytes calldata bytecode, bytes calldata initData) external returns (address addr)",
                    ]),
                    functionName: "createLocal",
                    args: [salt, bytecode, "0x"],
                  });
                  safeTransactionData = {
                    to: FACTORY_ADDRESS,
                    value: "0",
                    data: calldata,
                    operation: 0,
                  };
                }

                const safeTransaction = await safeInstance.createTransaction({
                  safeTransactionData,
                });

                const safeTxHash = await safeInstance.getTransactionHash(
                  safeTransaction
                );
                const signature = await safeInstance.signTransactionHash(
                  safeTxHash
                );

                await safeApiKit.proposeTransaction({
                  safeAddress: await safeInstance.getAddress(),
                  safeTransactionData: safeTransaction.data,
                  safeTxHash,
                  senderAddress: address,
                  senderSignature: signature.data,
                });
              }}
            >
              Deploy
            </Button>
          </Flex>
        )}
      </Td>
    </Tr>
  );
}

export function App() {
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const signer = useEthersSigner();
  const toast = useToast();
  const { setValue, onCopy } = useClipboard("");

  const [safeAddress, setSafeAddress] = useState<`0x${string}`>(
    ethers.constants.AddressZero
  );

  const initialBytecode = new URLSearchParams(window.location.search).get(
    "bytecode"
  );
  const [bytecode, setBytecode] = useState<`0x${string}`>(
    initialBytecode ||
      "0x60a0604052600060035534801561001557600080fd5b50604051610b5e380380610b5e8339810160408190526100349161005e565b608091909152600280546001600160a01b0319166001600160a01b0390921691909117905561009b565b6000806040838503121561007157600080fd5b825160208401519092506001600160a01b038116811461009057600080fd5b809150509250929050565b608051610aa26100bc6000396000818160e201526102030152610aa26000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063491606581161006657806349160658146101255780636a22d8cc146101385780638381f58a1461014b5780638da5cb5b14610154578063d09de08a1461016757600080fd5b8063034eb50c14610098578063116191b6146100ad578063177a0c2c146100dd5780633fb5c1cb14610112575b600080fd5b6100ab6100a636600461079d565b61016f565b005b6000546100c0906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101047f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020016100d4565b6100ab61012036600461082e565b6102a4565b6100ab610133366004610890565b6102d2565b6001546100c0906001600160a01b031681565b61010460035481565b6002546100c0906001600160a01b031681565b6100ab610484565b604080514660208201526001600160a01b0380871692820192909252908416606082015260009060800160408051601f198184030181528282528051602091820120908301520160405160208183030381529060405280519060200120905061022e8383808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152507f000000000000000000000000000000000000000000000000000000000000000092508591506104c49050565b61026f5760405162461bcd60e51b815260206004820152600d60248201526c24b73b30b634b210383937b7b360991b60448201526064015b60405180910390fd5b5050600080546001600160a01b039485166001600160a01b031991821617909155600180549390941692169190911790915550565b6102ad336104da565b3330146102cd576040516348f5c3ed60e01b815260040160405180910390fd5b600355565b600082826040516102e4929190610934565b604051908190038120600054635f6970c360e01b83529092506001600160a01b031690635f6970c390610325908b908b908b908b908b90899060040161096d565b6020604051808303816000875af1158015610344573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036891906109ae565b61038557604051631403112d60e21b815260040160405180910390fd5b6103ea85858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250506002546103d492506001600160a01b03169050610525565b8051602091820120825192909101919091201490565b610407576040516348f5c3ed60e01b815260040160405180910390fd5b600080306001600160a01b03168585604051610424929190610934565b6000604051808303816000865af19150503d8060008114610461576040519150601f19603f3d011682016040523d82523d6000602084013e610466565b606091505b50915091508161047857805181602001fd5b50505050505050505050565b61048d336104da565b3330146104ad576040516348f5c3ed60e01b815260040160405180910390fd5b600380549060006104bd836109e6565b9190505550565b6000826104d18584610541565b14949350505050565b6040516001600160a01b03821660248201526105229060440160408051601f198184030181529190526020810180516001600160e01b031663161765e160e11b17905261058e565b50565b606061053b6001600160a01b03831660146105af565b92915050565b600081815b84518110156105865761057282868381518110610565576105656109ff565b6020026020010151610752565b91508061057e816109e6565b915050610546565b509392505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b606060006105be836002610a15565b6105c9906002610a2c565b67ffffffffffffffff8111156105e1576105e1610a3f565b6040519080825280601f01601f19166020018201604052801561060b576020820181803683370190505b509050600360fc1b81600081518110610626576106266109ff565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610655576106556109ff565b60200101906001600160f81b031916908160001a9053506000610679846002610a15565b610684906001610a2c565b90505b60018111156106fc576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106106b8576106b86109ff565b1a60f81b8282815181106106ce576106ce6109ff565b60200101906001600160f81b031916908160001a90535060049490941c936106f581610a55565b9050610687565b50831561074b5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610266565b9392505050565b600081831061076e57600082815260208490526040902061074b565b600083815260208390526040902061074b565b80356001600160a01b038116811461079857600080fd5b919050565b600080600080606085870312156107b357600080fd5b6107bc85610781565b93506107ca60208601610781565b9250604085013567ffffffffffffffff808211156107e757600080fd5b818701915087601f8301126107fb57600080fd5b81358181111561080a57600080fd5b8860208260051b850101111561081f57600080fd5b95989497505060200194505050565b60006020828403121561084057600080fd5b5035919050565b60008083601f84011261085957600080fd5b50813567ffffffffffffffff81111561087157600080fd5b60208301915083602082850101111561088957600080fd5b9250929050565b60008060008060008060006080888a0312156108ab57600080fd5b87359650602088013567ffffffffffffffff808211156108ca57600080fd5b6108d68b838c01610847565b909850965060408a01359150808211156108ef57600080fd5b6108fb8b838c01610847565b909650945060608a013591508082111561091457600080fd5b506109218a828b01610847565b989b979a50959850939692959293505050565b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b868152608060208201526000610987608083018789610944565b828103604084015261099a818688610944565b915050826060830152979650505050505050565b6000602082840312156109c057600080fd5b8151801515811461074b57600080fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016109f8576109f86109d0565b5060010190565b634e487b7160e01b600052603260045260246000fd5b808202811582820484141761053b5761053b6109d0565b8082018082111561053b5761053b6109d0565b634e487b7160e01b600052604160045260246000fd5b600081610a6457610a646109d0565b50600019019056fea2646970667358221220010ce503e114c5a4d2b54aad241eb27ba27fa839ee07bfdc0d3a97deebe019a964736f6c63430008120033"
  );
  const [salt, setSalt] = useState<string>("");
  const encodedSalt = encodeAbiParameters(parseAbiParameters("bytes32"), [
    pad(toHex(salt)),
  ]);

  let ethAdapter: EthersAdapter;
  let safeApiKit: SafeApiKit;

  if (signer) {
    ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer!,
    });
    safeApiKit = new SafeApiKit({
      txServiceUrl: "https://safe-transaction-goerli.safe.global/",
      ethAdapter,
    });
  }

  const {
    data: safesByOwner,
    error,
    isLoading,
  } = useSWR(
    address ? "/safes" : null,
    async () => await safeApiKit?.getSafesByOwner(address!)
  );

  const { data: safeInstance, error: safeError } = useSWR(
    safesByOwner && safeAddress != ethers.constants.AddressZero
      ? "/safeInstance"
      : null,
    async () =>
      await Safe.create({
        ethAdapter,
        safeAddress: safeAddress,
      })
  );

  const deployedAddress = getContractAddress({
    from: FACTORY_ADDRESS,
    opcode: "CREATE2",
    bytecode: encodePacked(
      ["bytes", "bytes"],
      [
        bytecode,
        encodeAbiParameters(parseAbiParameters("bytes32,address"), [
          "0x62566b41f41e3edf91fd48bf6b8a1899aeb12d3397323b765047785362656188",
          safeAddress || ethers.constants.AddressZero,
        ]),
      ]
    ),
    salt: keccak256(
      encodeAbiParameters(parseAbiParameters("uint256,address,bytes32"), [
        BigInt(chain?.id || 0) || 0n,
        safeAddress,
        pad(toHex(salt)),
      ])
    ),
  });

  // const deployedAddress = "0x43c241Cd60Bd5ba25B748881B447E2eda782F35C";

  useEffect(() => {
    setValue(deployedAddress);
  }, [deployedAddress]);

  return (
    <Container alignItems={"center"} justifyContent={"center"} mt={8}>
      <Flex flexDirection={"column"}>
        <Center mb={8}>
          <Heading>Safe Cross Chain Factory</Heading>
        </Center>
        <Center mb={4}>
          <ConnectButton />
        </Center>
      </Flex>

      {isConnected && (
        <>
          <Divider my={8} />
          <FormControl mb={4}>
            <FormLabel>Safe</FormLabel>
            <Select
              value={safeAddress}
              placeholder="Select a Safe"
              onChange={(e) => setSafeAddress(e.target.value as `0x${string}`)}
            >
              {safesByOwner?.safes.map((safe) => (
                <option key={safe} value={safe}>
                  {safe}
                </option>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {isConnected && safeAddress != ethers.constants.AddressZero && (
        <>
          <FormControl mb={4}>
            <FormLabel>Contract Bytecode</FormLabel>
            <Input
              placeholder="0x..."
              value={bytecode}
              onChange={(e) => setBytecode(e.target.value as `0x${string}`)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Salt</FormLabel>
            <Input
              placeholder="0"
              value={salt}
              onChange={(e) => setSalt(e.target.value as `0x${string}`)}
            />
          </FormControl>

          <Divider my={8} />

          <Flex flexDirection={"column"}>
            <Center mb={4}>
              <Text>Deploying contract to:</Text>
            </Center>
            <Center mb={4}>
              <Code px={4} py={2} rounded={"md"} fontSize={"md"}>
                {deployedAddress}
              </Code>
              <Button
                ml={4}
                onClick={() => {
                  onCopy();
                  toast({
                    title: "Deployment address copied",
                    variant: "subtle",
                    isClosable: true,
                  });
                }}
              >
                <CopyIcon />
              </Button>
            </Center>
          </Flex>

          <Divider my={8} />

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Chain</Th>
                  <Th>Deployed</Th>
                </Tr>
              </Thead>
              <Tbody>
                {testnetBridges.map((bridge) => (
                  <ChainRow
                    key={bridge.id}
                    bridge={bridge}
                    safeApiKit={safeApiKit}
                    safeInstance={safeInstance}
                    salt={encodedSalt}
                    bytecode={bytecode}
                    deployedAddress={deployedAddress}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
