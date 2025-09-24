'use client';
import { cn } from '@/lib/utils';
import { UserTierLevel } from '@/lib/membership-tiers';
import { Layers } from 'lucide-react';
import React from 'react';
import { Progress } from '@/components/ui/progress';


interface MembershipCardProps {
  level: UserTierLevel;
  className?: string;
  userName?: string;
  userXP?: number;
  nextLevelXP?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const MembershipCard = React.forwardRef<HTMLDivElement, MembershipCardProps>(
  (
    {
      level,
      className,
      userName,
      userXP = 0,
      nextLevelXP,
      onClick,
      ...props
    }, ref) => {
    const isSpecial =
      level.name === 'Partner' ||
      level.name === 'Sponsor' ||
      level.name === 'Ambassador';
      
    const progressPercentage = !isSpecial && nextLevelXP 
      ? Math.min(((userXP - level.xpThreshold) / (nextLevelXP - level.xpThreshold)) * 100, 100)
      : (isSpecial ? 100 : 0);

    const baseCardClasses =
      'relative w-full aspect-[1.586] rounded-xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl';

    return (
      <div
        ref={ref}
        onClick={onClick}
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
        <div className="flex flex-col gap-3 z-10">
           {!isSpecial && (
             <div className="w-full">
                <Progress value={progressPercentage} className="h-1.5 bg-white/20" indicatorClassName={level.accentColor} />
                <div className="flex justify-between text-xs font-mono opacity-80 mt-1.5">
                   <span>XP: {userXP}</span>
                   <span>{nextLevelXP ? `Next: ${nextLevelXP} XP` : 'Max Level'}</span>
                </div>
            </div>
           )}
          <div className="flex justify-between items-end">
            <div className={'font-mono text-sm tracking-tighter opacity-80'}>
              {isSpecial ? `Tessera ${level.name}`: ''}
            </div>
            <div className={'text-xs font-semibold opacity-70'}>
              Cantiere Culturale
            </div>
          </div>
        </div>
      </div>
    );
  }
);
MembershipCard.displayName = "MembershipCard";
