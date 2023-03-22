import { useSelector, useDispatch } from 'react-redux';
import { newFollowersSearch, selectFollowers, getNextFollowersPage } from './followersSlice';
import { FollowersSearch } from './components//followersSearch/FollowersSearch';
import { FollowersGrid } from './components/followersGrid/FollowersGrid';
import { Spinner } from './components/spinner/Spinner';
import styles from './Followers.module.css';

export const Followers = () => {
  const { followersList, isLoading, isEndOfData} = useSelector(selectFollowers);
  console.log(followersList);
  const dispatch = useDispatch();
  const onSearch = (key) => {
    try {
      dispatch(newFollowersSearch(key));
    } catch (error) {
      alert(`Something went wrong ${error}`)
    }
  }
  const onLoadMore = () => {
    if (isLoading || isEndOfData) {
      return;
    }
    dispatch(getNextFollowersPage());
  }
  return (
    <div className={styles.followers}>
      <FollowersSearch onSearch={onSearch} />
      <FollowersGrid 
        gridData={[...followersList]} 
        onLoadMore={onLoadMore} 
        isLoading={isLoading} />
      <div className={styles.details}>
        Showing: {followersList.length} followers {(isEndOfData || (followersList.length < 100))  && '(No more followers to load)'}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
} 