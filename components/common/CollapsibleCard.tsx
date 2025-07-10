// components/common/CollapsibleCard.tsx
import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CollapsibleCardProps {
  title: ReactNode; // ✅ 支持组件
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsibleCard({
  title,
  defaultOpen = true,
  children,
}: CollapsibleCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle> {/* title 可以是字符串或组件 */}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              {open ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
