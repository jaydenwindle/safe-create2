import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export const counterABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export const counterAddress = {
  1: '0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac',
  5: '0x78991BB1D194C1235fe285240af8489CFA552151',
  31337: '0xbe18A1B61ceaF59aEB6A9bC81AB4FB87D56Ba167',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export const counterConfig = {
  address: counterAddress,
  abi: counterABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAxelarGasService
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAxelarGasServiceABI = [
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidAmounts' },
  { type: 'error', inputs: [], name: 'InvalidCodeHash' },
  { type: 'error', inputs: [], name: 'InvalidImplementation' },
  { type: 'error', inputs: [], name: 'InvalidOwner' },
  { type: 'error', inputs: [], name: 'InvalidOwnerAddress' },
  { type: 'error', inputs: [], name: 'NotCollector' },
  { type: 'error', inputs: [], name: 'NotOwner' },
  { type: 'error', inputs: [], name: 'NotProxy' },
  { type: 'error', inputs: [], name: 'NothingReceived' },
  { type: 'error', inputs: [], name: 'SetupFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'logIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ExpressGasAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'logIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasPaidForContractCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasPaidForContractCallWithToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasPaidForExpressCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'gasToken',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GasPaidForExpressCallWithToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'logIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeExpressGasAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'logIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeGasAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeGasPaidForContractCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeGasPaidForContractCallWithToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeGasPaidForExpressCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sourceAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'gasFeeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'NativeGasPaidForExpressCallWithToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'txHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'logIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address payable',
        type: 'address',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Refunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newImplementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addExpressGas',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addGas',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addNativeExpressGas',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addNativeGas',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address payable', type: 'address' },
      { name: 'tokens', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'collectFees',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'gasCollector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payGasForContractCall',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payGasForContractCallWithToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payGasForExpressCall',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'gasFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payGasForExpressCallWithToken',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payNativeGasForContractCall',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payNativeGasForContractCallWithToken',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payNativeGasForExpressCall',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payNativeGasForExpressCallWithToken',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'proposeOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'logIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address payable', type: 'address' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'refund',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'setup',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      {
        name: 'newImplementationCodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
      },
      { name: 'params', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgrade',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAxelarGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAxelarGatewayABI = [
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'BurnFailed',
  },
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'ExceedMintLimit',
  },
  { type: 'error', inputs: [], name: 'InvalidAmount' },
  { type: 'error', inputs: [], name: 'InvalidAuthModule' },
  { type: 'error', inputs: [], name: 'InvalidChainId' },
  { type: 'error', inputs: [], name: 'InvalidCodeHash' },
  { type: 'error', inputs: [], name: 'InvalidCommands' },
  { type: 'error', inputs: [], name: 'InvalidGovernance' },
  { type: 'error', inputs: [], name: 'InvalidMintLimiter' },
  { type: 'error', inputs: [], name: 'InvalidSetMintLimitsParams' },
  { type: 'error', inputs: [], name: 'InvalidTokenDeployer' },
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'MintFailed',
  },
  { type: 'error', inputs: [], name: 'NotGovernance' },
  { type: 'error', inputs: [], name: 'NotMintLimiter' },
  { type: 'error', inputs: [], name: 'NotProxy' },
  { type: 'error', inputs: [], name: 'NotSelf' },
  { type: 'error', inputs: [], name: 'SetupFailed' },
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'TokenAlreadyExists',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'TokenContractDoesNotExist',
  },
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'TokenDeployFailed',
  },
  {
    type: 'error',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'TokenDoesNotExist',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationContractAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'payload', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'ContractCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'commandId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sourceChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'sourceAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sourceTxHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'sourceEventIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ContractCallApproved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'commandId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sourceChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'sourceAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sourceTxHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'sourceEventIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ContractCallApprovedWithMint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationContractAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'payloadHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'payload', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ContractCallWithToken',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'commandId',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'Executed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GovernanceTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MintLimiterTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOperatorsData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'OperatorshipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'tokenAddresses',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TokenDeployed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'limit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenMintLimitUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'destinationChain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'destinationAddress',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'symbol',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'adminEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'adminThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'admins',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'allTokensFrozen',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'authModule',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'callContract',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'callContractWithToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'input', internalType: 'bytes', type: 'bytes' }],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'governance',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'commandId', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isCommandExecuted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'payloadHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isContractCallAndMintApproved',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'payloadHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'isContractCallApproved',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mintLimiter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'sendToken',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'symbols', internalType: 'string[]', type: 'string[]' },
      { name: 'limits', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'setTokenMintLimits',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'params', internalType: 'bytes', type: 'bytes' }],
    name: 'setup',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'tokenAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenDeployer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'tokenFrozen',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'tokenMintAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    name: 'tokenMintLimit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newGovernance', internalType: 'address', type: 'address' },
    ],
    name: 'transferGovernance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newGovernance', internalType: 'address', type: 'address' },
    ],
    name: 'transferMintLimiter',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      {
        name: 'newImplementationCodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
      },
      { name: 'setupParams', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgrade',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'payloadHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'validateContractCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'payloadHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateContractCallAndMint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IContractIdentifier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iContractIdentifierABI = [
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IGovernable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iGovernableABI = [
  { type: 'error', inputs: [], name: 'InvalidGovernance' },
  { type: 'error', inputs: [], name: 'InvalidMintLimiter' },
  { type: 'error', inputs: [], name: 'NotGovernance' },
  { type: 'error', inputs: [], name: 'NotMintLimiter' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'GovernanceTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newGovernance',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'MintLimiterTransferred',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'governance',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'mintLimiter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newGovernance', internalType: 'address', type: 'address' },
    ],
    name: 'transferGovernance',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newGovernance', internalType: 'address', type: 'address' },
    ],
    name: 'transferMintLimiter',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOwnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iOwnableABI = [
  { type: 'error', inputs: [], name: 'InvalidOwner' },
  { type: 'error', inputs: [], name: 'InvalidOwnerAddress' },
  { type: 'error', inputs: [], name: 'NotOwner' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'proposeOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IUpgradable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iUpgradableABI = [
  { type: 'error', inputs: [], name: 'InvalidCodeHash' },
  { type: 'error', inputs: [], name: 'InvalidImplementation' },
  { type: 'error', inputs: [], name: 'InvalidOwner' },
  { type: 'error', inputs: [], name: 'InvalidOwnerAddress' },
  { type: 'error', inputs: [], name: 'NotOwner' },
  { type: 'error', inputs: [], name: 'NotProxy' },
  { type: 'error', inputs: [], name: 'SetupFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newImplementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractId',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'proposeOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'setup',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      {
        name: 'newImplementationCodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
      },
      { name: 'params', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgrade',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockAxelarGasService
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockAxelarGasServiceABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
      { name: 'destinationAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'refundAddress', internalType: 'address', type: 'address' },
    ],
    name: 'payNativeGasForContractCall',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockAxelarGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockAxelarGatewayABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'validateContractCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCreate2Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCreate2FactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_bridgeRoot', internalType: 'bytes32', type: 'bytes32' }],
  },
  { type: 'error', inputs: [], name: 'Create2FailedDeployment' },
  { type: 'error', inputs: [], name: 'GasPaymentRequired' },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  { type: 'error', inputs: [], name: 'InvalidContractHash' },
  { type: 'error', inputs: [], name: 'NotApprovedByGateway' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'created',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ContractCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridgeRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'originChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create',
    outputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gateway', internalType: 'address', type: 'address' },
      { name: '_gasService', internalType: 'address', type: 'address' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'enableBridge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gasService',
    outputs: [
      { name: '', internalType: 'contract IAxelarGasService', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gateway',
    outputs: [
      { name: '', internalType: 'contract IAxelarGateway', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'originChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getContractHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setContractHash',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
    ],
    name: 'setRemoteContractHash',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCrossChainFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCrossChainFactoryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_bridgeRoot', internalType: 'bytes32', type: 'bytes32' }],
  },
  { type: 'error', inputs: [], name: 'Create2FailedDeployment' },
  { type: 'error', inputs: [], name: 'GasPaymentRequired' },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  { type: 'error', inputs: [], name: 'InvalidContractHash' },
  { type: 'error', inputs: [], name: 'NotApprovedByGateway' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'created',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ContractCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridgeRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'originChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create',
    outputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gateway', internalType: 'address', type: 'address' },
      { name: '_gasService', internalType: 'address', type: 'address' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'enableBridge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gasService',
    outputs: [
      { name: '', internalType: 'contract IAxelarGasService', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gateway',
    outputs: [
      { name: '', internalType: 'contract IAxelarGateway', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'originChainId', internalType: 'uint256', type: 'uint256' },
      { name: 'creator', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getContractHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setContractHash',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'initData', internalType: 'bytes', type: 'bytes' },
      { name: 'destinationChain', internalType: 'string', type: 'string' },
    ],
    name: 'setRemoteContractHash',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCrossChainOwnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCrossChainOwnableABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_bridgeRoot', internalType: 'bytes32', type: 'bytes32' },
      { name: 'crossChainOwner', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  { type: 'error', inputs: [], name: 'NotApprovedByGateway' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'bridgeRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gateway', internalType: 'address', type: 'address' },
      { name: '_gasService', internalType: 'address', type: 'address' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'enableBridge',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'commandId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'sourceChain', internalType: 'string', type: 'string' },
      { name: 'sourceAddress', internalType: 'string', type: 'string' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gasService',
    outputs: [
      { name: '', internalType: 'contract IAxelarGasService', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gateway',
    outputs: [
      { name: '', internalType: 'contract IAxelarGateway', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"number"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterNumber<
  TFunctionName extends 'number',
  TSelectData = ReadContractResult<typeof counterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'number',
    ...config,
  } as UseContractReadConfig<typeof counterABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof counterABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof counterABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, TFunctionName, TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"increment"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterIncrement<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'increment'
        >['request']['abi'],
        'increment',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'increment' }
    : UseContractWriteConfig<typeof counterABI, 'increment', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increment'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'increment', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'increment',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterSetNumber<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof counterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof counterABI,
          'setNumber'
        >['request']['abi'],
        'setNumber',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setNumber' }
    : UseContractWriteConfig<typeof counterABI, 'setNumber', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setNumber'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof counterABI, 'setNumber', TMode>({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'setNumber',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function usePrepareCounterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"increment"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function usePrepareCounterIncrement(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'increment'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'increment',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'increment'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link counterABI}__ and `functionName` set to `"setNumber"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function usePrepareCounterSetNumber(
  config: Omit<
    UsePrepareContractWriteConfig<typeof counterABI, 'setNumber'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    functionName: 'setNumber',
    ...config,
  } as UsePrepareContractWriteConfig<typeof counterABI, 'setNumber'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof counterABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    ...config,
  } as UseContractEventConfig<typeof counterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link counterABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x1A61839Eb5fC6eBBcAe01eD5E79062E598792Dac)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x78991BB1D194C1235fe285240af8489CFA552151)
 * -
 */
export function useCounterTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof counterABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof counterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: counterABI,
    address: counterAddress[chainId as keyof typeof counterAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof counterABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGasServiceABI}__.
 */
export function useIAxelarGasServiceRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iAxelarGasServiceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAxelarGasServiceABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGasServiceABI,
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"contractId"`.
 */
export function useIAxelarGasServiceContractId<
  TFunctionName extends 'contractId',
  TSelectData = ReadContractResult<typeof iAxelarGasServiceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAxelarGasServiceABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGasServiceABI,
    functionName: 'contractId',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"implementation"`.
 */
export function useIAxelarGasServiceImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof iAxelarGasServiceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAxelarGasServiceABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGasServiceABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"owner"`.
 */
export function useIAxelarGasServiceOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof iAxelarGasServiceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAxelarGasServiceABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGasServiceABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useIAxelarGasServicePendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof iAxelarGasServiceABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAxelarGasServiceABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGasServiceABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__.
 */
export function useIAxelarGasServiceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, TFunctionName, TMode>({
    abi: iAxelarGasServiceABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useIAxelarGasServiceAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'acceptOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'acceptOwnership',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addExpressGas"`.
 */
export function useIAxelarGasServiceAddExpressGas<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'addExpressGas'
        >['request']['abi'],
        'addExpressGas',
        TMode
      > & { functionName?: 'addExpressGas' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'addExpressGas',
        TMode
      > & {
        abi?: never
        functionName?: 'addExpressGas'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'addExpressGas', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'addExpressGas',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addGas"`.
 */
export function useIAxelarGasServiceAddGas<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'addGas'
        >['request']['abi'],
        'addGas',
        TMode
      > & { functionName?: 'addGas' }
    : UseContractWriteConfig<typeof iAxelarGasServiceABI, 'addGas', TMode> & {
        abi?: never
        functionName?: 'addGas'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'addGas', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'addGas',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addNativeExpressGas"`.
 */
export function useIAxelarGasServiceAddNativeExpressGas<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'addNativeExpressGas'
        >['request']['abi'],
        'addNativeExpressGas',
        TMode
      > & { functionName?: 'addNativeExpressGas' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'addNativeExpressGas',
        TMode
      > & {
        abi?: never
        functionName?: 'addNativeExpressGas'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'addNativeExpressGas',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'addNativeExpressGas',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addNativeGas"`.
 */
export function useIAxelarGasServiceAddNativeGas<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'addNativeGas'
        >['request']['abi'],
        'addNativeGas',
        TMode
      > & { functionName?: 'addNativeGas' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'addNativeGas',
        TMode
      > & {
        abi?: never
        functionName?: 'addNativeGas'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'addNativeGas', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'addNativeGas',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"collectFees"`.
 */
export function useIAxelarGasServiceCollectFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'collectFees'
        >['request']['abi'],
        'collectFees',
        TMode
      > & { functionName?: 'collectFees' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'collectFees',
        TMode
      > & {
        abi?: never
        functionName?: 'collectFees'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'collectFees', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'collectFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"gasCollector"`.
 */
export function useIAxelarGasServiceGasCollector<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'gasCollector'
        >['request']['abi'],
        'gasCollector',
        TMode
      > & { functionName?: 'gasCollector' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'gasCollector',
        TMode
      > & {
        abi?: never
        functionName?: 'gasCollector'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'gasCollector', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'gasCollector',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForContractCall"`.
 */
export function useIAxelarGasServicePayGasForContractCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payGasForContractCall'
        >['request']['abi'],
        'payGasForContractCall',
        TMode
      > & { functionName?: 'payGasForContractCall' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payGasForContractCall',
        TMode
      > & {
        abi?: never
        functionName?: 'payGasForContractCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payGasForContractCall',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForContractCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForContractCallWithToken"`.
 */
export function useIAxelarGasServicePayGasForContractCallWithToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payGasForContractCallWithToken'
        >['request']['abi'],
        'payGasForContractCallWithToken',
        TMode
      > & { functionName?: 'payGasForContractCallWithToken' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payGasForContractCallWithToken',
        TMode
      > & {
        abi?: never
        functionName?: 'payGasForContractCallWithToken'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payGasForContractCallWithToken',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForContractCallWithToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForExpressCall"`.
 */
export function useIAxelarGasServicePayGasForExpressCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payGasForExpressCall'
        >['request']['abi'],
        'payGasForExpressCall',
        TMode
      > & { functionName?: 'payGasForExpressCall' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payGasForExpressCall',
        TMode
      > & {
        abi?: never
        functionName?: 'payGasForExpressCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payGasForExpressCall',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForExpressCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForExpressCallWithToken"`.
 */
export function useIAxelarGasServicePayGasForExpressCallWithToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payGasForExpressCallWithToken'
        >['request']['abi'],
        'payGasForExpressCallWithToken',
        TMode
      > & { functionName?: 'payGasForExpressCallWithToken' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payGasForExpressCallWithToken',
        TMode
      > & {
        abi?: never
        functionName?: 'payGasForExpressCallWithToken'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payGasForExpressCallWithToken',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForExpressCallWithToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCall"`.
 */
export function useIAxelarGasServicePayNativeGasForContractCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payNativeGasForContractCall'
        >['request']['abi'],
        'payNativeGasForContractCall',
        TMode
      > & { functionName?: 'payNativeGasForContractCall' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payNativeGasForContractCall',
        TMode
      > & {
        abi?: never
        functionName?: 'payNativeGasForContractCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payNativeGasForContractCall',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCallWithToken"`.
 */
export function useIAxelarGasServicePayNativeGasForContractCallWithToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payNativeGasForContractCallWithToken'
        >['request']['abi'],
        'payNativeGasForContractCallWithToken',
        TMode
      > & { functionName?: 'payNativeGasForContractCallWithToken' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payNativeGasForContractCallWithToken',
        TMode
      > & {
        abi?: never
        functionName?: 'payNativeGasForContractCallWithToken'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payNativeGasForContractCallWithToken',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCallWithToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForExpressCall"`.
 */
export function useIAxelarGasServicePayNativeGasForExpressCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payNativeGasForExpressCall'
        >['request']['abi'],
        'payNativeGasForExpressCall',
        TMode
      > & { functionName?: 'payNativeGasForExpressCall' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payNativeGasForExpressCall',
        TMode
      > & {
        abi?: never
        functionName?: 'payNativeGasForExpressCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payNativeGasForExpressCall',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForExpressCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForExpressCallWithToken"`.
 */
export function useIAxelarGasServicePayNativeGasForExpressCallWithToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'payNativeGasForExpressCallWithToken'
        >['request']['abi'],
        'payNativeGasForExpressCallWithToken',
        TMode
      > & { functionName?: 'payNativeGasForExpressCallWithToken' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'payNativeGasForExpressCallWithToken',
        TMode
      > & {
        abi?: never
        functionName?: 'payNativeGasForExpressCallWithToken'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'payNativeGasForExpressCallWithToken',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForExpressCallWithToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function useIAxelarGasServiceProposeOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'proposeOwnership'
        >['request']['abi'],
        'proposeOwnership',
        TMode
      > & { functionName?: 'proposeOwnership' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'proposeOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'proposeOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'proposeOwnership',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'proposeOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"refund"`.
 */
export function useIAxelarGasServiceRefund<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'refund'
        >['request']['abi'],
        'refund',
        TMode
      > & { functionName?: 'refund' }
    : UseContractWriteConfig<typeof iAxelarGasServiceABI, 'refund', TMode> & {
        abi?: never
        functionName?: 'refund'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'refund', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'refund',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"setup"`.
 */
export function useIAxelarGasServiceSetup<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'setup'
        >['request']['abi'],
        'setup',
        TMode
      > & { functionName?: 'setup' }
    : UseContractWriteConfig<typeof iAxelarGasServiceABI, 'setup', TMode> & {
        abi?: never
        functionName?: 'setup'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'setup', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'setup',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useIAxelarGasServiceTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof iAxelarGasServiceABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGasServiceABI,
    'transferOwnership',
    TMode
  >({
    abi: iAxelarGasServiceABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"upgrade"`.
 */
export function useIAxelarGasServiceUpgrade<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGasServiceABI,
          'upgrade'
        >['request']['abi'],
        'upgrade',
        TMode
      > & { functionName?: 'upgrade' }
    : UseContractWriteConfig<typeof iAxelarGasServiceABI, 'upgrade', TMode> & {
        abi?: never
        functionName?: 'upgrade'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGasServiceABI, 'upgrade', TMode>({
    abi: iAxelarGasServiceABI,
    functionName: 'upgrade',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__.
 */
export function usePrepareIAxelarGasServiceWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareIAxelarGasServiceAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'acceptOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'acceptOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addExpressGas"`.
 */
export function usePrepareIAxelarGasServiceAddExpressGas(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'addExpressGas'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'addExpressGas',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'addExpressGas'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addGas"`.
 */
export function usePrepareIAxelarGasServiceAddGas(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'addGas'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'addGas',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'addGas'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addNativeExpressGas"`.
 */
export function usePrepareIAxelarGasServiceAddNativeExpressGas(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'addNativeExpressGas'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'addNativeExpressGas',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'addNativeExpressGas'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"addNativeGas"`.
 */
export function usePrepareIAxelarGasServiceAddNativeGas(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'addNativeGas'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'addNativeGas',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'addNativeGas'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"collectFees"`.
 */
export function usePrepareIAxelarGasServiceCollectFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'collectFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'collectFees',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'collectFees'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"gasCollector"`.
 */
export function usePrepareIAxelarGasServiceGasCollector(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'gasCollector'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'gasCollector',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'gasCollector'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForContractCall"`.
 */
export function usePrepareIAxelarGasServicePayGasForContractCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payGasForContractCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForContractCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payGasForContractCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForContractCallWithToken"`.
 */
export function usePrepareIAxelarGasServicePayGasForContractCallWithToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payGasForContractCallWithToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForContractCallWithToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payGasForContractCallWithToken'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForExpressCall"`.
 */
export function usePrepareIAxelarGasServicePayGasForExpressCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payGasForExpressCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForExpressCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payGasForExpressCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payGasForExpressCallWithToken"`.
 */
export function usePrepareIAxelarGasServicePayGasForExpressCallWithToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payGasForExpressCallWithToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payGasForExpressCallWithToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payGasForExpressCallWithToken'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCall"`.
 */
export function usePrepareIAxelarGasServicePayNativeGasForContractCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payNativeGasForContractCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payNativeGasForContractCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCallWithToken"`.
 */
export function usePrepareIAxelarGasServicePayNativeGasForContractCallWithToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payNativeGasForContractCallWithToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCallWithToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payNativeGasForContractCallWithToken'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForExpressCall"`.
 */
export function usePrepareIAxelarGasServicePayNativeGasForExpressCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payNativeGasForExpressCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForExpressCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payNativeGasForExpressCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForExpressCallWithToken"`.
 */
export function usePrepareIAxelarGasServicePayNativeGasForExpressCallWithToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'payNativeGasForExpressCallWithToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'payNativeGasForExpressCallWithToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'payNativeGasForExpressCallWithToken'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function usePrepareIAxelarGasServiceProposeOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'proposeOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'proposeOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'proposeOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"refund"`.
 */
export function usePrepareIAxelarGasServiceRefund(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'refund'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'refund',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'refund'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"setup"`.
 */
export function usePrepareIAxelarGasServiceSetup(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'setup'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'setup',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'setup'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareIAxelarGasServiceTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGasServiceABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGasServiceABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `functionName` set to `"upgrade"`.
 */
export function usePrepareIAxelarGasServiceUpgrade(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'upgrade'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGasServiceABI,
    functionName: 'upgrade',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGasServiceABI, 'upgrade'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__.
 */
export function useIAxelarGasServiceEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"ExpressGasAdded"`.
 */
export function useIAxelarGasServiceExpressGasAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'ExpressGasAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'ExpressGasAdded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, 'ExpressGasAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"GasAdded"`.
 */
export function useIAxelarGasServiceGasAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'GasAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'GasAdded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, 'GasAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"GasPaidForContractCall"`.
 */
export function useIAxelarGasServiceGasPaidForContractCallEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'GasPaidForContractCall'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'GasPaidForContractCall',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'GasPaidForContractCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"GasPaidForContractCallWithToken"`.
 */
export function useIAxelarGasServiceGasPaidForContractCallWithTokenEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'GasPaidForContractCallWithToken'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'GasPaidForContractCallWithToken',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'GasPaidForContractCallWithToken'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"GasPaidForExpressCall"`.
 */
export function useIAxelarGasServiceGasPaidForExpressCallEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'GasPaidForExpressCall'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'GasPaidForExpressCall',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'GasPaidForExpressCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"GasPaidForExpressCallWithToken"`.
 */
export function useIAxelarGasServiceGasPaidForExpressCallWithTokenEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'GasPaidForExpressCallWithToken'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'GasPaidForExpressCallWithToken',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'GasPaidForExpressCallWithToken'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeExpressGasAdded"`.
 */
export function useIAxelarGasServiceNativeExpressGasAddedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'NativeExpressGasAdded'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeExpressGasAdded',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'NativeExpressGasAdded'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeGasAdded"`.
 */
export function useIAxelarGasServiceNativeGasAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'NativeGasAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeGasAdded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, 'NativeGasAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeGasPaidForContractCall"`.
 */
export function useIAxelarGasServiceNativeGasPaidForContractCallEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'NativeGasPaidForContractCall'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeGasPaidForContractCall',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'NativeGasPaidForContractCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeGasPaidForContractCallWithToken"`.
 */
export function useIAxelarGasServiceNativeGasPaidForContractCallWithTokenEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'NativeGasPaidForContractCallWithToken'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeGasPaidForContractCallWithToken',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'NativeGasPaidForContractCallWithToken'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeGasPaidForExpressCall"`.
 */
export function useIAxelarGasServiceNativeGasPaidForExpressCallEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'NativeGasPaidForExpressCall'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeGasPaidForExpressCall',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'NativeGasPaidForExpressCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"NativeGasPaidForExpressCallWithToken"`.
 */
export function useIAxelarGasServiceNativeGasPaidForExpressCallWithTokenEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'NativeGasPaidForExpressCallWithToken'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'NativeGasPaidForExpressCallWithToken',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'NativeGasPaidForExpressCallWithToken'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useIAxelarGasServiceOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGasServiceABI,
      'OwnershipTransferStarted'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useIAxelarGasServiceOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGasServiceABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"Refunded"`.
 */
export function useIAxelarGasServiceRefundedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'Refunded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'Refunded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, 'Refunded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGasServiceABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useIAxelarGasServiceUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGasServiceABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGasServiceABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGasServiceABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__.
 */
export function useIAxelarGatewayRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"adminEpoch"`.
 */
export function useIAxelarGatewayAdminEpoch<
  TFunctionName extends 'adminEpoch',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'adminEpoch',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"adminThreshold"`.
 */
export function useIAxelarGatewayAdminThreshold<
  TFunctionName extends 'adminThreshold',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'adminThreshold',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"admins"`.
 */
export function useIAxelarGatewayAdmins<
  TFunctionName extends 'admins',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'admins',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"allTokensFrozen"`.
 */
export function useIAxelarGatewayAllTokensFrozen<
  TFunctionName extends 'allTokensFrozen',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'allTokensFrozen',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"authModule"`.
 */
export function useIAxelarGatewayAuthModule<
  TFunctionName extends 'authModule',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'authModule',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"governance"`.
 */
export function useIAxelarGatewayGovernance<
  TFunctionName extends 'governance',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'governance',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"implementation"`.
 */
export function useIAxelarGatewayImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"isCommandExecuted"`.
 */
export function useIAxelarGatewayIsCommandExecuted<
  TFunctionName extends 'isCommandExecuted',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'isCommandExecuted',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"isContractCallAndMintApproved"`.
 */
export function useIAxelarGatewayIsContractCallAndMintApproved<
  TFunctionName extends 'isContractCallAndMintApproved',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'isContractCallAndMintApproved',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"isContractCallApproved"`.
 */
export function useIAxelarGatewayIsContractCallApproved<
  TFunctionName extends 'isContractCallApproved',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'isContractCallApproved',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"mintLimiter"`.
 */
export function useIAxelarGatewayMintLimiter<
  TFunctionName extends 'mintLimiter',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'mintLimiter',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"tokenAddresses"`.
 */
export function useIAxelarGatewayTokenAddresses<
  TFunctionName extends 'tokenAddresses',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'tokenAddresses',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"tokenDeployer"`.
 */
export function useIAxelarGatewayTokenDeployer<
  TFunctionName extends 'tokenDeployer',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'tokenDeployer',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"tokenFrozen"`.
 */
export function useIAxelarGatewayTokenFrozen<
  TFunctionName extends 'tokenFrozen',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'tokenFrozen',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"tokenMintAmount"`.
 */
export function useIAxelarGatewayTokenMintAmount<
  TFunctionName extends 'tokenMintAmount',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'tokenMintAmount',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"tokenMintLimit"`.
 */
export function useIAxelarGatewayTokenMintLimit<
  TFunctionName extends 'tokenMintLimit',
  TSelectData = ReadContractResult<typeof iAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAxelarGatewayABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAxelarGatewayABI,
    functionName: 'tokenMintLimit',
    ...config,
  } as UseContractReadConfig<
    typeof iAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__.
 */
export function useIAxelarGatewayWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iAxelarGatewayABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, TFunctionName, TMode>({
    abi: iAxelarGatewayABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"callContract"`.
 */
export function useIAxelarGatewayCallContract<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'callContract'
        >['request']['abi'],
        'callContract',
        TMode
      > & { functionName?: 'callContract' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'callContract',
        TMode
      > & {
        abi?: never
        functionName?: 'callContract'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, 'callContract', TMode>({
    abi: iAxelarGatewayABI,
    functionName: 'callContract',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"callContractWithToken"`.
 */
export function useIAxelarGatewayCallContractWithToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'callContractWithToken'
        >['request']['abi'],
        'callContractWithToken',
        TMode
      > & { functionName?: 'callContractWithToken' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'callContractWithToken',
        TMode
      > & {
        abi?: never
        functionName?: 'callContractWithToken'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'callContractWithToken',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'callContractWithToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"execute"`.
 */
export function useIAxelarGatewayExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof iAxelarGatewayABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, 'execute', TMode>({
    abi: iAxelarGatewayABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"sendToken"`.
 */
export function useIAxelarGatewaySendToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'sendToken'
        >['request']['abi'],
        'sendToken',
        TMode
      > & { functionName?: 'sendToken' }
    : UseContractWriteConfig<typeof iAxelarGatewayABI, 'sendToken', TMode> & {
        abi?: never
        functionName?: 'sendToken'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, 'sendToken', TMode>({
    abi: iAxelarGatewayABI,
    functionName: 'sendToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"setTokenMintLimits"`.
 */
export function useIAxelarGatewaySetTokenMintLimits<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'setTokenMintLimits'
        >['request']['abi'],
        'setTokenMintLimits',
        TMode
      > & { functionName?: 'setTokenMintLimits' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'setTokenMintLimits',
        TMode
      > & {
        abi?: never
        functionName?: 'setTokenMintLimits'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'setTokenMintLimits',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'setTokenMintLimits',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"setup"`.
 */
export function useIAxelarGatewaySetup<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'setup'
        >['request']['abi'],
        'setup',
        TMode
      > & { functionName?: 'setup' }
    : UseContractWriteConfig<typeof iAxelarGatewayABI, 'setup', TMode> & {
        abi?: never
        functionName?: 'setup'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, 'setup', TMode>({
    abi: iAxelarGatewayABI,
    functionName: 'setup',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"transferGovernance"`.
 */
export function useIAxelarGatewayTransferGovernance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'transferGovernance'
        >['request']['abi'],
        'transferGovernance',
        TMode
      > & { functionName?: 'transferGovernance' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'transferGovernance',
        TMode
      > & {
        abi?: never
        functionName?: 'transferGovernance'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'transferGovernance',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'transferGovernance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"transferMintLimiter"`.
 */
export function useIAxelarGatewayTransferMintLimiter<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'transferMintLimiter'
        >['request']['abi'],
        'transferMintLimiter',
        TMode
      > & { functionName?: 'transferMintLimiter' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'transferMintLimiter',
        TMode
      > & {
        abi?: never
        functionName?: 'transferMintLimiter'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'transferMintLimiter',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'transferMintLimiter',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"upgrade"`.
 */
export function useIAxelarGatewayUpgrade<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'upgrade'
        >['request']['abi'],
        'upgrade',
        TMode
      > & { functionName?: 'upgrade' }
    : UseContractWriteConfig<typeof iAxelarGatewayABI, 'upgrade', TMode> & {
        abi?: never
        functionName?: 'upgrade'
      } = {} as any,
) {
  return useContractWrite<typeof iAxelarGatewayABI, 'upgrade', TMode>({
    abi: iAxelarGatewayABI,
    functionName: 'upgrade',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"validateContractCall"`.
 */
export function useIAxelarGatewayValidateContractCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'validateContractCall'
        >['request']['abi'],
        'validateContractCall',
        TMode
      > & { functionName?: 'validateContractCall' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'validateContractCall',
        TMode
      > & {
        abi?: never
        functionName?: 'validateContractCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'validateContractCall',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'validateContractCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"validateContractCallAndMint"`.
 */
export function useIAxelarGatewayValidateContractCallAndMint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAxelarGatewayABI,
          'validateContractCallAndMint'
        >['request']['abi'],
        'validateContractCallAndMint',
        TMode
      > & { functionName?: 'validateContractCallAndMint' }
    : UseContractWriteConfig<
        typeof iAxelarGatewayABI,
        'validateContractCallAndMint',
        TMode
      > & {
        abi?: never
        functionName?: 'validateContractCallAndMint'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAxelarGatewayABI,
    'validateContractCallAndMint',
    TMode
  >({
    abi: iAxelarGatewayABI,
    functionName: 'validateContractCallAndMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__.
 */
export function usePrepareIAxelarGatewayWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"callContract"`.
 */
export function usePrepareIAxelarGatewayCallContract(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'callContract'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'callContract',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'callContract'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"callContractWithToken"`.
 */
export function usePrepareIAxelarGatewayCallContractWithToken(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'callContractWithToken'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'callContractWithToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'callContractWithToken'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareIAxelarGatewayExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"sendToken"`.
 */
export function usePrepareIAxelarGatewaySendToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'sendToken'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'sendToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'sendToken'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"setTokenMintLimits"`.
 */
export function usePrepareIAxelarGatewaySetTokenMintLimits(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'setTokenMintLimits'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'setTokenMintLimits',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'setTokenMintLimits'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"setup"`.
 */
export function usePrepareIAxelarGatewaySetup(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'setup'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'setup',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'setup'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"transferGovernance"`.
 */
export function usePrepareIAxelarGatewayTransferGovernance(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'transferGovernance'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'transferGovernance',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'transferGovernance'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"transferMintLimiter"`.
 */
export function usePrepareIAxelarGatewayTransferMintLimiter(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'transferMintLimiter'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'transferMintLimiter',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'transferMintLimiter'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"upgrade"`.
 */
export function usePrepareIAxelarGatewayUpgrade(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'upgrade'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'upgrade',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAxelarGatewayABI, 'upgrade'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"validateContractCall"`.
 */
export function usePrepareIAxelarGatewayValidateContractCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'validateContractCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'validateContractCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'validateContractCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `functionName` set to `"validateContractCallAndMint"`.
 */
export function usePrepareIAxelarGatewayValidateContractCallAndMint(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAxelarGatewayABI,
      'validateContractCallAndMint'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAxelarGatewayABI,
    functionName: 'validateContractCallAndMint',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAxelarGatewayABI,
    'validateContractCallAndMint'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__.
 */
export function useIAxelarGatewayEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"ContractCall"`.
 */
export function useIAxelarGatewayContractCallEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'ContractCall'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'ContractCall',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'ContractCall'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"ContractCallApproved"`.
 */
export function useIAxelarGatewayContractCallApprovedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'ContractCallApproved'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'ContractCallApproved',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'ContractCallApproved'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"ContractCallApprovedWithMint"`.
 */
export function useIAxelarGatewayContractCallApprovedWithMintEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iAxelarGatewayABI,
      'ContractCallApprovedWithMint'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'ContractCallApprovedWithMint',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'ContractCallApprovedWithMint'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"ContractCallWithToken"`.
 */
export function useIAxelarGatewayContractCallWithTokenEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'ContractCallWithToken'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'ContractCallWithToken',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'ContractCallWithToken'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"Executed"`.
 */
export function useIAxelarGatewayExecutedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'Executed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'Executed',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'Executed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"GovernanceTransferred"`.
 */
export function useIAxelarGatewayGovernanceTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'GovernanceTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'GovernanceTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'GovernanceTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"MintLimiterTransferred"`.
 */
export function useIAxelarGatewayMintLimiterTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'MintLimiterTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'MintLimiterTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'MintLimiterTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"OperatorshipTransferred"`.
 */
export function useIAxelarGatewayOperatorshipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'OperatorshipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'OperatorshipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'OperatorshipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"TokenDeployed"`.
 */
export function useIAxelarGatewayTokenDeployedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'TokenDeployed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'TokenDeployed',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'TokenDeployed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"TokenMintLimitUpdated"`.
 */
export function useIAxelarGatewayTokenMintLimitUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'TokenMintLimitUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'TokenMintLimitUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof iAxelarGatewayABI,
    'TokenMintLimitUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"TokenSent"`.
 */
export function useIAxelarGatewayTokenSentEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'TokenSent'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'TokenSent',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'TokenSent'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iAxelarGatewayABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useIAxelarGatewayUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof iAxelarGatewayABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iAxelarGatewayABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof iAxelarGatewayABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iContractIdentifierABI}__.
 */
export function useIContractIdentifierRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof iContractIdentifierABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iContractIdentifierABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iContractIdentifierABI,
    ...config,
  } as UseContractReadConfig<
    typeof iContractIdentifierABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iContractIdentifierABI}__ and `functionName` set to `"contractId"`.
 */
export function useIContractIdentifierContractId<
  TFunctionName extends 'contractId',
  TSelectData = ReadContractResult<
    typeof iContractIdentifierABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iContractIdentifierABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iContractIdentifierABI,
    functionName: 'contractId',
    ...config,
  } as UseContractReadConfig<
    typeof iContractIdentifierABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iGovernableABI}__.
 */
export function useIGovernableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iGovernableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iGovernableABI,
    ...config,
  } as UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"governance"`.
 */
export function useIGovernableGovernance<
  TFunctionName extends 'governance',
  TSelectData = ReadContractResult<typeof iGovernableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iGovernableABI,
    functionName: 'governance',
    ...config,
  } as UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"mintLimiter"`.
 */
export function useIGovernableMintLimiter<
  TFunctionName extends 'mintLimiter',
  TSelectData = ReadContractResult<typeof iGovernableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iGovernableABI,
    functionName: 'mintLimiter',
    ...config,
  } as UseContractReadConfig<typeof iGovernableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iGovernableABI}__.
 */
export function useIGovernableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iGovernableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iGovernableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iGovernableABI, TFunctionName, TMode>({
    abi: iGovernableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"transferGovernance"`.
 */
export function useIGovernableTransferGovernance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iGovernableABI,
          'transferGovernance'
        >['request']['abi'],
        'transferGovernance',
        TMode
      > & { functionName?: 'transferGovernance' }
    : UseContractWriteConfig<
        typeof iGovernableABI,
        'transferGovernance',
        TMode
      > & {
        abi?: never
        functionName?: 'transferGovernance'
      } = {} as any,
) {
  return useContractWrite<typeof iGovernableABI, 'transferGovernance', TMode>({
    abi: iGovernableABI,
    functionName: 'transferGovernance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"transferMintLimiter"`.
 */
export function useIGovernableTransferMintLimiter<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iGovernableABI,
          'transferMintLimiter'
        >['request']['abi'],
        'transferMintLimiter',
        TMode
      > & { functionName?: 'transferMintLimiter' }
    : UseContractWriteConfig<
        typeof iGovernableABI,
        'transferMintLimiter',
        TMode
      > & {
        abi?: never
        functionName?: 'transferMintLimiter'
      } = {} as any,
) {
  return useContractWrite<typeof iGovernableABI, 'transferMintLimiter', TMode>({
    abi: iGovernableABI,
    functionName: 'transferMintLimiter',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iGovernableABI}__.
 */
export function usePrepareIGovernableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iGovernableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iGovernableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iGovernableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"transferGovernance"`.
 */
export function usePrepareIGovernableTransferGovernance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iGovernableABI, 'transferGovernance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iGovernableABI,
    functionName: 'transferGovernance',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iGovernableABI,
    'transferGovernance'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iGovernableABI}__ and `functionName` set to `"transferMintLimiter"`.
 */
export function usePrepareIGovernableTransferMintLimiter(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iGovernableABI, 'transferMintLimiter'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iGovernableABI,
    functionName: 'transferMintLimiter',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iGovernableABI,
    'transferMintLimiter'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iGovernableABI}__.
 */
export function useIGovernableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iGovernableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iGovernableABI,
    ...config,
  } as UseContractEventConfig<typeof iGovernableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iGovernableABI}__ and `eventName` set to `"GovernanceTransferred"`.
 */
export function useIGovernableGovernanceTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iGovernableABI, 'GovernanceTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iGovernableABI,
    eventName: 'GovernanceTransferred',
    ...config,
  } as UseContractEventConfig<typeof iGovernableABI, 'GovernanceTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iGovernableABI}__ and `eventName` set to `"MintLimiterTransferred"`.
 */
export function useIGovernableMintLimiterTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iGovernableABI, 'MintLimiterTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iGovernableABI,
    eventName: 'MintLimiterTransferred',
    ...config,
  } as UseContractEventConfig<typeof iGovernableABI, 'MintLimiterTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iOwnableABI}__.
 */
export function useIOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iOwnableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iOwnableABI,
    ...config,
  } as UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"owner"`.
 */
export function useIOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof iOwnableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iOwnableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useIOwnablePendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof iOwnableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iOwnableABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<typeof iOwnableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iOwnableABI}__.
 */
export function useIOwnableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iOwnableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iOwnableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iOwnableABI, TFunctionName, TMode>({
    abi: iOwnableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useIOwnableAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iOwnableABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<typeof iOwnableABI, 'acceptOwnership', TMode> & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iOwnableABI, 'acceptOwnership', TMode>({
    abi: iOwnableABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function useIOwnableProposeOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iOwnableABI,
          'proposeOwnership'
        >['request']['abi'],
        'proposeOwnership',
        TMode
      > & { functionName?: 'proposeOwnership' }
    : UseContractWriteConfig<typeof iOwnableABI, 'proposeOwnership', TMode> & {
        abi?: never
        functionName?: 'proposeOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iOwnableABI, 'proposeOwnership', TMode>({
    abi: iOwnableABI,
    functionName: 'proposeOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useIOwnableTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iOwnableABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof iOwnableABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iOwnableABI, 'transferOwnership', TMode>({
    abi: iOwnableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iOwnableABI}__.
 */
export function usePrepareIOwnableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iOwnableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iOwnableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iOwnableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareIOwnableAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iOwnableABI, 'acceptOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iOwnableABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iOwnableABI, 'acceptOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function usePrepareIOwnableProposeOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iOwnableABI, 'proposeOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iOwnableABI,
    functionName: 'proposeOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iOwnableABI, 'proposeOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iOwnableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareIOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iOwnableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iOwnableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iOwnableABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iOwnableABI}__.
 */
export function useIOwnableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iOwnableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iOwnableABI,
    ...config,
  } as UseContractEventConfig<typeof iOwnableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iOwnableABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useIOwnableOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<typeof iOwnableABI, 'OwnershipTransferStarted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iOwnableABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<typeof iOwnableABI, 'OwnershipTransferStarted'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iOwnableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useIOwnableOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iOwnableABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iOwnableABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof iOwnableABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iUpgradableABI}__.
 */
export function useIUpgradableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iUpgradableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iUpgradableABI,
    ...config,
  } as UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"contractId"`.
 */
export function useIUpgradableContractId<
  TFunctionName extends 'contractId',
  TSelectData = ReadContractResult<typeof iUpgradableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iUpgradableABI,
    functionName: 'contractId',
    ...config,
  } as UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"implementation"`.
 */
export function useIUpgradableImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof iUpgradableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iUpgradableABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"owner"`.
 */
export function useIUpgradableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof iUpgradableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iUpgradableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useIUpgradablePendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof iUpgradableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iUpgradableABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<typeof iUpgradableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__.
 */
export function useIUpgradableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iUpgradableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, TFunctionName, TMode>({
    abi: iUpgradableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useIUpgradableAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<
        typeof iUpgradableABI,
        'acceptOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, 'acceptOwnership', TMode>({
    abi: iUpgradableABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function useIUpgradableProposeOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          'proposeOwnership'
        >['request']['abi'],
        'proposeOwnership',
        TMode
      > & { functionName?: 'proposeOwnership' }
    : UseContractWriteConfig<
        typeof iUpgradableABI,
        'proposeOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'proposeOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, 'proposeOwnership', TMode>({
    abi: iUpgradableABI,
    functionName: 'proposeOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"setup"`.
 */
export function useIUpgradableSetup<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          'setup'
        >['request']['abi'],
        'setup',
        TMode
      > & { functionName?: 'setup' }
    : UseContractWriteConfig<typeof iUpgradableABI, 'setup', TMode> & {
        abi?: never
        functionName?: 'setup'
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, 'setup', TMode>({
    abi: iUpgradableABI,
    functionName: 'setup',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useIUpgradableTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof iUpgradableABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, 'transferOwnership', TMode>({
    abi: iUpgradableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"upgrade"`.
 */
export function useIUpgradableUpgrade<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iUpgradableABI,
          'upgrade'
        >['request']['abi'],
        'upgrade',
        TMode
      > & { functionName?: 'upgrade' }
    : UseContractWriteConfig<typeof iUpgradableABI, 'upgrade', TMode> & {
        abi?: never
        functionName?: 'upgrade'
      } = {} as any,
) {
  return useContractWrite<typeof iUpgradableABI, 'upgrade', TMode>({
    abi: iUpgradableABI,
    functionName: 'upgrade',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__.
 */
export function usePrepareIUpgradableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUpgradableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareIUpgradableAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, 'acceptOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUpgradableABI, 'acceptOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"proposeOwnership"`.
 */
export function usePrepareIUpgradableProposeOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, 'proposeOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    functionName: 'proposeOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUpgradableABI, 'proposeOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"setup"`.
 */
export function usePrepareIUpgradableSetup(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, 'setup'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    functionName: 'setup',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUpgradableABI, 'setup'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareIUpgradableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iUpgradableABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUpgradableABI}__ and `functionName` set to `"upgrade"`.
 */
export function usePrepareIUpgradableUpgrade(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUpgradableABI, 'upgrade'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUpgradableABI,
    functionName: 'upgrade',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUpgradableABI, 'upgrade'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iUpgradableABI}__.
 */
export function useIUpgradableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iUpgradableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iUpgradableABI,
    ...config,
  } as UseContractEventConfig<typeof iUpgradableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iUpgradableABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useIUpgradableOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<typeof iUpgradableABI, 'OwnershipTransferStarted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iUpgradableABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<
    typeof iUpgradableABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iUpgradableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useIUpgradableOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof iUpgradableABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iUpgradableABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof iUpgradableABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iUpgradableABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useIUpgradableUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof iUpgradableABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iUpgradableABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof iUpgradableABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockAxelarGasServiceABI}__.
 */
export function useMockAxelarGasServiceWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mockAxelarGasServiceABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof mockAxelarGasServiceABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof mockAxelarGasServiceABI, TFunctionName, TMode>(
    { abi: mockAxelarGasServiceABI, ...config } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCall"`.
 */
export function useMockAxelarGasServicePayNativeGasForContractCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof mockAxelarGasServiceABI,
          'payNativeGasForContractCall'
        >['request']['abi'],
        'payNativeGasForContractCall',
        TMode
      > & { functionName?: 'payNativeGasForContractCall' }
    : UseContractWriteConfig<
        typeof mockAxelarGasServiceABI,
        'payNativeGasForContractCall',
        TMode
      > & {
        abi?: never
        functionName?: 'payNativeGasForContractCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof mockAxelarGasServiceABI,
    'payNativeGasForContractCall',
    TMode
  >({
    abi: mockAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockAxelarGasServiceABI}__.
 */
export function usePrepareMockAxelarGasServiceWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof mockAxelarGasServiceABI,
      TFunctionName
    >,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockAxelarGasServiceABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof mockAxelarGasServiceABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockAxelarGasServiceABI}__ and `functionName` set to `"payNativeGasForContractCall"`.
 */
export function usePrepareMockAxelarGasServicePayNativeGasForContractCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof mockAxelarGasServiceABI,
      'payNativeGasForContractCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockAxelarGasServiceABI,
    functionName: 'payNativeGasForContractCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof mockAxelarGasServiceABI,
    'payNativeGasForContractCall'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockAxelarGatewayABI}__.
 */
export function useMockAxelarGatewayRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof mockAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof mockAxelarGatewayABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: mockAxelarGatewayABI,
    ...config,
  } as UseContractReadConfig<
    typeof mockAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockAxelarGatewayABI}__ and `functionName` set to `"validateContractCall"`.
 */
export function useMockAxelarGatewayValidateContractCall<
  TFunctionName extends 'validateContractCall',
  TSelectData = ReadContractResult<typeof mockAxelarGatewayABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof mockAxelarGatewayABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: mockAxelarGatewayABI,
    functionName: 'validateContractCall',
    ...config,
  } as UseContractReadConfig<
    typeof mockAxelarGatewayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCreate2FactoryABI}__.
 */
export function useSafeCreate2FactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof safeCreate2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCreate2FactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCreate2FactoryABI,
    ...config,
  } as UseContractReadConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"bridgeRoot"`.
 */
export function useSafeCreate2FactoryBridgeRoot<
  TFunctionName extends 'bridgeRoot',
  TSelectData = ReadContractResult<typeof safeCreate2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCreate2FactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCreate2FactoryABI,
    functionName: 'bridgeRoot',
    ...config,
  } as UseContractReadConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"gasService"`.
 */
export function useSafeCreate2FactoryGasService<
  TFunctionName extends 'gasService',
  TSelectData = ReadContractResult<typeof safeCreate2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCreate2FactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCreate2FactoryABI,
    functionName: 'gasService',
    ...config,
  } as UseContractReadConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"gateway"`.
 */
export function useSafeCreate2FactoryGateway<
  TFunctionName extends 'gateway',
  TSelectData = ReadContractResult<typeof safeCreate2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCreate2FactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCreate2FactoryABI,
    functionName: 'gateway',
    ...config,
  } as UseContractReadConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"getContractHash"`.
 */
export function useSafeCreate2FactoryGetContractHash<
  TFunctionName extends 'getContractHash',
  TSelectData = ReadContractResult<typeof safeCreate2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCreate2FactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCreate2FactoryABI,
    functionName: 'getContractHash',
    ...config,
  } as UseContractReadConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__.
 */
export function useSafeCreate2FactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof safeCreate2FactoryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof safeCreate2FactoryABI, TFunctionName, TMode>({
    abi: safeCreate2FactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"create"`.
 */
export function useSafeCreate2FactoryCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          'create'
        >['request']['abi'],
        'create',
        TMode
      > & { functionName?: 'create' }
    : UseContractWriteConfig<typeof safeCreate2FactoryABI, 'create', TMode> & {
        abi?: never
        functionName?: 'create'
      } = {} as any,
) {
  return useContractWrite<typeof safeCreate2FactoryABI, 'create', TMode>({
    abi: safeCreate2FactoryABI,
    functionName: 'create',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"enableBridge"`.
 */
export function useSafeCreate2FactoryEnableBridge<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          'enableBridge'
        >['request']['abi'],
        'enableBridge',
        TMode
      > & { functionName?: 'enableBridge' }
    : UseContractWriteConfig<
        typeof safeCreate2FactoryABI,
        'enableBridge',
        TMode
      > & {
        abi?: never
        functionName?: 'enableBridge'
      } = {} as any,
) {
  return useContractWrite<typeof safeCreate2FactoryABI, 'enableBridge', TMode>({
    abi: safeCreate2FactoryABI,
    functionName: 'enableBridge',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"execute"`.
 */
export function useSafeCreate2FactoryExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof safeCreate2FactoryABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof safeCreate2FactoryABI, 'execute', TMode>({
    abi: safeCreate2FactoryABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"setContractHash"`.
 */
export function useSafeCreate2FactorySetContractHash<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          'setContractHash'
        >['request']['abi'],
        'setContractHash',
        TMode
      > & { functionName?: 'setContractHash' }
    : UseContractWriteConfig<
        typeof safeCreate2FactoryABI,
        'setContractHash',
        TMode
      > & {
        abi?: never
        functionName?: 'setContractHash'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCreate2FactoryABI,
    'setContractHash',
    TMode
  >({
    abi: safeCreate2FactoryABI,
    functionName: 'setContractHash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"setRemoteContractHash"`.
 */
export function useSafeCreate2FactorySetRemoteContractHash<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCreate2FactoryABI,
          'setRemoteContractHash'
        >['request']['abi'],
        'setRemoteContractHash',
        TMode
      > & { functionName?: 'setRemoteContractHash' }
    : UseContractWriteConfig<
        typeof safeCreate2FactoryABI,
        'setRemoteContractHash',
        TMode
      > & {
        abi?: never
        functionName?: 'setRemoteContractHash'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCreate2FactoryABI,
    'setRemoteContractHash',
    TMode
  >({
    abi: safeCreate2FactoryABI,
    functionName: 'setRemoteContractHash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__.
 */
export function usePrepareSafeCreate2FactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCreate2FactoryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"create"`.
 */
export function usePrepareSafeCreate2FactoryCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, 'create'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    functionName: 'create',
    ...config,
  } as UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, 'create'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"enableBridge"`.
 */
export function usePrepareSafeCreate2FactoryEnableBridge(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, 'enableBridge'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    functionName: 'enableBridge',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCreate2FactoryABI,
    'enableBridge'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareSafeCreate2FactoryExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof safeCreate2FactoryABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"setContractHash"`.
 */
export function usePrepareSafeCreate2FactorySetContractHash(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCreate2FactoryABI,
      'setContractHash'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    functionName: 'setContractHash',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCreate2FactoryABI,
    'setContractHash'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `functionName` set to `"setRemoteContractHash"`.
 */
export function usePrepareSafeCreate2FactorySetRemoteContractHash(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCreate2FactoryABI,
      'setRemoteContractHash'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCreate2FactoryABI,
    functionName: 'setRemoteContractHash',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCreate2FactoryABI,
    'setRemoteContractHash'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link safeCreate2FactoryABI}__.
 */
export function useSafeCreate2FactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof safeCreate2FactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: safeCreate2FactoryABI,
    ...config,
  } as UseContractEventConfig<typeof safeCreate2FactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link safeCreate2FactoryABI}__ and `eventName` set to `"ContractCreated"`.
 */
export function useSafeCreate2FactoryContractCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof safeCreate2FactoryABI, 'ContractCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: safeCreate2FactoryABI,
    eventName: 'ContractCreated',
    ...config,
  } as UseContractEventConfig<typeof safeCreate2FactoryABI, 'ContractCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainFactoryABI}__.
 */
export function useSafeCrossChainFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainFactoryABI,
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"bridgeRoot"`.
 */
export function useSafeCrossChainFactoryBridgeRoot<
  TFunctionName extends 'bridgeRoot',
  TSelectData = ReadContractResult<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainFactoryABI,
    functionName: 'bridgeRoot',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"gasService"`.
 */
export function useSafeCrossChainFactoryGasService<
  TFunctionName extends 'gasService',
  TSelectData = ReadContractResult<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainFactoryABI,
    functionName: 'gasService',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"gateway"`.
 */
export function useSafeCrossChainFactoryGateway<
  TFunctionName extends 'gateway',
  TSelectData = ReadContractResult<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainFactoryABI,
    functionName: 'gateway',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"getContractHash"`.
 */
export function useSafeCrossChainFactoryGetContractHash<
  TFunctionName extends 'getContractHash',
  TSelectData = ReadContractResult<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainFactoryABI,
    functionName: 'getContractHash',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__.
 */
export function useSafeCrossChainFactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainFactoryABI,
    TFunctionName,
    TMode
  >({ abi: safeCrossChainFactoryABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"create"`.
 */
export function useSafeCrossChainFactoryCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          'create'
        >['request']['abi'],
        'create',
        TMode
      > & { functionName?: 'create' }
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        'create',
        TMode
      > & {
        abi?: never
        functionName?: 'create'
      } = {} as any,
) {
  return useContractWrite<typeof safeCrossChainFactoryABI, 'create', TMode>({
    abi: safeCrossChainFactoryABI,
    functionName: 'create',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"enableBridge"`.
 */
export function useSafeCrossChainFactoryEnableBridge<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          'enableBridge'
        >['request']['abi'],
        'enableBridge',
        TMode
      > & { functionName?: 'enableBridge' }
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        'enableBridge',
        TMode
      > & {
        abi?: never
        functionName?: 'enableBridge'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainFactoryABI,
    'enableBridge',
    TMode
  >({
    abi: safeCrossChainFactoryABI,
    functionName: 'enableBridge',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"execute"`.
 */
export function useSafeCrossChainFactoryExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        'execute',
        TMode
      > & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof safeCrossChainFactoryABI, 'execute', TMode>({
    abi: safeCrossChainFactoryABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"setContractHash"`.
 */
export function useSafeCrossChainFactorySetContractHash<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          'setContractHash'
        >['request']['abi'],
        'setContractHash',
        TMode
      > & { functionName?: 'setContractHash' }
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        'setContractHash',
        TMode
      > & {
        abi?: never
        functionName?: 'setContractHash'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainFactoryABI,
    'setContractHash',
    TMode
  >({
    abi: safeCrossChainFactoryABI,
    functionName: 'setContractHash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"setRemoteContractHash"`.
 */
export function useSafeCrossChainFactorySetRemoteContractHash<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainFactoryABI,
          'setRemoteContractHash'
        >['request']['abi'],
        'setRemoteContractHash',
        TMode
      > & { functionName?: 'setRemoteContractHash' }
    : UseContractWriteConfig<
        typeof safeCrossChainFactoryABI,
        'setRemoteContractHash',
        TMode
      > & {
        abi?: never
        functionName?: 'setRemoteContractHash'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainFactoryABI,
    'setRemoteContractHash',
    TMode
  >({
    abi: safeCrossChainFactoryABI,
    functionName: 'setRemoteContractHash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__.
 */
export function usePrepareSafeCrossChainFactoryWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainFactoryABI,
      TFunctionName
    >,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainFactoryABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"create"`.
 */
export function usePrepareSafeCrossChainFactoryCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCrossChainFactoryABI, 'create'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    functionName: 'create',
    ...config,
  } as UsePrepareContractWriteConfig<typeof safeCrossChainFactoryABI, 'create'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"enableBridge"`.
 */
export function usePrepareSafeCrossChainFactoryEnableBridge(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainFactoryABI,
      'enableBridge'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    functionName: 'enableBridge',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainFactoryABI,
    'enableBridge'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareSafeCrossChainFactoryExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCrossChainFactoryABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainFactoryABI,
    'execute'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"setContractHash"`.
 */
export function usePrepareSafeCrossChainFactorySetContractHash(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainFactoryABI,
      'setContractHash'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    functionName: 'setContractHash',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainFactoryABI,
    'setContractHash'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `functionName` set to `"setRemoteContractHash"`.
 */
export function usePrepareSafeCrossChainFactorySetRemoteContractHash(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainFactoryABI,
      'setRemoteContractHash'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainFactoryABI,
    functionName: 'setRemoteContractHash',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainFactoryABI,
    'setRemoteContractHash'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link safeCrossChainFactoryABI}__.
 */
export function useSafeCrossChainFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof safeCrossChainFactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: safeCrossChainFactoryABI,
    ...config,
  } as UseContractEventConfig<typeof safeCrossChainFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link safeCrossChainFactoryABI}__ and `eventName` set to `"ContractCreated"`.
 */
export function useSafeCrossChainFactoryContractCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof safeCrossChainFactoryABI, 'ContractCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: safeCrossChainFactoryABI,
    eventName: 'ContractCreated',
    ...config,
  } as UseContractEventConfig<
    typeof safeCrossChainFactoryABI,
    'ContractCreated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainOwnableABI}__.
 */
export function useSafeCrossChainOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainOwnableABI,
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"bridgeRoot"`.
 */
export function useSafeCrossChainOwnableBridgeRoot<
  TFunctionName extends 'bridgeRoot',
  TSelectData = ReadContractResult<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainOwnableABI,
    functionName: 'bridgeRoot',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"gasService"`.
 */
export function useSafeCrossChainOwnableGasService<
  TFunctionName extends 'gasService',
  TSelectData = ReadContractResult<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainOwnableABI,
    functionName: 'gasService',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"gateway"`.
 */
export function useSafeCrossChainOwnableGateway<
  TFunctionName extends 'gateway',
  TSelectData = ReadContractResult<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainOwnableABI,
    functionName: 'gateway',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"owner"`.
 */
export function useSafeCrossChainOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: safeCrossChainOwnableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__.
 */
export function useSafeCrossChainOwnableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainOwnableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof safeCrossChainOwnableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainOwnableABI,
    TFunctionName,
    TMode
  >({ abi: safeCrossChainOwnableABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"enableBridge"`.
 */
export function useSafeCrossChainOwnableEnableBridge<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainOwnableABI,
          'enableBridge'
        >['request']['abi'],
        'enableBridge',
        TMode
      > & { functionName?: 'enableBridge' }
    : UseContractWriteConfig<
        typeof safeCrossChainOwnableABI,
        'enableBridge',
        TMode
      > & {
        abi?: never
        functionName?: 'enableBridge'
      } = {} as any,
) {
  return useContractWrite<
    typeof safeCrossChainOwnableABI,
    'enableBridge',
    TMode
  >({
    abi: safeCrossChainOwnableABI,
    functionName: 'enableBridge',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"execute"`.
 */
export function useSafeCrossChainOwnableExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof safeCrossChainOwnableABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<
        typeof safeCrossChainOwnableABI,
        'execute',
        TMode
      > & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof safeCrossChainOwnableABI, 'execute', TMode>({
    abi: safeCrossChainOwnableABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__.
 */
export function usePrepareSafeCrossChainOwnableWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainOwnableABI,
      TFunctionName
    >,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainOwnableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainOwnableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"enableBridge"`.
 */
export function usePrepareSafeCrossChainOwnableEnableBridge(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof safeCrossChainOwnableABI,
      'enableBridge'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainOwnableABI,
    functionName: 'enableBridge',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainOwnableABI,
    'enableBridge'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCrossChainOwnableABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareSafeCrossChainOwnableExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCrossChainOwnableABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCrossChainOwnableABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof safeCrossChainOwnableABI,
    'execute'
  >)
}
