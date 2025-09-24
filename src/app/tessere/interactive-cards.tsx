'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { membershipTiers, UserTierLevel } from '@/lib/membership-tiers';
import { MembershipCard } from './membership-card';
import { cn } from '@/lib/utils';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function VerticalCardStack({ levels }: { levels: UserTierLevel[] }) {
  const [cardIndex, setCardIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const { offset, velocity } = info;
    if (offset.y < -50 && cardIndex < levels.length - 1) {
      setCardIndex(cardIndex + 1);
    } else if (offset.y > 50 && cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <AnimatePresence>
        {levels.slice(cardIndex).map((level, i) => (
          <motion.div
            key={level.name}
            className="absolute w-full h-full"
            style={{
              width: 'clamp(280px, 80vw, 450px)',
              height: 'clamp(176px, 50.4vw, 283px)',
            }}
            initial={{ scale: 1 - i * 0.05, y: -i * 15, zIndex: levels.length - i }}
            animate={{ scale: 1 - i * 0.05, y: -i * 15, zIndex: levels.length - i }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
          >
            <MembershipCard level={level} userXP={level.xpThreshold} />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
         {levels.map((_, i) => (
             <div key={i} className={cn('w-2 h-2 rounded-full transition-colors', i === cardIndex ? 'bg-primary' : 'bg-muted')}/>
         ))}
      </div>
    </div>
  );
}


export function InteractiveCards() {
  const [[page, direction], setPage] = useState([0, 0]);

  const tierIndex = wrap(0, membershipTiers.length, page);
  const currentTier = membershipTiers[tierIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center relative">
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                    }
                }}
                className="w-full h-full flex items-center justify-center"
            >
                <VerticalCardStack levels={currentTier.levels} />
            </motion.div>
        </AnimatePresence>
       
        <div className="absolute bottom-[-40px] flex justify-center gap-2">
            {membershipTiers.map((_, i) => (
                <div key={i} className={cn('w-2.5 h-2.5 rounded-full transition-colors', i === tierIndex ? 'bg-primary' : 'bg-muted')}
                    onClick={() => setPage([i, i > tierIndex ? 1 : -1])}
                />
            ))}
        </div>
    </div>
  );
}
