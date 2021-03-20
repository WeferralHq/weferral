import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const logos = {
    'primary': require('./../../../images/logos/weferral.svg')
}

const getLogo = (style, color) => {
    return logos[color];
}

const getLogoUrl = (logo) => {
    return logo;
}

// Check for background
const getLogoUrlBackground = (style, color) => {
    if (style === 'color') {
        return logos['white'];
    } else {
        return getLogo(style, color);
    }
}

const LogoThemed = ({ checkBackground, logo, className, ...otherProps }) => (
    <ThemeConsumer>
    {
        ({ style, color }) => (
            <img
                src={
                    logo ?
                        getLogoUrl(logo) :
                        getLogo(style, 'primary')
                }
                className={ classNames('d-block', className) }
                alt="Weferral Logo"
                { ...otherProps }
            />
        )
    }
    </ThemeConsumer>
);
LogoThemed.propTypes = {
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
};

export { LogoThemed };
