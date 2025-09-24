'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UserTierLevel } from '@/lib/membership-tiers';
import { Layers } from 'lucide-react';

interface MembershipCardProps {
  level: UserTierLevel;
  className?: string;
  userName?: string;
  userXP?: number;
  style?: React.CSSProperties;
}

export const MembershipCard = motion(
  ({
    level,
    className,
    userName,
    userXP,
    ...props
  }: MembershipCardProps) => {
    const isSpecial =
      level.name === 'Partner' ||
      level.name === 'Sponsor' ||
      level.name === 'Ambassador';

    const baseCardClasses =
      'relative w-full aspect-[1.586] rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl';

    return (
      <div
        className={cn(baseCardClasses, level.backgroundColor, level.textColor, className)}
        {...props}
      >
        <div 
          className="absolute inset-0 bg-repeat bg-center opacity-[0.03]" 
          style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
        ></div>
         <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", level.backgroundColor)}></div>


        <Layers
          className={cn(
            'absolute top-6 right-6 w-8 h-8 opacity-50',
            level.accentColor
          )}
        />

        {/* Header */}
        <div className="flex justify-between items-start z-10">
          <div className="font-bold tracking-widest uppercase text-sm opacity-80">
            Forum dei Giovani
          </div>
        </div>

        {/* Main Content */}
        <div className="z-10">
          <div className={'font-bold text-lg tracking-wider uppercase opacity-70'}>
            {level.name}
          </div>
           <div className={'text-2xl font-black tracking-tight'}>
            {userName || level.name}
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
);
