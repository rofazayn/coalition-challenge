import loopIcon from '@/assets/icons/loop.svg';
import dotsIcon from '@/assets/icons/menu.svg';
import { auth } from '@/configs/auth';
import { useEffect, useState } from 'react';

const PatientsList = () => {
  const [patients, setPatients] = useState<any>(null);

  useEffect(() => {
    // fetch random patients
    async function fetchPatients() {
      try {
        const patientsData = await fetch(
          'https://fedskillstest.coalitiontechnologies.workers.dev',
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        );
        const parsedData = await patientsData.json();
        if (parsedData) {
          setPatients(parsedData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPatients();
  }, []);
  return (
    <div className='flex w-full flex-col bg-white rounded-3xl h-[calc(100vh-136px)] overflow-auto top-[0] sticky'>
      <div className='w-full flex flex-row gap-4 items-center justify-between p-6'>
        <span className='text-lg font-bold'>Patients</span>
        <img src={loopIcon} className='w-5 h-5' />
      </div>
      <div className='w-full mt-2 flex flex-col'>
        {patients &&
          patients.length &&
          patients.map((patient, id) => (
            <div
              key={id}
              className={`w-full flex flex-row items-center justify-between gap-4 px-6 py-[18px] ${
                patient.name.startsWith('Jessica') && 'bg-cyan-500/15'
              }`}
            >
              <div className='flex flex-row items-center gap-4'>
                <div className='w-12 h-12 rounded-full overflow-hidden shadow-sm'>
                  <img src={patient.profile_picture} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm font-medium'>{patient.name}</span>
                  <span className='text-sm text-muted-foreground first-letter:uppercase'>
                    {patient.gender}, {patient.age}
                  </span>
                </div>
              </div>
              <div>
                <img src={dotsIcon} className='rotate-90 w-5 h-5' />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientsList;
