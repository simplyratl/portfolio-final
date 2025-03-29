import { format, differenceInMonths, parseISO } from 'date-fns';

const careerItems = [
  {
    title: 'Lead Frontend Engineer',
    company: 'Coreit',
    startDate: '2023-09-01',
    endDate: 'Present',
    location: 'Podgorica',
  },
  {
    title: 'Freelancer',
    company: 'Freelance',
    startDate: '2023-01-01',
    endDate: 'Present',
    location: 'Remote',
  },
  {
    title: 'Frontend Engineer',
    company: 'B-ONE d.o.o',
    startDate: '2022-10-01',
    endDate: '2023-09-30',
    location: 'Podgorica',
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Web Centar',
    startDate: '2020-09-01',
    endDate: '2021-05-01',
    location: 'Podgorica',
  },
];

function calculateDuration(startDateStr: string, endDateStr: string): string {
  const startDate = parseISO(startDateStr);
  const endDate = endDateStr === 'Present' ? new Date() : parseISO(endDateStr);
  const totalMonths = differenceInMonths(endDate, startDate);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = '';
  if (years > 0) {
    duration += `${years} yr${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    if (duration) duration += ' ';
    duration += `${months} mo${months > 1 ? 's' : ''}`;
  }
  return duration || 'N/A';
}

export default function Career() {
  return (
    <div>
      <h2 className='text-2xl font-bold'>Career</h2>
      <ul className='mt-4'>
        {careerItems.map((item) => {
          const startFormatted = format(parseISO(item.startDate), 'MMM yyyy');
          const endFormatted =
            item.endDate === 'Present'
              ? 'Present'
              : format(parseISO(item.endDate), 'MMM yyyy');
          const duration = calculateDuration(item.startDate, item.endDate);

          return (
            <li key={item.title} className='mb-4'>
              <h3 className='text-xl font-medium'>{item.title}</h3>
              <div className='text-accent'>
                <span>{item.company}</span>
                <span className='mx-1'>•</span>
                <span>{item.location}</span>
              </div>
              <p className='text-accent'>
                <span>
                  {startFormatted} – {endFormatted}
                </span>
                <span className='mx-1'>•</span>
                <span>{duration}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
