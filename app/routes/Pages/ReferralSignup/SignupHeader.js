import React from 'react';
import { EmptyLayout } from './../../../components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LogoThemed } from '../../components/LogoThemed/LogoThemed';

const HeaderSignup = (props) => (
        props.types.map((type) => {
            return(
                    props.group[type].map((group) => {
                    if(group.option === 'campaign_title_form'){
                        return(
                            <div className="mb-4">
                                <h5 className="text-center mb-4">
                                    {group.value}
                                </h5>
                            </div>
                        )
                    }else if(group.option === 'campaign_title_description'){
                        return(
                            <div className="mb-4">
                                <p className="text-center">
                                    <Link to="/" className="d-inline-block">
                                        {
                                            props.icon ? (
                                                <i className={`fa fa-${props.icon} fa-3x ${props.iconClassName}`}></i>
                                            ) : (
                                                    <LogoThemed checkBackground logo={props.logo} height="30" />
                                                )
                                        }
                                    </Link>
                                    <br></br>
                                    {group.value}
                                </p>
                            </div>
                        )
                    }
                
                })
            )
        })
)

HeaderSignup.propTypes = {
    types: PropTypes.node,
    group: PropTypes.node
};

export { HeaderSignup };