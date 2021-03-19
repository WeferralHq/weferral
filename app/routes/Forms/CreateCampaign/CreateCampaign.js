import React from 'react';
import _ from 'lodash';

import {
    EmptyLayout,
    Container,
    Wizard,
    Card,
    CardFooter,
    CardBody,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    CustomInput,
    Label,
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import { CardHeader, CardTitle } from 'reactstrap';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';
import {isAdmin} from '../../../utilities/admin';
import {
    createAutoCorrectedDatePipe,
    createNumberMask,
    emailMask
} from 'text-mask-addons';
import MaskedInput from 'react-text-mask';
import Load from '../../../utilities/load';

const sequence = ['get-started', 'rewards', 'settings', 'finish'];
const dolarsMask = createNumberMask({ prefix: '' });
const percentageMask = createNumberMask({ prefix: '', suffix: '%', integerLimit: 3 });

export class CreateCampaign extends React.Component {
    constructor(props) {
        super(props);
        let id = new URLSearchParams(this.props.location.search).get("_id") || null;
        this.state = {
            data: {},
            loading: true,
            recurring: false,
            rewardType: '',
            comType: '',
            reward: '',
            id: id,
            currentStep: _.first(sequence)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount(){
        if(await isAdmin() === false){
            return this.props.history.push("/login");
            //return browserHistory.push("/");
        }
        this.fetchData();
    }

    fetchData(){
        let self = this;
        if(this.state.id !== null){
            Fetcher(`${port}/api/v1/campaign/${this.state.id }`).then((res) => {
                self.setState({data: res.data, loading: false});
            }, (error) => {
                console.log(error);
            });
        }else{
            self.setState({loading: false});
        }
        
    }

    handleSubmit(e) {
        //e.preventDefault();

        const payload = {
            name: this.state.name,
            original_url: this.state.original_url,
            reward_type: this.state.reward_type,
            commission_type: this.state.commission_type,
            reward: this.state.reward,
            private_campaign: this.state.private_campaign,
            auto_approval: this.state.auto_approval,
            minimum_cash_payout: this.state.minimum_cash_payout,
            cookie_life: this.state.cookie_life,
            payout_term: this.state.payout_term,
            recurring_limit: this.state.recurring_limit,
            trial_period_days: this.state.trial_period_days
        }

        console.log(JSON.stringify(payload));

        Fetcher(`${port}/api/v1/campaign`, 'POST', payload).then((res) => {
            this.props.history.push('/campaign');
        }, (error) => {
            console.log(error);
        });
    }

    handleChange(e) {
        let self = this;
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        if(value === 'cash_reward'){
            self.setState({rewardType: 'cash_reward'});
        }else if(value === 'discount_coupon'){
            self.setState({rewardType: 'discount_coupon'})
        }

        if(value === 'fixed'){
            self.setState({comType: 'fixed'});
        }else if(value === 'percentage_sale'){
            self.setState({comType: 'percentage_sale'});
        }

        if(name === 'enable_recurring'){
            self.setState({recurring: value});
        }

        self.setState({[name]: value});
    }

    render() {
        const { currentStep } = this.state;
        if(this.state.loading){
            return(
                <EmptyLayout>
                    <EmptyLayout.Section center>
                        <Load/>
                    </EmptyLayout.Section>
                </EmptyLayout>
            )
        }else {
            let data = this.state.data;
            let url = data.references ? data.references.urls : '';
            return (
                <Container>
                    <HeaderMain 
                        title="Create Campaign"
                        className="my-4"
                    />
                    <Card>
                        <CardBody className="d-flex justify-content-center pt-5">
                            <Wizard
                                activeStep={ currentStep }
                                onStepChanged={ this._changeStep }
                            >
                                <Wizard.Step
                                    id={ sequence[0] }
                                    icon={ <i className="fa fa-hourglass-1 fa-fw"></i> }
                                    complete={ this._isComplete(sequence[0]) }
                                >
                                    Get Started
                                </Wizard.Step>
                                <Wizard.Step
                                    id={ sequence[1] }
                                    icon={ <i className="fa fa-usd fa-fw"></i> }
                                    complete={ this._isComplete(sequence[1]) }
                                >
                                    Rewards
                                </Wizard.Step>
                                <Wizard.Step
                                    id={ sequence[2] }
                                    icon={ <i className="fa fa-wrench fa-fw"></i> }
                                    complete={ this._isComplete(sequence[2]) }
                                >
                                    Settings
                                </Wizard.Step>
                                <Wizard.Step
                                    id={ sequence[3] }
                                    icon={ <i className="fa fa-hourglass-end fa-fw"></i> }
                                    complete={ this._isComplete(sequence[3]) }
                                >
                                    Finish
                                </Wizard.Step>
                            </Wizard>
                        </CardBody>
    
                        <CardBody className="p-5">
                        {
                            (() => {
                                switch(this.state.currentStep) {
                                    case sequence[0]:
                                        return (
                                            <Row>
                                                <Col md={12}>
                                                    <Card>
                                                        <CardBody>
                                                            <div className="d-flex justify-content-between align-items-center pb-3">
                                                                <h5>Name your campaign</h5>
                                                            </div>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="name">
                                                                        Campaign&apos;s Name <span className="text-danger">*</span>
                                                                    </Label>
                                                                    <Input onChange={this.handleChange} name="name" defaultValue={data.name || ''} id="name" placeholder='Name of the campaign...' />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="original_url">
                                                                        Website Url <span className="text-danger">*</span>
                                                                    </Label>
                                                                    {url ?
                                                                    <Input onChange={this.handleChange} name="original_url" defaultValue={url[0].original_url} id="original_url" placeholder='https://' />
                                                                    :
                                                                    <Input onChange={this.handleChange} name="original_url" id="original_url" placeholder='https://' />
                                                                    }
                                                                    
                                                                </FormGroup>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    case sequence[1]:
                                        return (
                                            <Row>
                                                <Col md={12}>
                                                    <Card>
                                                        <CardBody>
                                                            <CardTitle tag="h6" className="mb-4">
                                                                Setup Reward
                                                        </CardTitle>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Label for="reward-type">
                                                                        Reward Type
                                                                </Label>
                                                                    <CustomInput
                                                                        onChange={this.handleChange}
                                                                        type="select"
                                                                        name="reward_type"
                                                                        id="reward-type"
                                                                    >
                                                                        <option value="">Select Reward Type</option>
                                                                        <option value="cash_reward">Cash Reward</option>
                                                                        <option value="discount">Discount</option>
                                                                        <option value="discount_coupon">Discount Coupon</option>
                                                                        <option value="points">Points</option>
                                                                    </CustomInput>
                                                                </FormGroup>
                                                                {this.state.rewardType === 'cash_reward' && <FormGroup>
                                                                    <Label for="commission-type">
                                                                        Commission Type
                                                                    </Label>
                                                                    <CustomInput  type="select" onChange={this.handleChange} name="commission_type"
                                                                        id="commission-type"
                                                                    >
                                                                        <option value="">Select Commission Type</option>
                                                                        <option value="fixed">Fixed</option>
                                                                        <option value="percentage_sale">Percentage Sale</option>
                                                                    </CustomInput>
                                                                </FormGroup>}
                                                                {this.state.comType === 'percentage_sale' && <FormGroup>
                                                                    <Label for="percent">
                                                                        Percentage
                                                                    </Label>
                                                                    <Input type="text" onChange={this.handleChange} name="reward" id="percent"
                                                                        placeholder="Enter Percentage..." mask={ percentageMask } tag={ MaskedInput}
                                                                    />
                                                                </FormGroup>}
                                                                {this.state.comType === 'fixed' && <FormGroup>
                                                                    <Label for="amount">
                                                                        Amount
                                                                    </Label>
                                                                    <Input
                                                                        type="text" onChange={this.handleChange}
                                                                        name="reward" id="amount" placeholder="Enter Amount..."
                                                                        mask={ dolarsMask }
                                                                        tag={ MaskedInput }
                                                                    />
                                                                </FormGroup>}
                                                                {this.state.rewardType === 'discount_coupon' && <FormGroup>
                                                                    <Label for="promo-code">
                                                                        Promo Code
                                                                </Label>
                                                                    <Input type="text" name="reward" id="promo-code" placeholder="Enter Promo Code"
                                                                    />
                                                                </FormGroup>}
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    case sequence[2]:
                                        return (
                                            <Row>
                                                <Col md={12}>
                                
                                                    <Card>
                                                        <CardBody>
                                                            <CardTitle>
                                                                Settings
                                                        </CardTitle>
                                                            <Form>
                                                                <FormGroup>
                                                                    <CustomInput
                                                                        type="checkbox"
                                                                        onChange={this.handleChange}
                                                                        id="private_campaign"
                                                                        name="private_campaign"
                                                                        label="Private Campaign"
                                                                        className="mb-3"
                                                                        
                                                                    />
                                                                    <CustomInput
                                                                        type="checkbox"
                                                                        onChange={this.handleChange}
                                                                        id="auto_approval"
                                                                        name="auto_approval"
                                                                        label="Auto Approve referrals who sign up for this campaign"
                                                                        className="mb-3"
                                                                    />
                                                                    <CustomInput
                                                                        type="checkbox"
                                                                        onChange={this.handleChange}
                                                                        id="enable_recurring"
                                                                        name="enable_recurring"
                                                                        label="Enable recurring commission"
                                                                        className="mb-3"
                                                                    />
                                                                </FormGroup>
                                                                {this.state.recurring && <FormGroup>
                                                                    <Label for="recurring_limit">
                                                                        Recurring Limit
                                                                </Label>
                                                                    <Input
                                                                        type="text"
                                                                        onChange={this.handleChange}
                                                                        defaultValue={data.recurring_limit || ''}
                                                                        name="recurring_limit"
                                                                        id="recurring_limit"
                                                                        placeholder="Recurring Limit"
                                                                    />
                                                                    <p>Maximum number of transactions to be rewarded. for eg. if you want 
                                                                        to give only 12 months commission, set the value to <strong>12</strong>
                                                                    </p>
                                                                </FormGroup>}
                                                                {this.state.recurring && <FormGroup>
                                                                    <Label for="trial_period_days">
                                                                        Trial Period in Days
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        onChange={this.handleChange}
                                                                        defaultValue={data.trial_period_days || ''}
                                                                        name="trial_period_days"
                                                                        id="trial_period_days"
                                                                        placeholder="Trial Period in Days"
                                                                    />
                                                                    <p>If your subscription product or service has trial option 
                                                                        you can set the value of the trial period in days or leave empty
                                                                    </p>
                                                                </FormGroup>}
                                                                <FormGroup>
                                                                    <Label for="minimum_cash_payout">
                                                                        Minimum Cash Payout
                                                                </Label>
                                                                    <Input
                                                                        type="text" onChange={this.handleChange}
                                                                        defaultValue={data.minimum_cash_payout || ''}
                                                                        name="minimum_cash_payout" id="minimum_cash_payout"
                                                                        placeholder="Minimum Cash Payout"
                                                                        mask={ dolarsMask } tag={ MaskedInput }
                                                                    />
                                                                    <p>In case of cash rewards, pay your referrals only if their balance is over this value</p>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label for="payout_term">
                                                                        Payout Term(Days)
                                                                </Label>
                                                                    <CustomInput
                                                                        type="select"
                                                                        onChange={this.handleChange}
                                                                        name="payout_term"
                                                                        id="payout_term"
                                                                    >
                                                                        <option value="">Select Payout Term</option>
                                                                        <option value="NET15">Pay on 15th of the month the previous month earning</option>
                                                                        <option value="NET20">Pay on 20th of the month the previous month earning</option>
                                                                        <option value="NET30">Pay on 30th of the month the previous month earning</option>
                                                                    </CustomInput>
                                                                </FormGroup>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    case sequence[3]:
                                        return (
                                            <Row>
                                                <Col md={12}>
                                                    <Card>
                                                        <CardBody>
                                                            <FormGroup>
                                                                <Label for="cookie-life">
                                                                    Cookie Life(Days)
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    onChange={this.handleChange}
                                                                    defaultValue={data.cookie_life || ''}
                                                                    name="cookie_life"
                                                                    id="cookie-life"
                                                                    placeholder="Cookie Life"
                                                                />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="description">
                                                                    Short Description
                                                            </Label>
                                                                <Input
                                                                    type="text"
                                                                    onChange={this.handleChange}
                                                                    defaultValue={data.description || ''}
                                                                    name="description"
                                                                    id="description"
                                                                    placeholder="Short Description"
                                                                />
                                                            </FormGroup>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                }
                            })()
                        }
                        </CardBody>
    
                        <CardFooter className="p-4 bt-0">
                            <div className="d-flex">
                                {
                                    currentStep !== sequence[0] && (
                                        <Button onClick={() => {this._prevStep()}} color="link" className='mr-3'>
                                            <i className='fa fa-angle-left mr-2'></i>
                                            Previous
                                        </Button>
                                    )
                                }
                                {
                                    currentStep !== sequence[sequence.length - 1] && (
                                        <Button color='primary' onClick={() => {this._nextStep()}} className="ml-auto px-4">
                                            Next
                                            <i className='fa fa-angle-right ml-2'></i>
                                        </Button>
                                    )
                                }
                                {
                                    currentStep === sequence[3] && (
                                        <Button color='primary' onClick={() => {this.handleSubmit()}} className="ml-auto px-4">
                                            Submit
                                        </Button>
                                    )
                                }
                            </div>
                        </CardFooter>
                    </Card>
                </Container>
            );
        }
    }

    _changeStep = (stepId) => {
        this.setState({
            currentStep: stepId
        });
    }

    _prevStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index - 1]
        });
    }

    _nextStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index + 1]
        });
    }

    _isComplete = (stepId) =>
        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}