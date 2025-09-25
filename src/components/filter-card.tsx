"use client";

import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FilterCardProps {
    value: string;
    label: string;
    icon: React.ElementType;
    selectedValue: string;
    onSelect: (value: any) => void;
    groupName?: string;
}

export const FilterCard = ({ value, label, icon: Icon, selectedValue, onSelect, groupName = 'filter' }: FilterCardProps) => {
    const isSelected = selectedValue === value;
    const id = `${groupName}-${value}`;
    
    return (
        <div onClick={() => onSelect(value)} className="w-full">
            <RadioGroupItem value={value} id={id} className="sr-only" />
            <Label htmlFor={id} className={cn(
                "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 h-full",
                isSelected ? "border-primary bg-primary/5 text-primary shadow-inner" : "border-border bg-card hover:bg-accent/50 hover:border-accent"
            )}>
                <Icon className={cn("w-8 h-8 mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-semibold text-center">{label}</span>
            </Label>
        </div>
    );
};
