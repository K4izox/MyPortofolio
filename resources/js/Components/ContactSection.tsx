import React, { useState, useEffect } from "react";
import { OWNER_DATA } from "../types";
import { Mail, Instagram, Linkedin, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import TypewriterHeading from "./TypewriterHeading";

export default function ContactSection() {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: "",
    email: "",
    message: "",
  });

  const { flash } = usePage().props as any;
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (recentlySuccessful || (flash && flash.success)) {
      setIsSuccess(true);
      playChime();
    }
  }, [recentlySuccessful, flash]);

  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Cute dual level-up coin sound
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch (e) {
      // Browser blocked autoplay audio
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as any, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contact.store'), {
      onSuccess: () => {
        reset();
      },
      preserveScroll: true,
    });
  };

  return (
    <section id="contact" className="py-16 bg-white border-b-4 border-black pixel-grid-bg">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white pixel-border px-6 py-2.5 mb-3 pixel-shadow-sm">
            <TypewriterHeading 
              text="✉️ TRANSMIT TRANSMISSION (CONTACT)" 
              className="font-pixel text-xs sm:text-sm text-black tracking-widest justify-center uppercase"
              speed={40}
            />
          </div>
          <p className="text-xs font-mono text-gray-500 max-w-md mx-auto">
            Kirimkan pesan Anda langsung lewat pos terminal ini, atau temukan saya melalui koordinat sosial media berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Contact Information & Social coordinates */}
          <div className="lg:col-span-5 bg-gray-100 pixel-border p-6 pixel-shadow-blue">
            <h3 className="font-pixel text-[11px] text-black tracking-wider mb-4 border-b-2 border-black pb-2">
              REZA'S COORDINATES
            </h3>

            {/* Direct Details */}
            <div className="space-y-4 mb-6 font-mono text-xs text-gray-700">
              <div className="flex items-center gap-3 bg-white p-3 border-2 border-black">
                <div className="w-8 h-8 bg-[#4285F4] text-white flex items-center justify-center pixel-border-sm flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[8px] font-pixel text-gray-400">EMAIL</span>
                  <a href={`mailto:${OWNER_DATA.contacts.email}`} className="font-bold text-gray-800 hover:underline break-all">
                    {OWNER_DATA.contacts.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 border-2 border-black">
                <div className="w-8 h-8 bg-[#34A853] text-white flex items-center justify-center pixel-border-sm flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-[8px] font-pixel text-gray-400">PHONE (WA)</span>
                  <a href={`https://wa.me/${OWNER_DATA.contacts.phone.replace("+", "")}`} className="font-bold text-gray-800 hover:underline">
                    {OWNER_DATA.contacts.phone}
                  </a>
                </div>
              </div>
            </div>

            <h4 className="font-pixel text-[9px] text-gray-600 mb-3 uppercase tracking-wider">
              CONNECT ONLINE:
            </h4>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={OWNER_DATA.contacts.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white p-2.5 border-2 border-black pixel-shadow-sm hover:translate-y-0.5 active:translate-y-1 transition-all"
                style={{ boxShadow: "3px 3px 0px #000" }}
              >
                <div className="w-6 h-6 bg-[#0077B5] text-white flex items-center justify-center pixel-border-sm flex-shrink-0">
                  <Linkedin size={12} fill="white" />
                </div>
                <span className="font-mono text-[10px] font-extrabold text-gray-700">LINKEDIN</span>
              </a>

              {/* Instagram */}
              <a
                href={OWNER_DATA.contacts.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white p-2.5 border-2 border-black pixel-shadow-sm hover:translate-y-0.5 active:translate-y-1 transition-all"
                style={{ boxShadow: "3px 3px 0px #000" }}
              >
                <div className="w-6 h-6 bg-[#E1306C] text-white flex items-center justify-center pixel-border-sm flex-shrink-0">
                  <Instagram size={12} />
                </div>
                <span className="font-mono text-[10px] font-extrabold text-gray-700">INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Right Side: Message terminal form */}
          <div className="lg:col-span-7 bg-white pixel-border p-6 pixel-shadow relative">
            <h3 className="font-pixel text-[11px] text-black tracking-wider mb-6 border-b-2 border-black pb-2">
              QUEST COMMENCE FORM
            </h3>

            {isSuccess ? (
              <div className="bg-green-50 border-4 border-[#34A853] p-6 text-center animate-fade-in">
                <div className="w-12 h-12 bg-[#34A853] text-white flex items-center justify-center pixel-border-sm mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-pixel text-[10px] text-gray-900 mb-2 uppercase">
                  ⭐ QUEST CLEARED! ⭐
                </h4>
                <p className="text-xs font-sans text-gray-600 font-medium mb-6">
                  Terima kasih! Pesan transmisi Anda telah sukses dilemparkan ke server cloud Reza Fahlevi. Reza akan segera merespons sinyal Anda secepat mungkin.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="pixel-btn-green text-[8px] font-pixel px-4 py-2"
                >
                  SEND ANOTHER SIGNAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Name */}
                <div>
                  <label className="block font-pixel text-[8px] text-gray-600 mb-2 uppercase">
                    PLAYER NAME (NAMA):
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full bg-gray-50 border-4 border-black p-3 outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors"
                    required
                  />
                  {errors.name && <div className="text-red-500 font-pixel text-[8px] mt-1">{errors.name}</div>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-pixel text-[8px] text-gray-600 mb-2 uppercase">
                    TRANSMISSION ADDRESS (EMAIL):
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                    placeholder="alamat_email@kamu.com"
                    className="w-full bg-gray-50 border-4 border-black p-3 outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors"
                    required
                  />
                  {errors.email && <div className="text-red-500 font-pixel text-[8px] mt-1">{errors.email}</div>}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-pixel text-[8px] text-gray-600 mb-2 uppercase">
                    TRANSMISSION SIGNAL (PESAN):
                  </label>
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tuliskan isi pesan, tawaran proyek, atau sapaan hangat di sini..."
                    className="w-full bg-gray-50 border-4 border-black p-3 outline-none focus:bg-white text-gray-900 placeholder-gray-400 transition-colors resize-none"
                    required
                  ></textarea>
                  {errors.message && <div className="text-red-500 font-pixel text-[8px] mt-1">{errors.message}</div>}
                </div>

                {/* Action button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={processing}
                    className={`pixel-btn-blue text-[9px] font-pixel flex items-center gap-2 ${
                      processing ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    <Send size={12} />
                    {processing ? "TRANSMITTING..." : "SEND SIGNAL"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
