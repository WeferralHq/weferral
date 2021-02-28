import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import {  
    ResponsiveContainer,
    CartesianGrid, 
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    Dot
} from './../../../../components/recharts';

import colors from './../../../../colors';

class ReferralMetrics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            referrals: this.props.referrals
        };
        this.dataGenerator = this.dataGenerator.bind(this);
    }

    dataGenerator(index){
        let data = [];
        let self = this;
        let referrals = self.state.referrals;
        //console.log(referrals);
        let months = _.uniq(_.map(referrals, (referral) => referral.created_at.substring(0,7)));
        let groupByReferralMonth = _.groupBy(referrals, (referral) => {
            return referral.created_at.substring(0, 7);
        });
        console.log(groupByReferralMonth);
        let sortReferralMonths = months.sort(function (a, b) {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            else { return 0; }
        });
        console.log(sortReferralMonths);
        let sortedGroups = sortReferralMonths.map((month) => {
            return groupByReferralMonth[month];
        }).filter(group => group);
        let referralCountByMonth = _.map(sortedGroups, (group) => { return (group.length) });
        console.error(referralCountByMonth, sortedGroups);
        let dataObj = {
            key: index,
            month: months,
            "Referrals": referralCountByMonth,
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
                <BarChart data={this.dataGenerator()}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke={colors['200']} strokeDasharray='none' vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            background: colors['900'],
                            border: `1px solid ${colors['900']}`,
                            color: colors['white']
                        }}
                    />
                    <Legend wrapperStyle={{ color: colors['900'] }} />
                    <Bar dataKey='Referrals' fill={ colors['primary'] } barSize={ 5 } />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default ReferralMetrics;