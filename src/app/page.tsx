import Career from '@/components/blocks/home/Career';
import { socials } from '@/constants/socials';
import SocialButton from '@/components/shared/SocialButton';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='slide-enter-content'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Nikica Ražnatović</h1>

        <div className='flex flex-col gap-2'>
          <ul className='flex h-7 gap-2.5'>
            {socials.map((social) => (
              <li key={social.name}>
                <SocialButton social={social} />
              </li>
            ))}
          </ul>
          <a
            href='mailto:work@nikicaraznatovic.me'
            className='text-primary hover:underline'
          >
            work@nikicaraznatovic.me
          </a>
        </div>
      </div>

      <div className='slide-enter-content mt-6 space-y-4'>
        <p>
          Specializing in user interface development, functional software and
          web applications with a focus on details that enhance user
          interactions.
        </p>
        <p>
          In the past I've developed tools, internal design systems, and
          applications.
        </p>
        <p>Currently, working as a Frontend Engineer at Coreit</p>
      </div>

      {/*<div className='mt-8'>*/}
      {/*  <Career />*/}
      {/*</div>*/}
    </main>
  );
}
