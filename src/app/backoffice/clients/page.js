import { ClientsTable } from './components/table';
import { CreateClient } from './components/createClient';
import Breadcrumbs from '@/src/components/breadcrumbs';

export default function ClientPage() {
  return (
    <>

      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mt-2 flex items-center gap-2 mb-2">
        Clients
      </h1>

      <CreateClient />

      <div className="mt-5 mb-8 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <ClientsTable />
        </main>
      </div>
    </>
  );
}
