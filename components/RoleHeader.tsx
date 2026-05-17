interface Props {
  role: string
  clock?: string
  connected?: boolean | null
  right?: React.ReactNode
}

export default function RoleHeader({ role, clock, connected, right }: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#1c1c1a]">
      <div className="flex items-center gap-4">
        <a href="/invest-lagos-3.0/" className="text-zinc-600 hover:text-zinc-400 font-mono text-sm transition-colors">←</a>
        <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">{role}</span>
        {connected === false && (
          <span className="text-[10px] tracking-widest uppercase font-mono text-red-500 animate-pulse">● offline</span>
        )}
      </div>
      {right ?? (clock !== undefined && (
        <div className="font-mono text-zinc-500 text-sm tracking-widest">{clock}</div>
      ))}
    </div>
  )
}
