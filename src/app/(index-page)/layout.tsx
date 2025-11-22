import Header from '@/components/shared/header/Header';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <main className='mx-auto max-w-[1100px] pt-6'>
      <div className='mx-auto max-w-screen-md px-4'>
        <Header />
      </div>
      <div className='mt-10'>{children}</div>
    </main>
  );
}
