import logoSvg from '@/assets/logo.svg';
import doctorImage from '@/assets/avatars/doctor.png';
import homeIcon from '@/assets/icons/home.svg';
import patientsIcon from '@/assets/icons/patients.svg';
import scheduleIcon from '@/assets/icons/schedule.svg';
import transactionsIcon from '@/assets/icons/transactions.svg';
import messageIcon from '@/assets/icons/message.svg';
import cogIcon from '@/assets/icons/cog.svg';
import menuIcon from '@/assets/icons/menu.svg';

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center p-4 fixed top-0 inset-x-0 margin-auto z-[1000]'>
      <div className='gap-4 w-full flex flex-row items-center justify-between px-8 py-4 h-[72px] rounded-full bg-white shadow-sm'>
        <div className='pe-4'>
          <img src={logoSvg} alt='coalition logo' className='h-[40px]' />
        </div>
        <nav>
          <ul className='flex flex-row items-center gap-8'>
            <li className='inline-flex no-wrap gap-2 items-center'>
              <img src={homeIcon} className='w-4 h-4' />{' '}
              <span className='text-sm text-foreground font-medium'>
                Overview
              </span>
            </li>
            <li className='inline-flex no-wrap gap-2 items-center bg-[#01F0D0] rounded-full px-4 py-3'>
              <img src={patientsIcon} className='w-4 h-4' />{' '}
              <span className='text-sm text-foreground font-medium'>
                Patients
              </span>
            </li>
            <li className='inline-flex no-wrap gap-2 items-center'>
              <img src={scheduleIcon} className='w-4 h-4' />{' '}
              <span className='text-sm text-foreground font-medium'>
                Schedule
              </span>
            </li>
            <li className='inline-flex no-wrap gap-2 items-center'>
              <img src={messageIcon} className='w-4 h-4' />{' '}
              <span className='text-sm text-foreground font-medium'>
                Message
              </span>
            </li>
            <li className='inline-flex no-wrap gap-2 items-center'>
              <img src={transactionsIcon} className='w-4 h-4' />{' '}
              <span className='text-sm text-foreground font-medium'>
                Transactions
              </span>
            </li>
          </ul>
        </nav>
        <div className='flex flex-row items-center gap-4 divide-x divide-neutral-500/25'>
          <div className='flex flex-row items-center gap-4'>
            <div className='w-12'>
              <img src={doctorImage} alt='doctor avatar' />
            </div>
            <div className='flex flex-col gap-[0px] leading-[0]'>
              <span className='text-sm font-medium'>Dr. Jose Simmons</span>
              <span className='text-sm text-muted-foreground'>
                General Practitioner
              </span>
            </div>
          </div>
          <div className='flex flex-row items-center gap-3 ps-4'>
            <img src={cogIcon} className='w-5 h-5' />
            <img src={menuIcon} className='w-5 h-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
