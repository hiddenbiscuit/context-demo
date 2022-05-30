//// IMPORTS
import { createContext, useContext, useCallback, memo, useReducer, Dispatch } from 'react';
const isEqual = require("react-fast-compare");

const FORM_DEFAULT_VALUES: Record<string, string> = { a: '', x: '', y: '', z: '' };
const formContext = createContext({state: FORM_DEFAULT_VALUES, dispatch: (_ : any) => {}});

const reducerFunc = (state: typeof FORM_DEFAULT_VALUES, action: Record<string, string>) => {
  switch(action.type) {
    case 'updateField':
      const { dataKey, payload } = action;
      return {
        ...state,
        [dataKey]: payload
      };
    case 'clearFields':
      return FORM_DEFAULT_VALUES;
    default:
      throw new Error('action.type invalid!')
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducerFunc, FORM_DEFAULT_VALUES);
  console.log('Rendered app')
  return (
    <formContext.Provider value={{ state, dispatch }}>
      <FormPage />
    </formContext.Provider>
  )
}

const FormPage = () => {
  const { dispatch } = useContext(formContext);
  console.log('Rendered formpage')
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col text-center gap-5 mt-16 p-6 border rounded">
        <div className="font-bold text-lg">Some Complex Form</div>
        <SimpleComponent />
        <ComplexComponent />
        <button
          className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => dispatch({ type: 'clearFields' })}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

const SimpleComponent = () => {
  const { state, dispatch } = useContext(formContext);
  const { a, ...other } = state;
  return <SimpleComponentCore state={{ a: a }} dispatch={dispatch} />
}

const SimpleComponentCore = memo(({ state, dispatch }: { state: Record<string, string>, dispatch: Function }) => {
  console.log('Rendered SimpleComponent');
  return (
    <div className="flex flex-col text-left p-2 border border-red-400 rounded">
      <InputField
        label='Input A'
        value={state.a}
        dataKey='a'
        dispatch={dispatch}
      />
    </div>
  )
}, isEqual);

const ComplexComponent = () => {
  const { state, dispatch } = useContext(formContext);
  const { a, ...other } = state;
  return (
    <ComplexComponentCore state={{...other}} dispatch={dispatch} />
  )
}

const ComplexComponentCore = memo(({ state, dispatch }: { state: Record<string, string>, dispatch: Function }) => {
  console.log('Rendered ComplexComponent');
  const changeHandler = useCallback((dataKey: string, payload: string) => dispatch({ type: 'updateField',  dataKey: dataKey, payload: payload }), []);
  return (
    <div className="flex flex-col text-left p-2 border border-blue-400 rounded">
      <InputField
        label='Input X'
        value={state.x}
        dataKey='x'
        dispatch={dispatch}
      />
      <InputField
        label='Input Y'
        value={state.y}
        dataKey='y'
        dispatch={dispatch}
      />
      <InputField
        label='Input Z'
        value={state.z}
        dataKey='z'
        dispatch={dispatch}
      />
    </div>
  )
}, isEqual);

const InputField = memo(({ label, value, dataKey, dispatch }: { label: string, value: string, dataKey: string, dispatch: Function }) => {
  console.log(`Rendered InputField for ${label}`);
  return (
    <>
      <div className="font-bold">{label}</div>
      <input
        type="text"
        className='border rounded p-1'
        value={value}
        onChange={e => dispatch({ type: 'updateField', dataKey: dataKey, payload: e.target.value })}
      />
    </>
  )
}, isEqual);

export default App;