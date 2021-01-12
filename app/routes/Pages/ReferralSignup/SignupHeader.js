import React from 'react';
import { EmptyLayout } from './../../../components';
import PropTypes from 'prop-types';

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