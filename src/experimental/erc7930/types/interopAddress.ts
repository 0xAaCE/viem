export interface InteropAddress {
  version: string //* 2 bytes hex representation of the version
  chainType: string //* 2 bytes hex representation of the chain type
  chainReference: string //* n length hex representation of the chain reference
  address: string //* n length hex representation of the address
}
