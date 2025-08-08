import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Assets() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Ethereum Sepolia assets</CardTitle> {/* title 可以是字符串或组件 */}
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
    </Card>
  );
}
