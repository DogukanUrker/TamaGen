export default function OGPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black select-none">
      <div className="w-[1200px] h-[630px] bg-zinc-950 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(39,39,42)_2px,_transparent_0)] bg-[size:40px_40px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Name */}
          <div className="flex items-center gap-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              TamaGen
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-2xl text-zinc-400 text-center max-w-2xl">
            Transform your ingredients into delicious recipes with AI
          </p>

          {/* Feature Pills */}
          <div className="flex gap-4 mt-4">
            {["Smart AI", "Custom Recipes", "Dietary Options"].map((text) => (
              <div
                key={text}
                className="px-6 py-2 rounded-full bg-zinc-900 text-white border border-zinc-800"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
