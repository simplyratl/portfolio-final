import Header from '@/components/shared/header/Header';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className='pt-4'>
      <Header />
      <main className='mx-auto max-w-[1100px]'>
        <div className='mt-10'>{children}</div>
      </main>
    </div>
  );
}
