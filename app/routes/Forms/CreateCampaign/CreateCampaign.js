import React from 'react';
import _ from 'lodash';

import {
    Container,
    Wizard,
    Card,
    Nav,
    NavItem,
    NavLink,
    CardFooter,
    CardBody,
    Button,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    CustomInput,
    InputGroup,
    InputGroupAddon,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import { CardHeader, CardTitle } from 'reactstrap';
import Fetcher from '../../../utilities/fetcher';
import port from '../../../port';

const sequence = ['get-started', 'rewards', 'settings', 'finish'];

export class CreateCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            rewardType: '',
            comType: '',
            reward: '',
            currentStep: _.first(sequence)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const payload = {
            name: this.state.name,
            original_url: this.state.original_url,
            reward_type: this.state.reward_type,
            commission_type: this.state.commission_type,
            reward: this.state.reward,
            private_campaign: this.state.private_campaign,
            auto_approval: this.state.auto_approval,
            minimum_cash_payout: this.state.minimum_cash_payout,
            payout_term: this.state.payout_term
        }

        console.log(JSON.stringify(payload));

        Fetcher(`${port}/api/v1/campaign`, 'POST', payload).then((res) => {
            return <link to='/'></link>
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
        }else if(value === 'percentage'){
            self.setState({comType: 'percentage'});
        }

        self.setState({[name]: value});
    }

    render() {
        const { currentStep } = this.state;

        return (
            <Container>
                <HeaderMain 
                    title="Wizard"
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
                                icon={ <i className="fa fa-shopping-basket fa-fw"></i> }
                                complete={ this._isComplete(sequence[0]) }
                            >
                                Get Started
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[1] }
                                icon={ <i className="fa fa-cube fa-fw"></i> }
                                complete={ this._isComplete(sequence[1]) }
                            >
                                Rewards
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[2] }
                                icon={ <i className="fa fa-credit-card fa-fw"></i> }
                                complete={ this._isComplete(sequence[2]) }
                            >
                                Settings
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[3] }
                                icon={ <i className="fa fa-navicon fa-fw"></i> }
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
                                            <Col md={6}>
                            
                                                <div>
                                                    <h3 className="mb-4">
                                                        Your Bags are Ready to Check Out!
                                                </h3>
                                                    <p>
                                                        Discover goods you&apos;ll love from brands that inspire.
                                                        The easiest way to open your own online store.
                                                        Discover amazing stuff or open your own store for free!
                                                </p>
                                                    <small>
                                                        Below is a sample page for your cart,
                                                        Created using pages design UI Elementes
                                                </small>
                                                </div>
                                            </Col>
                                            <Col md={6}>
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
                                                                <Input onChange={this.handleChange} name="name" id="name" placeholder='Name of the campaign...' />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="original_url">
                                                                    Website Url <span className="text-danger">*</span>
                                                                </Label>
                                                                <Input onChange={this.handleChange} name="original_url" id="original_url" placeholder='https://' />
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
                                            <Col md={6}>
                                                <div>
                                                    <h3 className="mb-4">
                                                        Your Information is Safe with Us!
                                                </h3>
                                                    <p>
                                                        We respect your privacy and protect it with strong encryption, plus strict policies.
                                                        Two-step verification, which we encourage all our customers to use.
                                                </p>
                                                    <small>
                                                        Fields marked as <span className="text-danger">*</span> are Required!
                                                </small>
                                                </div>
                                            </Col>
                                            <Col md={6}>
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
                                                                <CustomInput
                                                                    type="select"
                                                                    onChange={this.handleChange}
                                                                    name="commission_type"
                                                                    id="commission-type"
                                                                >
                                                                    <option value="">Select Commission Type</option>
                                                                    <option value="fixed">Fixed</option>
                                                                    <option value="percentage_sale">Percentage Sale</option>
                                                                </CustomInput>
                                                            </FormGroup>}
                                                            {this.state.comType === 'percentage' && <FormGroup>
                                                                <Label for="percent">
                                                                    Percentage
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    onChange={this.handleChange}
                                                                    name="reward"
                                                                    id="percent"
                                                                    placeholder="Enter Percentage..."
                                                                />
                                                            </FormGroup>}
                                                            {this.state.comType === 'fixed' && <FormGroup>
                                                                <Label for="amount">
                                                                    Amount
                                                            </Label>
                                                                <Input
                                                                    type="text"
                                                                    onChange={this.handleChange}
                                                                    name="reward"
                                                                    id="amount"
                                                                    placeholder="Enter Amount..."
                                                                />
                                                            </FormGroup>}
                                                            {this.state.rewardType === 'discount_coupon' && <FormGroup>
                                                                <Label for="promo-code">
                                                                    Promo Code
                                                            </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="reward"
                                                                    id="promo-code"
                                                                    placeholder="Enter Promo Code"
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
                                            <Col md={6}>
                                                <div>
                                                    <h3 className="mb-4">
                                                        We Secured Your Line
                                                </h3>
                                                    <p className="pb-3">
                                                        Below is a sample page for your cart , Created using pages design UI Elementes.
                                                </p>
                                                    <small>
                                                        Invoice are issued on the date of despatch.
                                                        Payment terms: Pre-orders: within 10 days of invoice date with 4% discount,
                                                        from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.
                                                </small>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                            
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
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="minimum_cash_payout">
                                                                    Minimum Cash Payout
                                                            </Label>
                                                                <Input
                                                                    type="text"
                                                                    onChange={this.handleChange}
                                                                    name="minimum_cash_payout"
                                                                    id="minimum_cash_payout"
                                                                    placeholder="Minimum Cash Payout"
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
                                            <Col md={6}>
                                                <div>
                                                    <h3 className="mb-4">
                                                        Summary
                                                </h3>
                                                    <p className="mb-5">
                                                        Below is a sample page for your cart , Created using pages design UI Elementes.
                                                </p>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <Card>
                                                    <CardBody>
                                                        <FormGroup>
                                                            <Label for="cookie-life">
                                                                Cookie Life
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                onChange={this.handleChange}
                                                                name="cookie-life"
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