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
} from "@chakra-ui/react";
import { CloseIcon, CopyIcon, CheckIcon } from "@chakra-ui/icons";

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

const FACTORY_ADDRESS = "0x35D826d9b05FB92707723E901e048C0E2Da1BDf4";

function ChainRow({
  bridge,
  safeInstance,
  safeApiKit,
  creator,
  salt,
  bytecode,
  deployedAddress,
}: {
  bridge: any;
  safeInstance: any;
  safeApiKit: any;
  creator: `0x${string}`;
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

  console.log("there", contractExists, error);

  const {
    data: contractHash,
    isError,
    isLoading,
  } = useContractRead({
    chainId: bridge.chainId,
    address: FACTORY_ADDRESS,
    abi: parseAbi([
      "function getContractHash(uint256 originChainId, address creator, bytes32 salt) public view returns (bytes32)",
    ]),
    functionName: "getContractHash",
    args: [originChain.id, creator, salt],
  });

  const expectedContractHash = keccak256(
    encodeAbiParameters(parseAbiParameters("bytes,bytes"), [bytecode, "0x"])
  );

  const contractHashMatches = contractHash == expectedContractHash;

  return (
    <Tr>
      <Td>{bridge.name} (testnet)</Td>
      <Td>
        {contractHashMatches ? (
          <Flex alignItems={"center"}>
            <CheckIcon mr={2} color={"green.200"} />
            <Text color={"green.200"}>Approved</Text>
          </Flex>
        ) : (
          <Button
            size="sm"
            onClick={async () => {
              console.log(salt, bytecode);

              let safeTransactionData;
              if (originChain?.id !== destinationChain.id) {
                const calldata = encodeFunctionData({
                  abi: parseAbi([
                    "function setContractHashRemote(bytes32 salt, bytes memory bytecode, bytes calldata initData, string calldata destinationChain) external payable",
                  ]),
                  functionName: "setContractHashRemote",
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
                    "function setContractHash(bytes32 salt, bytes memory bytecode, bytes calldata initData) external payable",
                  ]),
                  functionName: "setContractHash",
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
            Approve
          </Button>
        )}
      </Td>
      <Td>
        {contractExists && (
          <Flex alignItems={"center"}>
            <CheckIcon mr={2} color={"green.200"} />
            <Text color={"green.200"}>Deployed</Text>
          </Flex>
        )}
        {!contractExists && contractHashMatches && (
          <Flex alignItems={"center"}>
            <Button
              size="sm"
              onClick={async () => {
                console.log(salt, bytecode);

                let safeTransactionData;
                if (originChain?.id !== destinationChain.id) {
                  const calldata = encodeFunctionData({
                    abi: parseAbi([
                      "function setContractHashRemote(bytes32 salt, bytes memory bytecode, bytes calldata initData, string calldata destinationChain) external payable",
                    ]),
                    functionName: "setContractHashRemote",
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
                      "function create(uint256 originChainId, address creator, bytes32 salt, bytes calldata bytecode, bytes calldata initData) external returns (address addr)",
                    ]),
                    functionName: "create",
                    args: [
                      originChain?.id,
                      await safeInstance.getAddress(),
                      salt,
                      bytecode,
                      "0x",
                    ],
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
        {!contractExists && !contractHashMatches && (
          <Flex alignItems={"center"}>
            <CloseIcon mr={2} color={"gray.300"} />
            <Text color={"gray.300"}>Deployed</Text>
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
  const [bytecode, setBytecode] = useState<`0x${string}`>(
    "0x60806040526000805534801561001457600080fd5b5060f7806100236000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220a19f23b4ab136e58da4da18523a4b6e157527765c814a5b8b981b6515628797b64736f6c63430008120033"
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

  console.log("asdf", safeAddress);

  const deployedAddress = getContractAddress({
    from: FACTORY_ADDRESS,
    opcode: "CREATE2",
    bytecode: encodePacked(
      ["bytes", "bytes32", "address"],
      [
        bytecode,
        "0x62566b41f41e3edf91fd48bf6b8a1899aeb12d3397323b765047785362656188",
        safeAddress || ethers.constants.AddressZero,
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
                  <Th>Approved</Th>
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
                    creator={safeAddress}
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
