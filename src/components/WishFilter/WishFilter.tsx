import React, { FC, useState, useCallback } from 'react';
import PropTypes from 'prop-types'

import { Radio, RadioChangeEvent, Tooltip, Button, Badge } from 'antd';

import { SlidersOutlined } from '@ant-design/icons';

import { geekblue } from '@ant-design/colors';

import './WishFilter.scss';

const WishFilter: FC = () => {
  const [sortValue, setSortValue] = useState('none');
  const [show, setShow] = useState<boolean>(false);

  const toggleFilters = useCallback(() => {
    setShow(!show)
  }, [show])

  const handleSortChange = (e: RadioChangeEvent) => {
    setSortValue(e.target.value);
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
        <div className="wish-filter__sort">
          <strong>Sort:</strong>
          <Radio.Group value={sortValue} onChange={handleSortChange}>
            <Radio.Button value="none">None</Radio.Button>
            <Radio.Button value="title-desc">Title (A-Z)</Radio.Button>
            <Radio.Button value="title-asc">Title (Z-A)</Radio.Button>
            <Radio.Button value="dueDate-desc">Expiration date (sooner-later)</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </>
  );
}

WishFilter.defaultProps = {
  show: false
}

export default WishFilter;
