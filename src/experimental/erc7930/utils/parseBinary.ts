import { fromBytes } from '../../../index.js'

import type { InteropAddress } from '../types/interopAddress.js'

const parseVersion = (binaryAddress: Uint8Array): string => {
  const VERSION_OFFSET = 0
  const VERSION_LENGTH = 2

  const version = binaryAddress.slice(
    VERSION_OFFSET,
    VERSION_OFFSET + VERSION_LENGTH,
  )

  return fromBytes(version, 'hex')
}

const parseChainType = (binaryAddress: Uint8Array): string => {
  const CHAIN_TYPE_OFFSET = 2
  const CHAIN_TYPE_LENGTH = 2

  const chainType = binaryAddress.slice(
    CHAIN_TYPE_OFFSET,
    CHAIN_TYPE_OFFSET + CHAIN_TYPE_LENGTH,
  )

  return fromBytes(chainType, 'hex')
}

const parseChainReferenceLength = (binaryAddress: Uint8Array): number => {
  const CHAIN_REFERENCE_LENGTH_OFFSET = 4
  const CHAIN_REFERENCE_LENGTH_LENGTH = 1

  const chainReferenceLength = binaryAddress.slice(
    CHAIN_REFERENCE_LENGTH_OFFSET,
    CHAIN_REFERENCE_LENGTH_OFFSET + CHAIN_REFERENCE_LENGTH_LENGTH,
  )

  return Number.parseInt(fromBytes(chainReferenceLength, 'hex'), 16)
}

const parseChainReference = (binaryAddress: Uint8Array): string => {
  const CHAIN_REFERENCE_OFFSET = 5
  const CHAIN_REFERENCE_LENGTH = parseChainReferenceLength(binaryAddress)

  const chainReference = binaryAddress.slice(
    CHAIN_REFERENCE_OFFSET,
    CHAIN_REFERENCE_OFFSET + CHAIN_REFERENCE_LENGTH,
  )

  return fromBytes(chainReference, 'hex')
}

const parseAddressLength = (binaryAddress: Uint8Array): number => {
  const ADDRESS_LENGTH_OFFSET = 5 + parseChainReferenceLength(binaryAddress)
  const ADDRESS_LENGTH_LENGTH = 1

  const addressLength = binaryAddress.slice(
    ADDRESS_LENGTH_OFFSET,
    ADDRESS_LENGTH_OFFSET + ADDRESS_LENGTH_LENGTH,
  )

  return Number.parseInt(fromBytes(addressLength, 'hex'), 16)
}

const parseAddress = (binaryAddress: Uint8Array): string => {
  const ADDRESS_OFFSET = 6 + parseChainReferenceLength(binaryAddress)
  const ADDRESS_LENGTH = parseAddressLength(binaryAddress)

  const address = binaryAddress.slice(
    ADDRESS_OFFSET,
    ADDRESS_OFFSET + ADDRESS_LENGTH,
  )

  return fromBytes(address, 'hex')
}

export const parseBinary = (binaryAddress: Uint8Array): InteropAddress => {
  const version = parseVersion(binaryAddress)
  const chainType = parseChainType(binaryAddress)
  const chainReference = parseChainReference(binaryAddress)
  const address = parseAddress(binaryAddress)

  return {
    version,
    chainType,
    chainReference,
    address,
  }
}
