import '../CSS/NumberInput.css'

export function NumberInput(props) { 
  return (
    <div className='numberInputContainer'>
      <label> { props.label } </label>
      <input className='numberInput' type='text' maxLength='3' value={props.value} onChange={props.handleChange}/>
    </div>
  );
}