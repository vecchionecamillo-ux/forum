'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UserTierLevel, MembershipTier } from '@/lib/membership-tiers';
import { Layers, Shield } from 'lucide-react';

export function CardSpotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted/30',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, hsla(var(--primary) / 0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

interface MembershipCardProps {
  tierType: 'user' | 'partner' | 'sponsor' | 'ambassador';
  level: UserTierLevel;
  className?: string;
  userName?: string;
  userXP?: number;
}

export function MembershipCard({
  tierType,
  level,
  className,
  userName = 'Nome Membro',
  userXP,
}: MembershipCardProps) {
  const isSpecial = tierType !== 'user';

  const baseCardClasses =
    'relative w-full aspect-[1.586] rounded-xl p-6 flex flex-col justify-between text-white overflow-hidden';
  const textColorClass = level.textColor || 'text-white';

  return (
    <div className={cn(baseCardClasses, level.gradient, className)}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]"
        style={{ maskImage: 'radial-gradient(ellipse at center, white, transparent 70%)' }}
      ></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-2xl"></div>


      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="font-bold tracking-widest uppercase text-sm opacity-80">
          Forum dei Giovani
        </div>
        <Layers className="w-6 h-6 opacity-80" />
      </div>

      {/* Main Content */}
      <div className="z-10">
        <div
          className={`font-bold text-lg tracking-wider uppercase opacity-70 ${textColorClass}`}
        >
          {level.name}
        </div>
        <div className={`text-2xl font-black tracking-tight ${textColorClass}`}>
          {userName}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end z-10">
        <div className={`font-mono text-sm tracking-tighter opacity-80 ${textColorClass}`}>
          {isSpecial
            ? `Tessera ${level.name}`
            : `XP: ${userXP !== undefined ? userXP : '0'}`}
        </div>
        <div className={`text-xs font-semibold opacity-70 ${textColorClass}`}>
          Cantiere Culturale
        </div>
      </div>
    </div>
  );
}
