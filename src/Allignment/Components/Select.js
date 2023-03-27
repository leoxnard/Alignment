export function Select(props) {
  let options = [];
  for (let i = 0; i < props.options.length; i++) {
    options.push(<option key={i} value = {i}> { props.options[i] } </option>);
  }
  return (
    <select className='selectObject' value={props.value} onChange={props.handleChange}> { options } </select>
  );
}