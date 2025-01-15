import type { ContainerClient } from '@azure/storage-blob'

import { BlobServiceClient } from '@azure/storage-blob'

import type { AzureStorageOptions } from '../index.js'

let storageClient: ContainerClient | null = null

export function getStorageClient(
  options: Pick<AzureStorageOptions, 'baseURL' | 'connection' | 'containerName'>,
): ContainerClient {
  if (storageClient) {
    return storageClient
  }
  const { baseURL, connection, containerName } = options
  let blobServiceClient: BlobServiceClient | undefined = undefined
  if (typeof connection === 'string') {
    blobServiceClient = BlobServiceClient.fromConnectionString(connection)
  } else if (typeof connection === 'object') {
    blobServiceClient = new BlobServiceClient(baseURL, connection, {})
  }
  if (!blobServiceClient) {
    throw new Error('connectionString or credential must be provided')
  }
  storageClient = blobServiceClient.getContainerClient(containerName)
  return storageClient
}
