import { Header } from '@/components/organisms/Header';
import { IntercomControl } from '@/components/organisms/IntercomControl';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} />
      <main className="flex-1">
        <IntercomControl />
      </main>
    </div>
  );
}
