'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UserTierLevel } from '@/lib/membership-tiers';
import { Layers } from 'lucide-react';

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
        'group relative w-full overflow-hidden rounded-xl border border-white/10',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`,
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
    'relative w-full aspect-[1.586] rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl';

  return (
    <div className={cn(baseCardClasses, level.backgroundColor, level.textColor, className)}>
      {/* Elemento geometrico unificante */}
      <Layers className={cn('absolute top-6 right-6 w-8 h-8 opacity-50', level.accentColor)} />
      
      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="font-bold tracking-widest uppercase text-sm opacity-80">
          Forum dei Giovani
        </div>
      </div>

      {/* Main Content */}
      <div className="z-10">
        <div
          className={'font-bold text-lg tracking-wider uppercase opacity-70'}
        >
          {level.name}
        </div>
        <div className={'text-2xl font-black tracking-tight'}>
          {userName}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end z-10">
        <div className={'font-mono text-sm tracking-tighter opacity-80'}>
          {isSpecial
            ? `Tessera ${level.name}`
            : `XP: ${userXP !== undefined ? userXP : '0'}`}
        </div>
        <div className={'text-xs font-semibold opacity-70'}>
          Cantiere Culturale
        </div>
      </div>
    </div>
  );
}
