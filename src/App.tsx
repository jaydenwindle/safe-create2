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
  Box,
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

import { safeCrossChainFactoryABI } from "./generated";

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
  const toast = useToast();

  const destinationChain = Object.keys(chains)
    .map((chain) => chains[chain as any])
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
              href={`${destinationChain?.blockExplorers?.default?.url}/address/${deployedAddress}`}
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
                    abi: safeCrossChainFactoryABI,
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
                    abi: safeCrossChainFactoryABI,
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

                const safeAddress = await safeInstance.getAddress();

                await safeApiKit.proposeTransaction({
                  safeAddress,
                  safeTransactionData: safeTransaction.data,
                  safeTxHash,
                  senderAddress: address,
                  senderSignature: signature.data,
                });

                toast({
                  duration: 2000,
                  render: () => (
                    <Box
                      color="green.600"
                      fontWeight={"bold"}
                      p={3}
                      px={6}
                      bg="green.300"
                      rounded={"lg"}
                    >
                      Submitted Transaction to Safe:{" "}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`https://app.safe.global/transactions/queue?safe=gor:${safeAddress}`}
                      >
                        {safeTxHash.slice(0, 6)}...
                        {safeTxHash.slice(-4)}
                      </Link>
                    </Box>
                  ),
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
  ) as `0x${string}`;
  const [bytecode, setBytecode] = useState<`0x${string}`>(
    initialBytecode || "0x"
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
