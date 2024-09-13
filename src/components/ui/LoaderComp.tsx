import { Loader2 } from 'lucide-react';

export function LoaderComp() {
  return (
    <section className="absolute inset-0 z-10 backdrop-blur-lg">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="mr-2 size-5 animate-spin" />
      </div>
    </section>
  );
}
