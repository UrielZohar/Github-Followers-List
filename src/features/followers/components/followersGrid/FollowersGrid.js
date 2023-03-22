import { useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { debounce } from "lodash";
import { isRelativeGreaterThan } from '../../../../utils/utils';
const initialSort = [];

export const FollowersGrid = ({gridData, onLoadMore, isLoading}) => {
  const [sort, setSort] = useState(initialSort);
  const scrollHandlerDebounced = debounce(event => {
    console.log('Hi');
    const e = event.nativeEvent;
    if (isRelativeGreaterThan(e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight, 0.8)) {
      if (isLoading) {
        return;
      }
      onLoadMore();
    }
  }, 50);

  return <div>
        <Grid style={{
          height: '400px',
          width: 'fit-content'
          }}
          data={orderBy(gridData, sort)} 
          onScroll={scrollHandlerDebounced} 
          fixedScroll={true}
          sortable={true} 
          sort={sort}
          onSortChange={e => {
            setSort(e.sort);
          }}>
          <Column field="id" title="ID" width="250px" />
          <Column field="login" title="Username" width="250px" />
        </Grid>
      </div>;
};