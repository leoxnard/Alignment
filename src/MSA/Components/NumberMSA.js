import '../CSS/NumberMSA.css'

export function Number(props) { 
  return (
    <div className='numberContainer'>
      <label> { props.label } </label>
      <div className='number'> { props.value } </div>
    </div>
  );
}