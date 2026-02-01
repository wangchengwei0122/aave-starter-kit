import { AppButton } from "@workspace/ui/components/app";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 font-sans dark:bg-black">
      <AppButton>Default Button</AppButton>
      <AppButton variant="secondary">Secondary</AppButton>
      <AppButton variant="ghost">Ghost</AppButton>
      <AppButton variant="destructive">Destructive</AppButton>
      <AppButton loading>Loading</AppButton>
    </div>
  );
}
