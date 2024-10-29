import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const DynamicSkeleton = ({
  variant = 'text',
  count = 1,
  dimensions = {},
  spacing = 1,
  ...additionalProps
}) => {
const skeletons = Array.from({ length: count }, (_, index) => (
    <Skeleton
      key={index}
      variant={variant}
      width={dimensions.width || '100%'}
      height={dimensions.height || 'auto'}
      sx={dimensions.sx || {}}
      {...additionalProps}
    />
  ));

  return <Stack spacing={spacing}>{skeletons}</Stack>;
};

DynamicSkeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular', 'rounded']),
  count: PropTypes.number,
  dimensions: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sx: PropTypes.object,
  }),
  spacing: PropTypes.number,
};

export default DynamicSkeleton;
