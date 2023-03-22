import { useState } from 'react';
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import './FollowersSearch.css';

export const FollowersSearch = ({onSearch}) => {
  const [searchKey, setSearchKey] = useState('');
  const handleChange = ({value}) => {
    setSearchKey(value);
  }
  const handleOnClick = () => {
    onSearch(searchKey);
  };
  return (
    <div className='followers-search'>
      <Input
        validityStyles={false}
        value={searchKey}
        onChange={handleChange}
        name="githubUsername"
        label="Github Username"
        valid={searchKey !== ''}
        minLength={0}
      />
      <Button 
        onClick={handleOnClick} 
        className='followers-search-button'>
        Search
      </Button>
    </div>
  );
}