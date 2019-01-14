import { css } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 425,
  smallPhone: 375,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
