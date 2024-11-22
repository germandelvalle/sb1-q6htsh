import { NewScopeForm } from './components/newScope';

export default function NewScope() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mt-2 flex items-center gap-2 mb-2">
        New Scope
      </h1>

      <div className="mt-5 mb-8 font-[family-name:var(--font-geist-sans)]">
        <main>
          <NewScopeForm />
        </main>
      </div>
    </>
  );
}
