import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import {  
    ResponsiveContainer,
    ComposedChart, 
    CartesianGrid, 
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Area,
    LineChart,
    Bar,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';

// eslint-disable-next-line react/prop-types
const generateDot = ({stroke, ...other}) => (
    <Dot
        { ...other }
        fill={ stroke }
        stroke={ colors['white'] }
        strokeWidth={ 2 }
        r={ 5 }
    />
);
class ClickVsConvMetrics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height : this.props.height,
            className: this.props.className,
            clicks: this.props.clicks,
            conversions: this.props.conversions
        };
        this.dataGenerator = this.dataGenerator.bind(this);
    }

    dataGenerator(index){
        let data = [];
        let self = this;
        let clicks = self.state.clicks;
        let conversions = self.state.conversions;
        let months = _.uniq(_.map(clicks, (click) => click.data.created_at.substring(0,7)));
            months = _.uniq([...months, ..._.map(conversions, (conversion) => conversion.data.updated_at.substring(0,7))]);
        let groupByClickMonth = _.groupBy(clicks, (click) => {
            return click.data.created_at.substring(0, 7);
        });
        let groupByConversionMonth = _.groupBy(conversions, (conversion) => {
            return conversion.data.updated_at.substring(0, 7);
        });
        console.log(groupByClickMonth);
        let sortClickMonths = months.sort(function (a, b) {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            else { return 0; }
        });
        console.log(sortClickMonths);
        let sortedGroups = sortClickMonths.map((month) => {
            return groupByClickMonth[month];
        }).filter(group => group);
        let clickCountByMonth = _.map(sortedGroups, (group) => { return (group.length) });


        let sortedConversionGroups = sortClickMonths.map((month) => {
            return groupByConversionMonth[month];
        }).filter(group => group);

        let conversionCountByMonth = _.map(sortedConversionGroups, (group) => { return (group.length) });
        console.error(sortedConversionGroups, sortedGroups);
        let dataObj = {
            key: index,
            month: months,
            "Clicks": clickCountByMonth,
            "Conversions": conversionCountByMonth,
        }
        data.push(dataObj);
    
        return data;
    }

    render(){
        let height="100%";
        return(
            <ResponsiveContainer
                width='100%'
                minHeight='250px'
                //className={className}
                className="flex-fill"
                {...(!_.isUndefined(height) ? {
                    height
                } : {
                        aspect: 2 / 1
                    })}
            >
                <ComposedChart data={this.dataGenerator()}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke={colors['200']} strokeDasharray='none' vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area dataKey='Clicks' fill={colors['purple-02']} stroke={colors['purple']} activeDot={null} />
                    <Area dataKey='Conversions' fill={colors['primary-04']} stroke={colors['primary']} activeDot={{ r: 5 }} dot={generateDot} />
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}

export default ClickVsConvMetrics;