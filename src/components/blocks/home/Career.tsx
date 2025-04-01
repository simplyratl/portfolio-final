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
      <ul className='slide-enter-content mt-4'>
        {careerItems.map((item) => {
          const startFormatted = format(parseISO(item.startDate), 'MMM yyyy');
          const endFormatted =
            item.endDate === 'Present'
              ? 'Present'
              : format(parseISO(item.endDate), 'MMM yyyy');
          const duration = calculateDuration(item.startDate, item.endDate);

          return (
            <li key={item.title} className='mb-4 flex items-center gap-3'>
              <div>
                <h3 className='text'>{item.title}</h3>
                <div className='text-muted'>
                  <span>{item.company}</span>
                  <span className='mx-1'>•</span>
                  <span>{item.location}</span>
                </div>
                <p className='text-muted text-sm'>{duration}</p>
              </div>
              <div className='bg-muted/20 mr-2 h-[1px] flex-1'></div>
              <p className='text-muted text-sm'>
                {startFormatted} – {endFormatted}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
