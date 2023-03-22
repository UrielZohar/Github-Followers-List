import { Loader } from "@progress/kendo-react-indicators";
import './Spinner.css';

export const  Spinner = () => 
  <div className='spinner'>
    <Loader type='infinite-spinner' />
  </div>