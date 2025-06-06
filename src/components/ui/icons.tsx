import {
    Lock,
    Unlock,
    CheckCircle,
    XCircle,
    Zap,
    Download,
    Search,
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Github,
    Twitter,
    Copy,
    Loader2,
    Box,
    Activity,
    TrendingUp,
    Shield,
    Sun,
    Moon
} from "lucide-react"

export const Icons = {
  lock: Lock,
  unlock: Unlock,
  verified: CheckCircle,
  unverified: XCircle,
  lightning: Zap,
  download: Download,
  search: Search,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  externalLink: ExternalLink,
  github: Github,
  twitter: Twitter,
  copy: Copy,
  spinner: Loader2,
  cube: Box,
  activity: Activity,
  trendingUp: TrendingUp,
  shield: Shield,
  sun: Sun,
  moon: Moon,
} as const

export type IconKeys = keyof typeof Icons 