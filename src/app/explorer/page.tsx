import Link from "next/link"
import { mockBlocks } from "@/data/mockBlocks"
import { truncateHash, formatTimeAgo, formatBTC } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

export default function ExplorerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Bitcoin Block Explorer</h1>
        <p className="text-text-secondary text-lg">
          Recent Bitcoin blocks verified with STARK proofs
        </p>
      </div>
      
      <div className="bg-surface rounded-xl border border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Height</TableHead>
              <TableHead>Block Hash</TableHead>
              <TableHead className="hidden md:table-cell">Transactions</TableHead>
              <TableHead className="hidden lg:table-cell">Fees</TableHead>
              <TableHead className="hidden sm:table-cell">Time</TableHead>
              <TableHead className="w-20">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBlocks.map((block) => (
              <TableRow key={block.height} className="cursor-pointer">
                <TableCell>
                  <Link 
                    href={`/block/${block.height}`}
                    className="font-mono text-bitcoin font-semibold hover:text-bitcoin-dark transition-colors"
                  >
                    #{block.height.toLocaleString()}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/block/${block.height}`}
                    className="font-mono text-sm hover:text-bitcoin transition-colors group"
                  >
                    <span className="group-hover:animate-hash-flicker">
                      {truncateHash(block.hash, 8, 8)}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {block.txCount.toLocaleString()}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-text-secondary">
                  {formatBTC(block.totalFees)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-text-secondary">
                  {formatTimeAgo(block.timestamp)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {block.verified ? (
                      <Icons.lock 
                        className="h-5 w-5 text-success" 
                        aria-label="Verified by STARK proof"
                      />
                    ) : (
                      <Icons.unlock 
                        className="h-5 w-5 text-danger" 
                        aria-label="Not verified"
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-text-secondary">
          Showing the latest {mockBlocks.length} blocks with STARK proof verification
        </p>
      </div>
    </div>
  )
} 