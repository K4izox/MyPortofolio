import React from "react";
import { useForm } from "@inertiajs/react";
import { MessageSquare, Send } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import TypewriterHeading from "./TypewriterHeading";

interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookSection({ entries }: { entries: Entry[] }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: "",
    message: "",
  });

  const { playClickSound, playHoverSound } = useAudio();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('guestbook.store'), {
      onSuccess: () => {
        reset();
        playClickSound();
      },
      preserveScroll: true,
    });
  };

  return (
    <section className="bg-[#1F2937] border-y-4 border-black text-white relative overflow-hidden flex flex-col">
      
      {/* Input Form Area */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full z-10 relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <TypewriterHeading 
              text="PUBLIC GUESTBOOK" 
              icon={<MessageSquare size={14} />}
              className="font-pixel text-[11px] text-[#FBBC05] mb-2 justify-center md:justify-start uppercase tracking-widest"
              speed={40}
            />
            <p className="font-mono text-xs text-gray-400">
              Tinggalkan pesan Anda secara anonim atau pakai nama. Pesan akan melayang di bawah!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="name"
              placeholder="Nickname (Max 15)"
              maxLength={15}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="bg-black border-2 border-gray-600 px-3 py-2 text-xs font-mono text-white focus:border-[#4285F4] outline-none placeholder-gray-600"
              required
            />
            <input
              type="text"
              name="message"
              placeholder="Your short message..."
              maxLength={50}
              value={data.message}
              onChange={e => setData('message', e.target.value)}
              className="bg-black border-2 border-gray-600 px-3 py-2 text-xs font-mono text-white focus:border-[#4285F4] outline-none placeholder-gray-600 sm:w-64"
              required
            />
            <button
              type="submit"
              disabled={processing}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className={`bg-[#4285F4] text-white pixel-border-sm px-4 py-2 font-pixel text-[8px] flex items-center justify-center gap-1 hover:-translate-y-0.5 active:translate-y-0.5 transition-transform ${processing ? 'opacity-50' : ''}`}
            >
              <Send size={10} /> SEND
            </button>
          </form>
        </div>
        {/* Errors */}
        {(errors.name || errors.message) && (
          <div className="text-red-400 font-pixel text-[8px] mt-2 text-center md:text-right">
            [ERROR: INVALID INPUT]
          </div>
        )}
      </div>

      {/* Scrolling Marquee */}
      <div className="bg-black border-t-2 border-gray-800 py-3 overflow-hidden flex group relative">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          
          {entries.length === 0 ? (
            <span className="font-pixel text-[10px] text-gray-500 mx-10 min-w-[100vw] text-center inline-block">
              [ NO MESSAGES YET - BE THE FIRST TO SIGN! ]
            </span>
          ) : (
            <>
              {/* Block 1 */}
              <div className="flex min-w-[100vw] justify-around shrink-0">
                {Array(Math.max(1, Math.ceil(10 / entries.length))).fill(0).map((_, groupIdx) => (
                  <React.Fragment key={`b1-${groupIdx}`}>
                    {entries.map((entry) => (
                      <span key={`b1-${groupIdx}-${entry.id}`} className="font-pixel text-[9px] mx-8 inline-flex items-center gap-2 whitespace-nowrap shrink-0">
                        <span className="text-[#34A853]">[{entry.name}]</span> 
                        <span className="text-gray-300">{entry.message}</span>
                        <span className="text-gray-700 ml-4">+++</span>
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              {/* Block 2 (Duplicate for seamless loop) */}
              <div className="flex min-w-[100vw] justify-around shrink-0">
                {Array(Math.max(1, Math.ceil(10 / entries.length))).fill(0).map((_, groupIdx) => (
                  <React.Fragment key={`b2-${groupIdx}`}>
                    {entries.map((entry) => (
                      <span key={`b2-${groupIdx}-${entry.id}`} className="font-pixel text-[9px] mx-8 inline-flex items-center gap-2 whitespace-nowrap shrink-0">
                        <span className="text-[#34A853]">[{entry.name}]</span> 
                        <span className="text-gray-300">{entry.message}</span>
                        <span className="text-gray-700 ml-4">+++</span>
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
