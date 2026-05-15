interface Props { text: string; active: boolean }

export default function FlashBanner({ text, active }: Props) {
  if (!active || !text) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-amber-500 text-black z-50 px-5 py-3">
      <div className="flex items-center justify-between">
        <span className="font-mono font-bold text-sm">{text}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">from Programme Manager</span>
      </div>
    </div>
  )
}
