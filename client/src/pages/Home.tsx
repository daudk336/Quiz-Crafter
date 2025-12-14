import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Zap, Palette } from "lucide-react";
import heroBg from "@assets/generated_images/modern_abstract_dark_tech_background_with_geometric_shapes.png";
import { EmbedModal } from "@/components/EmbedModal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      {/* Top Bar */}
      <div className="absolute top-4 right-4 z-20">
        <EmbedModal />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-foreground/80 text-sm mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="tracking-wide uppercase font-medium text-xs">GHL Specialization Advisor</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-heading">
            Find Your <span className="gradient-text">Superpower</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover your ideal role in the funnel-building ecosystem. Are you a Conversion Architect, an Automation Wizard, or a Design Virtuoso?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left"
        >
          {[
            { icon: Brain, title: "Conversion", desc: "Psychology & Strategy" },
            { icon: Zap, title: "Automation", desc: "Logic & Workflows" },
            { icon: Palette, title: "Design", desc: "Visuals & UX" },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl hover:border-primary/50 transition-colors duration-300">
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/quiz">
            <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-primary rounded-full overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span>Start Assessment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
