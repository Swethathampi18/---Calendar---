interface SpiralBindingProps {
  count?: number;
}

export function SpiralBinding({ count = 15 }: SpiralBindingProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-8 z-20">
      {/* The wire that connects all spirals */}
      <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-transparent via-[hsl(220,8%,52%)] to-transparent -translate-y-1/2" />

      <div className="flex items-center justify-between w-[84%]">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Spiral coil — the ring part */}
            <div className="relative w-4 h-8">
              {/* Back wire (behind the card) */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full rounded-full"
                style={{
                  background: "linear-gradient(180deg, hsl(220,8%,62%) 0%, hsl(220,8%,45%) 50%, hsl(220,8%,62%) 100%)",
                }}
              />
              {/* The coil ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[2.5px]"
                style={{
                  borderColor: "hsl(220,8%,52%)",
                  background: "transparent",
                  boxShadow: "0 1px 2px hsl(220,8%,30%,0.3)",
                }}
              />
              {/* Highlight on ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-2.5 h-1.5 rounded-full"
                style={{
                  background: "linear-gradient(180deg, hsl(220,8%,78%,0.6) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
