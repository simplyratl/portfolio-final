export default function Footer() {
  return (
    <footer className='border-t px-4 py-4'>
      <div className='text-muted flex items-center justify-between'>
        <div>Nikica Ražnatović</div>
        <div>{new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
