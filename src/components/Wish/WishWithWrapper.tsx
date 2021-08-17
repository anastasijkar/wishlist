import React, { FC } from 'react';
import PropTypes from 'prop-types'

import formatDistance from 'date-fns/formatDistance';

import { Badge } from 'antd';

import { blue, volcano } from '@ant-design/colors';

import './WishWithWrapper.scss';

import { FirebaseTimestamp } from '../../firebase';
import { firebaseTimestampToDate } from '../../utils/firebaseTimestamp';

const propTypes = {
  children: PropTypes.element.isRequired,
  dueDate: PropTypes.instanceOf(FirebaseTimestamp)
};

type WrapperProps = PropTypes.InferProps<typeof propTypes>;

const WishWithWrapper: FC<WrapperProps> = ({ children, dueDate }) => {

  const today: Date = new Date();
  const expirationDate: Date | null = dueDate ? firebaseTimestampToDate(dueDate) : null;
  const isExpired: boolean = expirationDate ? expirationDate < today : false;
  const expirationText: string | null = expirationDate ? `${isExpired ? 'expired' : 'expires'} ${formatDistance(expirationDate, today, { addSuffix: true })}` : null;

  return dueDate
    ? <Badge.Ribbon className={isExpired ? 'expired' : ''} text={expirationText || ''} color={isExpired ? volcano[2] : blue[0]}>
      {children}
    </Badge.Ribbon>
    : <>{children}</>;
}

WishWithWrapper.defaultProps = {
  dueDate: null
}

export default WishWithWrapper;