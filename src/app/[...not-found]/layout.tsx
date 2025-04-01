type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <main className='flex h-screen items-center justify-center'>
      {children}
    </main>
  );
}
