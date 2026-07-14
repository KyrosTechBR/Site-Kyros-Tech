export function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-14rem] h-[44rem] w-[58rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-[-16rem] top-24 h-[42rem] w-[42rem] rounded-full bg-blue-600/12 blur-3xl" />
      <div className="absolute left-[-18rem] top-[36rem] h-[44rem] w-[44rem] rounded-full bg-cyan-500/7 blur-3xl" />
      <div className="grid-mask absolute inset-x-0 top-0 h-[62rem] opacity-55" />
    </div>
  );
}
