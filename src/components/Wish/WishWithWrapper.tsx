import React, { FC } from 'react';
import PropTypes from 'prop-types'

import { format, formatDistanceToNow } from 'date-fns'

import { Badge } from 'antd';

import { blue, volcano } from '@ant-design/colors';

import './WishWithWrapper.scss';

const propTypes = {
  children: PropTypes.element.isRequired,
  dueDate: PropTypes.number
};

type WrapperProps = PropTypes.InferProps<typeof propTypes>;

const WishWithWrapper: FC<WrapperProps> = ({ children, dueDate }) => {

  const today: number = +format(new Date(), 'T');
  const expirationDate: number | null = dueDate && dueDate !== Number.POSITIVE_INFINITY ? dueDate : null;
  const isExpired: boolean = expirationDate ? expirationDate < today : false;
  const expirationText: string | null = expirationDate ? `${isExpired ? 'expired' : 'expires'} ${formatDistanceToNow(expirationDate, { addSuffix: true })}` : null;

  return expirationDate
    ? <Badge.Ribbon className={isExpired ? 'expired' : ''} text={expirationText || ''} color={isExpired ? volcano[2] : blue[0]}>
      {children}
    </Badge.Ribbon>
    : <>{children}</>;
}

WishWithWrapper.defaultProps = {
  dueDate: Number.POSITIVE_INFINITY
}

export default WishWithWrapper;