import Header from '@/components/shared/header/Header';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <main className='mx-auto max-w-screen-md px-4 pt-6'>
      <Header />
      <div className='mt-10'>{children}</div>
    </main>
  );
}
