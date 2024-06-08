import carretDownIcon from '@/assets/icons/carret-down.svg';
import loopIcon from '@/assets/icons/loop.svg';
import lungsImage from '@/assets/lungs.svg';
import heartImage from '@/assets/heart.svg';
import thermoImage from '@/assets/thermometer.svg';
import arrowUpIcon from '@/assets/icons/arrow-up.svg';
import { auth } from '@/configs/auth';
import { useEffect, useState } from 'react';
import { Chart } from './chart';

const DiagnosisHistory = () => {
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
        <div className='flex w-full flex-col bg-white rounded-3xl'>
          <div className='w-full flex flex-row gap-4 items-center justify-between p-6 pb-2'>
            <span className='text-2xl font-medium'>Diagnosis History</span>
            <img src={loopIcon} className='w-5 h-5' />
          </div>
          <div className='p-6 w-full h-full'>
            <div className='flex flex-col w-full bg-violet-500/15 rounded-xl p-4'>
              <div className='w-full grid grid-cols-12 gap-8'>
                <div className='col-span-8'>
                  <div className='flex flex-col w-full h-full'>
                    <div className='w-full flex flex-row-items-center justify-between gap-2'>
                      <span className='text-lg font-medium w-full'>
                        Blood pressure
                      </span>
                      <div className='flex flex-row gap-2 pe-4'>
                        <span className='whitespace-nowrap text-sm text-muted-foreground inline-flex items-center flex-row gap-3'>
                          Last 6 months
                        </span>
                        <img src={carretDownIcon} />
                      </div>
                    </div>
                    <div className='w-full h-full rounded-xl mt-4 min-h-64'>
                      <Chart />
                    </div>
                  </div>
                </div>
                <div className='col-span-4'>
                  <div className='flex flex-row gap-2 items-center'>
                    <div className='block h-3 w-3 bg-pink-500 rounded-xl'></div>
                    <span className='inline-block whitespace-nowrap'>
                      Systolic
                    </span>
                  </div>
                  <div className='w-full mt-2'>
                    <span className='text-2xl block font-medium'>
                      {
                        patientData.diagnosis_history[0].blood_pressure.systolic
                          .value
                      }
                    </span>
                    <div className='flex flex-row items-center gap-2 mt-1'>
                      <img src={arrowUpIcon} className='w-3 h-3' />
                      <span className='text-sm text-muted-foreground'>
                        {
                          patientData.diagnosis_history[0].blood_pressure
                            .systolic.levels
                        }
                      </span>
                    </div>
                  </div>
                  <div className='w-full border-b border-neutral-500/30 my-4'></div>
                  <div className='flex flex-row gap-2 items-center mt-2'>
                    <div className='block h-3 w-3 bg-purple-500 rounded-xl'></div>
                    <span className='inline-block whitespace-nowrap'>
                      Diastolic
                    </span>
                  </div>
                  <div className='w-full mt-2'>
                    <span className='text-2xl block font-medium'>
                      {
                        patientData.diagnosis_history[0].blood_pressure
                          .diastolic.value
                      }
                    </span>
                    <div className='flex flex-row items-center gap-2 mt-1'>
                      <img src={arrowUpIcon} className='w-3 h-3 rotate-180' />
                      <span className='text-sm text-muted-foreground'>
                        {
                          patientData.diagnosis_history[0].blood_pressure
                            .diastolic.levels
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid flex-col w-full mt-6 grid-cols-12 gap-6'>
              <div className='min-h-60 col-span-4 bg-cyan-500/15 rounded-xl flex flex-col gap-4 p-4'>
                <div className='w-full'>
                  <img src={lungsImage} className='h-24 w-24' />
                </div>
                <div className='flex flex-col px-1'>
                  <span className='text-md'>Respiratory Rate</span>
                  <span className='text-3xl font-bold'>
                    {' '}
                    {
                      patientData.diagnosis_history[0].respiratory_rate.value
                    }{' '}
                    bpm
                  </span>
                  <span className='text-md text-muted-foreground mt-6'>
                    {patientData.diagnosis_history[0].respiratory_rate.levels}
                  </span>
                </div>
              </div>
              <div className='min-h-60 col-span-4 bg-red-500/15 rounded-xl flex flex-col gap-4 p-4'>
                <div className='w-full'>
                  <img src={thermoImage} className='h-24 w-24' />
                </div>
                <div className='flex flex-col px-1'>
                  <span className='text-md'>Temperature</span>
                  <span className='text-3xl font-bold'>
                    {patientData.diagnosis_history[0].temperature.value}°F
                  </span>
                  <span className='text-md text-muted-foreground mt-6'>
                    {patientData.diagnosis_history[0].temperature.levels}
                  </span>
                </div>
              </div>
              <div className='min-h-60 col-span-4 bg-pink-500/15 rounded-xl flex flex-col gap-4 p-4'>
                <div className='w-full'>
                  <img src={heartImage} className='h-24 w-24' />
                </div>
                <div className='flex flex-col px-1'>
                  <span className='text-md'>Heart Rate</span>
                  <span className='text-3xl font-bold'>
                    {patientData.diagnosis_history[0].heart_rate.value} bpm
                  </span>
                  <div className='flex flex-row gap-2 items-center mt-6'>
                    <img src={arrowUpIcon} className='rotate-180 w-3 h-3' />
                    <span className='text-md text-muted-foreground'>
                      {patientData.diagnosis_history[0].heart_rate.levels}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col bg-white rounded-3xl'>
          <div className='w-full flex flex-row gap-4 items-center justify-between p-6 pb-2'>
            <span className='text-2xl font-medium'>Diagnostic List</span>
          </div>
          <div className='w-full flex flex-col p-4'>
            <div className='w-full grid grid-cols-12 gap-4 p-4 bg-gray-500/5 rounded-full'>
              <div className='col-span-3'>
                <span className='text-start font-medium'>
                  Problem/Diagnosis
                </span>
              </div>
              <div className='col-span-7'>
                <span className='text-start font-medium'>Description</span>
              </div>
              <div className='col-span-2'>
                <span className='text-start font-medium'>Status</span>
              </div>
            </div>
            <div className='w-full flex flex-col divide-y divide-gray-500/15'>
              {patientData.diagnostic_list.map((diag, id) => (
                <div className='w-full grid grid-cols-12 gap-4 p-4' key={id}>
                  <div className='col-span-3 flex items-center'>
                    <span className='text-start font-normal text-muted-foreground'>
                      {diag.name}
                    </span>
                  </div>
                  <div className='col-span-7 flex items-center'>
                    <span className='text-start font-normal text-muted-foreground'>
                      {diag.description}
                    </span>
                  </div>
                  <div className='col-span-2 flex items-center'>
                    <span className='text-start font-normal text-muted-foreground'>
                      {diag.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DiagnosisHistory;
