import React, { FC, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'

import { Radio, RadioChangeEvent, Tooltip, Button, Badge } from 'antd';

import { SlidersOutlined } from '@ant-design/icons';

import { geekblue } from '@ant-design/colors';

import './WishFilter.scss';

import ICollectionSortingParams from '../../interfaces/api/collectionSortingParams.interface';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import ICollectionFilterParam from '../../interfaces/api/collectionFilterParam.interface';

import { format } from 'date-fns';

const propTypes = {
  applyFilterSort: PropTypes.func.isRequired
};

type WishFilterProps = PropTypes.InferProps<typeof propTypes>;

const WishFilter: FC<WishFilterProps> = ({ applyFilterSort }) => {
  const [show, setShow] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState('none');
  const [showExpired, setShowExpired] = useState(true);

  const toggleFilters = useCallback(() => {
    setShow(!show)
  }, [show])

  const handleSortChange = (e: RadioChangeEvent) => {
    setSortValue(e.target.value);
  };

  const handleShowExpiredChange = (e: CheckboxChangeEvent) => {
    setShowExpired(e.target.checked);
  }

  useEffect(() => {
    apply()
  }, [sortValue, showExpired])

  const apply = () => {
    const sortParams: ICollectionSortingParams | undefined = sortValue !== 'none' ? {
      fieldName: sortValue.slice(1),
      descending: !!(sortValue[0] === '-')
    } : undefined
    let filterParams: ICollectionFilterParam[] = [];
    if (!showExpired) {
      filterParams.push({
        fieldPath: 'dueDate',
        opStr: '>',
        value: +format(new Date(), 'T')
      })
    }
    applyFilterSort(sortParams, filterParams);
  };

  return (
    <>
      <Tooltip placement="left" color={geekblue[3]} title="Filter &amp; Sort">
        <Button
          className="floating-button top right"
          type="primary"
          shape="circle"
          icon={<Badge dot={sortValue !== 'none'}><SlidersOutlined style={{ color: '#fff' }} /></Badge>}
          size='large'
          style={{ backgroundColor: geekblue[3], borderColor: geekblue[2] }}
          onClick={toggleFilters}
        />
      </Tooltip>
      <div className={`wish-filter ${show ? 'visible' : ''}`}>
        <div className="wish-filter--row wish-filter__sort">
          <strong>Sort:</strong>
          <Radio.Group value={sortValue} onChange={handleSortChange}>
            <Radio.Button value="none">None</Radio.Button>
            <Radio.Button value="+title">Title (A-Z)</Radio.Button>
            <Radio.Button value="-title">Title (Z-A)</Radio.Button>
            <Radio.Button value="+dueDate">Expiration date (sooner first)</Radio.Button>
            <Radio.Button value="-dueDate">Expiration date (later first)</Radio.Button>
          </Radio.Group>
        </div>
        <div className="wish-filter--row">
          <Checkbox checked={showExpired} onChange={handleShowExpiredChange}>Show expired wishes</Checkbox>
        </div>
      </div>
    </>
  );
}

export default WishFilter;
