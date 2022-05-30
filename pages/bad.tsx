//// IMPORTS
import { ChangeEventHandler, createContext, useContext, useState, Dispatch } from 'react';

const FORM_DEFAULT_VALUES: Record<string, string> = { a: '', x: '', y: '', z: '' };
const formContext = createContext({state: FORM_DEFAULT_VALUES, setState: (_ : any) => {}});

const App = () => {
  const [state, setState] = useState<Record<string, string>>(FORM_DEFAULT_VALUES);
  console.log('Rendered app')
  return (
    <formContext.Provider value={{ state, setState }}>
      <FormPage />
    </formContext.Provider>
  )
}

const FormPage = () => {
  const { state, setState } = useContext(formContext);
  console.log('Rendered formpage')
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col text-center gap-5 mt-16 p-6 border rounded">
        <div className="font-bold text-lg">Some Complex Form</div>
        <SimpleComponent data={state} setData={setState} />
        <ComplexComponent data={state} setData={setState} />
        <button
          className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setState(FORM_DEFAULT_VALUES)}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

const SimpleComponent = ({ data, setData } : { data: Record<string, string>, setData: Function }) => {
  console.log('Rendered SimpleComponent');
  return (
    <div className="flex flex-col text-left p-2 border border-red-400 rounded">
      <InputField
        label='Input A'
        value={data.a}
        onChange={e => setData({...data, a: e.target.value})}
      />
    </div>
  )
}

const ComplexComponent = ({ data, setData } : { data: Record<string, string>, setData: Function }) => {
  console.log('Rendered ComplexComponent');
  return (
    <div className="flex flex-col text-left p-2 border border-blue-400 rounded">
      <InputField
        label='Input X'
        value={data.x}
        onChange={e => setData({...data, x: e.target.value})}
      />
      <InputField
        label='Input Y'
        value={data.y}
        onChange={e => setData({...data, y: e.target.value})}
      />
      <InputField
        label='Input Z'
        value={data.z}
        onChange={e => setData({...data, z: e.target.value})}
      />
    </div>
  )
}

const InputField = ({ label, value, onChange }: { label: string, value: string, onChange: ChangeEventHandler<HTMLInputElement> }) => {
  console.log(`Rendered InputField for ${label}`);
  return (
    <>
      <div className="font-bold">{label}</div>
      <input
        type="text"
        className='border rounded p-1'
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default App;