import React from 'react';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Card,
    Media,
    CardBody,
    CardFooter,
    Button,
    CardHeader
} from './../../../components';
var moment = require('moment');
import ClickVsConvMetrics from './components/ClickVsConvMetrics';
import ReferralMetrics from './components/ReferralMetrics';

export class CampaignAnalytics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            campaigns: [],
            clicks:[],
            conversions:[],
            referrals:[]
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        Fetcher(`${port}/api/v1/campaigns`).then(function (response) {
            self.setState({campaigns: response});
        });
    }

    async onSubmit(){
        //e.preventDefault();
        let self = this;
        let fromDate = moment().toDate();
        let toDate = moment().toDate();
        if(self.state.select = '3month'){
            fromDate = moment().subtract(3, 'months').toDate();
        }
        Fetcher(`${port}/api/v1/clicks/${self.state.camps}`).then(function (response) {
            let click_data = response.filter(entry => {
                const time = new Date(entry.data.created_at);
                return time >= fromDate && time <= toDate
            });
            console.log(click_data)
            self.setState({clicks: click_data});
        }).then(function(){
                Fetcher(`${port}/api/v1/conversions/${self.state.camps}`).then(function (response) {
                    let conversion_data = response.filter(entry => {
                        const time = new Date(entry.data.created_at);
                        return time >= fromDate && time <= toDate
                    });
                    console.log(conversion_data)
                    self.setState({conversions: conversion_data});
                })
        }).then(function(){
            Fetcher(`${port}/api/v1/participants`).then(function (response) {
                console.log(response);
                let referral_data = response.filter(entry => {
                    const time = new Date(entry.created_at);
                    return time >= fromDate && time <= toDate
                });
                console.log(referral_data)
                self.setState({referrals: referral_data});
            })
        })

        console.log(`From ${fromDate} to ${toDate}`);
    }

    handleChange(e){
        let self = this;
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        self.setState({[name]: value});
    }

    render() {
        return(
            <React.Fragment>
                <Form>
                    <FormGroup row>
                        <Col sm={6}>
                            <Row>
                                <Col sm={ 12 } lg={ 4 } className="mb-3 mb-md-0">
                                    <Input type="select" onChange={this.handleChange}
                                        name="camps"
                                        id="defaultSelect"
                                    >
                                        <option defaultValue="">Select Campaign</option>
                                        {this.state.campaigns.map(camp => (
                                            <option value={camp.id}>{camp.name}</option>))}
                                    </Input>
                                </Col>
                                <Col sm={ 12 } lg={ 4 } className="mb-3 mb-md-0">
                                    <Input type="select" onChange={this.handleChange}
                                        name="select"
                                        id="defaultSelect"
                                    >
                                        <option defaultValue="">Select Period</option>
                                        <option value="lmonth">Last Month</option>
                                        <option value="3month">Last 3 Months</option>
                                        <option value="6month">Last 6 Months</option>
                                        <option value="lyear">Last Year</option>
                                    </Input>
                                </Col>
                                <Col sm={ 12 } lg={ 4 } className="mb-3 mb-md-0">
                                    <Button color="primary" size="md" onClick={() => { this.onSubmit() }}>Apply</Button>
                                </Col>
                            </Row>
                        
                        </Col>
                    </FormGroup>
                </Form>
                {this.state.referrals.length > 0 && <Row>
                    <Col md={6}>
                        <ClickVsConvMetrics clicks={this.state.clicks} conversions={this.state.conversions}/>
                    </Col>
                    <Col md={6}>
                        <ReferralMetrics referrals={this.state.referrals} />
                    </Col>
                </Row>}
            </React.Fragment>
        )
    }
}