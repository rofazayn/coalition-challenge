import DiagnosisHistory from './components/diagnosis-history';
import Navbar from './components/navbar';
import PatientDetails from './components/patient-details';
import PatientsList from './components/patients-list';

function App() {
  return (
    <main className='flex flex-col w-full min-h-screen max-h-screen flex-grow bg-neutral-100 overflow-hidden'>
      <Navbar />

      <div className='grid grid-cols-12 flex-grow p-4 pt-[108px] gap-8 overflow-auto'>
        <div className='col-span-3 relative'>
          <PatientsList />
        </div>
        <div className='col-span-6'>
          <div className='h-full flex flex-col gap-6'>
            <DiagnosisHistory />
          </div>
        </div>
        <div className='col-span-3'>
          <div className='h-full flex flex-col gap-6'>
            <PatientDetails />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
