import React from 'react';
import PropTypes from 'prop-types';
import {  
    PieChart, 
    Pie,
    Cell
} from 'recharts';

import colors from '../../../../colors';

const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}
];

const COLORS = [ colors['primary'], colors['success'], colors['yellow']];

const TinyDonutChartBig = (props) => (
    <PieChart width={ 80 } height={ 80 }>
        <Pie
            data={[
                {name: 'Group A', value: props.stats.active},
                {name: 'Group B', value: props.stats.invited},
                {name: 'Group C', value: props.stats.flagged}
            ]}
            dataKey="value"
            stroke={ colors['white'] }
            innerRadius={ 26 }
            outerRadius={ 35 }
            fill={ colors[ props.pieBg ] }
        >
        {
            data.map((entry, index) => <Cell key={ index } fill={COLORS[index % COLORS.length]} />)
        }
        </Pie>
    </PieChart>
);

TinyDonutChartBig.propTypes = {
    pieBg: PropTypes.spring
};
TinyDonutChartBig.defaultProps = {
    pieBg: "300"
};

export { TinyDonutChartBig };
