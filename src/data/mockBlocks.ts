export interface MockBlock {
  height: number;
  hash: string;
  prevHash: string;
  timestamp: number;
  txCount: number;
  totalFees: number;
  verified: boolean;
  txids: string[];
}

export const mockBlocks: MockBlock[] = [
  {
    height: 870000,
    hash: "00000000000000000002a23d6df20eecec15b21d32c75833cce28f42c4f3870a",
    prevHash:
      "00000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e",
    timestamp: Date.now() - 600000, // 10 minutes ago
    txCount: 2341,
    totalFees: 12500000, // 0.125 BTC in satoshis
    verified: true,
    txids: [
      "a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd",
      "b2c3d4e5f67890123456789012345678901234567890123456789012345abcde",
      "c3d4e5f678901234567890123456789012345678901234567890123456789abcde",
    ],
  },
  {
    height: 869999,
    hash: "00000000000000000002b5d213c78cc70c4b5a446c8d5e1f2c8d8f3a4b5c6d7e",
    prevHash:
      "00000000000000000001a2b3c4d5e6f7890123456789012345678901234567ab",
    timestamp: Date.now() - 1200000, // 20 minutes ago
    txCount: 1987,
    totalFees: 8750000, // 0.0875 BTC
    verified: true,
    txids: [
      "d4e5f67890123456789012345678901234567890123456789012345678abcdef",
      "e5f6789012345678901234567890123456789012345678901234567890abcdef",
      "f6789012345678901234567890123456789012345678901234567890123456ab",
    ],
  },
  {
    height: 869998,
    hash: "00000000000000000001a2b3c4d5e6f7890123456789012345678901234567ab",
    prevHash:
      "000000000000000000019a8b7c6d5e4f3210987654321098765432109876543a",
    timestamp: Date.now() - 1800000, // 30 minutes ago
    txCount: 2156,
    totalFees: 15200000, // 0.152 BTC
    verified: true,
    txids: [
      "7890123456789012345678901234567890123456789012345678901234abcdef",
      "8901234567890123456789012345678901234567890123456789012345abcdef",
      "9012345678901234567890123456789012345678901234567890123456abcdef",
    ],
  },
  {
    height: 869997,
    hash: "000000000000000000019a8b7c6d5e4f3210987654321098765432109876543a",
    prevHash: "00000000000000000001876543210987654321098765432109876543210987",
    timestamp: Date.now() - 2400000, // 40 minutes ago
    txCount: 1743,
    totalFees: 6800000, // 0.068 BTC
    verified: true,
    txids: [
      "0123456789012345678901234567890123456789012345678901234567abcdef",
      "1234567890123456789012345678901234567890123456789012345678abcdef",
      "2345678901234567890123456789012345678901234567890123456789abcdef",
    ],
  },
  {
    height: 869996,
    hash: "00000000000000000001876543210987654321098765432109876543210987",
    prevHash: "000000000000000000017654321098765432109876543210987654321098ab",
    timestamp: Date.now() - 3000000, // 50 minutes ago
    txCount: 2089,
    totalFees: 11300000, // 0.113 BTC
    verified: true,
    txids: [
      "3456789012345678901234567890123456789012345678901234567890abcdef",
      "4567890123456789012345678901234567890123456789012345678901abcdef",
      "5678901234567890123456789012345678901234567890123456789012abcdef",
    ],
  },
];

// Create a map for quick transaction lookup
export const txidToBlockMap = new Map<string, number>();
mockBlocks.forEach((block) => {
  block.txids.forEach((txid) => {
    txidToBlockMap.set(txid, block.height);
  });
});

// Create a map for quick block hash lookup
export const hashToBlockMap = new Map<string, MockBlock>();
mockBlocks.forEach((block) => {
  hashToBlockMap.set(block.hash, block);
});
