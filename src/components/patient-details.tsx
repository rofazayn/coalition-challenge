import patientAvatar from '@/assets/avatars/jessica.png';
import calendarIcon from '@/assets/icons/calendar.svg';
import arrowDownTrayIcon from '@/assets/icons/arrow-down-tray.svg';
import { auth } from '@/configs/auth';
import { useEffect, useState } from 'react';

const PatientDetails = () => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    async function fetchPatientData() {
      try {
        const query = await fetch(
          'https://fedskillstest.coalitiontechnologies.workers.dev',
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        );
        const data = await query.json();
        if (data) {
          const targetPatientIndex = data.findIndex((x) =>
            x.name.toLowerCase().startsWith('jessica')
          );
          if (targetPatientIndex !== -1) {
            setPatientData(data[targetPatientIndex]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPatientData();
  }, []);

  return (
    patientData && (
      <div className='flex w-full flex-col gap-6'>
        <div className='flex w-full flex-col bg-white rounded-3xl p-6'>
          <div className='w-full flex flex-col items-center justify-center'>
            <img
              className='w-full max-w-[176px]'
              src={patientAvatar || patientData.profile_picture}
            />
            <span className='text-3xl font-medium mt-6'>
              {patientData.name}
            </span>
          </div>
          <div className='w-full flex flex-col gap-5 mt-6'>
            <div className='w-full flex flex-row items-center gap-4'>
              <div className='aspect-square w-12 h-12 flex items-center justify-center'>
                <img className='w-full h-full' src={calendarIcon} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-md text-muted-foreground'>
                  Date of Birth
                </span>
                <span className='text-md font-medium'>
                  {patientData.date_of_birth}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-row items-center gap-4'>
              <div className='aspect-square w-12 h-12 flex items-center justify-center'>
                <img className='w-full h-full' src={calendarIcon} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-md text-muted-foreground'>Gender</span>
                <span className='text-md font-medium'>
                  {patientData.gender}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-row items-center gap-4'>
              <div className='aspect-square w-12 h-12 flex items-center justify-center'>
                <img className='w-full h-full' src={calendarIcon} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-md text-muted-foreground'>
                  Contact Info
                </span>
                <span className='text-md font-medium'>
                  {patientData.phone_number}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-row items-center gap-4'>
              <div className='aspect-square w-12 h-12 flex items-center justify-center'>
                <img className='w-full h-full' src={calendarIcon} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-md text-muted-foreground'>
                  Emergency Contacts
                </span>
                <span className='text-md font-medium'>
                  {patientData.emergency_contact}
                </span>
              </div>
            </div>
            <div className='w-full flex flex-row items-center gap-4'>
              <div className='aspect-square w-12 h-12 flex items-center justify-center'>
                <img className='w-full h-full' src={calendarIcon} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <span className='text-md text-muted-foreground'>
                  Insurance Provider
                </span>
                <span className='text-md font-medium'>
                  {patientData.insurance_type}
                </span>
              </div>
            </div>
            <div className='w-full flex items-center justify-center mt-6 mb-3'>
              <button className='bg-[#01F0D0] px-10 py-2.5 rounded-full text-foreground'>
                Show All Information
              </button>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col bg-white rounded-3xl'>
          <div className='w-full flex flex-row gap-4 items-center justify-between p-6 pb-2'>
            <span className='text-2xl font-medium'>Lab Results</span>
          </div>
          <div className='w-full flex flex-col p-4'>
            {patientData.lab_results.map((r, rid) => (
              <div
                className={`w-full p-4 flex flex-row items-center justify-between gap-4 ${
                  rid === 1 && 'bg-gray-500/5'
                }`}
                key={rid}
              >
                <span className='text-md text-medium'>{r}</span>
                <img src={arrowDownTrayIcon} className='w-5 h-5' />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default PatientDetails;
