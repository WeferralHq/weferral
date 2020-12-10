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
    InputGroup,
    InputGroupAddon,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from './../../../components';

import { HeaderMain } from "../../components/HeaderMain";

const sequence = ['your-cart', 'shipping', 'payment', 'summary'];

const items = [
    {
        name: 'Incredible Metal Keyboard',
        quantity: 22,
        price: '$578.00'
    },
    {
        name: 'Incredible Soft Cheese',
        quantity: 3,
        price: '$278.00'
    },
    {
        name: 'Handcrafted Granite Sausages',
        quantity: 29,
        price: '$465.00'
    },
    {
        name: 'Awesome Metal Gloves',
        quantity: 15,
        price: '$501.00'
    }
];

const WizardStep1 = () => (
    <Row>
        <Col md={ 6 }>
            
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
        <Col md={ 6 }>
            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center pb-3">
                        <h5>Name your campaign</h5>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="campaignName">
                                Campaign&apos;s Name <span className="text-danger">*</span>
                            </Label>
                            <Input id="campaignName" placeholder='Name of the campaign...'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="siteUrl">
                                Website Url <span className="text-danger">*</span>
                            </Label>
                            <Input id="siteUrl" placeholder='https://'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="campaignType">
                                Campaign Type <span className="text-danger">*</span>
                            </Label>
                            <CustomInput 
                                type="radio" 
                                id="rewardBased" 
                                name="radiosStackedCustom"
                                label="Reward Based"
                                defaultChecked 
                            />
                            <p></p>
                            <CustomInput 
                                type="radio" 
                                id="prelaunchWaitlist" 
                                name="radiosStackedCustom"
                                label="Prelaunch Waitlist" 
                            />
                            <p>Referrals Move up the leaderboard as they earn points</p>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    </Row>
);
const WizardStep2 = () => (
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
                                type="select"
                                name="customSelect"
                                id="reward-type"
                            >
                                <option value="">Select Reward Type</option>
                                <option>Cash Reward</option>
                                <option>Discount</option>
                                <option>Discount Coupon</option>
                                <option>Points</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label for="commission-type">
                                Commission Type
                            </Label>
                            <CustomInput
                                type="select"
                                name="customSelect"
                                id="commission-type"
                            >
                                <option value="">Select Commission Type</option>
                                <option>Fixed</option>
                                <option>Percentage Sale</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label for="percent">
                                Percentage
                            </Label>
                            <Input
                                type="text"
                                name="percent"
                                id="percent"
                                placeholder="Enter Percentage..."
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="amount">
                                Amount
                            </Label>
                            <Input
                                type="text"
                                name="amount"
                                id="amount"
                                placeholder="Enter Amount..."
                            />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    </Row>
);
const WizardStep3 = () => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    We Secured Your Line
                </h3>
                <p className="pb-3">
                    Below is a sample page for your cart , Created using pages design UI Elementes.
                </p>
                <Table className='my-2'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(items, (item, index) => (
                                <tr key={index}>
                                    <td>
                                        <i className="fa fa-close text-danger"></i>
                                    </td>
                                    <td>
                                        { item.name }
                                    </td>
                                    <td>
                                        { item.quantity }
                                    </td>
                                    <td className="text-right">
                                        { item.price }
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4} className='text-right'>
                                <strong>$986.78</strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <small>
                    Invoice are issued on the date of despatch. 
                    Payment terms: Pre-orders: within 10 days of invoice date with 4% discount, 
                    from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.
                </small>
            </div>
        </Col>
        <Col md={6}>
            <Nav pills className="pb-3">
                <NavItem>
                    <NavLink href="#" active>
                        Credit Card
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        PayPal
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Skrill
                    </NavLink>
                </NavItem>
            </Nav>

            <Card>
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center pb-3">
                        <h5>Credit Card</h5>
                        <div className="d-flex align-items-start">
                            <i className="fa fa-lg fa-cc-visa text-primary mr-1"></i>
                            <i className="fa fa-lg fa-cc-mastercard text-muted mr-1"></i>
                            <i className="fa fa-lg fa-cc-jcb text-muted mr-1"></i>
                        </div>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="cardHolder">
                                Card Holder&apos;s Name <span className="text-danger">*</span>
                            </Label>
                            <Input id="cardHolder" placeholder='Name on the card...'/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cardNumber">
                                Card Number <span className="text-danger">*</span>
                            </Label>
                            <Input id="cardNumber" placeholder='8888-8888-8888-8888'/>
                        </FormGroup>

                        <div className="d-flex justify-content-between align-items-center">
                            <FormGroup>
                                <Label>
                                    Expiriation <span className="text-danger">*</span>
                                </Label>
                                <div className="d-flex">
                                    <UncontrolledDropdown className="d-block">
                                        <DropdownToggle outline>
                                            Jun (06) <i className="fa fa-fw fa-angle-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem active>Jun (06)</DropdownItem>
                                            <DropdownItem>Jul (07))</DropdownItem>
                                            <DropdownItem>Aug (08)</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    &nbsp;
                                    <UncontrolledDropdown className="d-block">
                                        <DropdownToggle outline>
                                            2018 <i className="fa fa-fw fa-angle-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem active>2018</DropdownItem>
                                            <DropdownItem>2019</DropdownItem>
                                            <DropdownItem>2020</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </FormGroup>
                            <FormGroup className='text-right'>
                                <Label for="cvcCode">
                                    CVC Code <span className="text-danger">*</span>
                                </Label>
                                <Input id="cvcCode" placeholder='000'/>
                            </FormGroup>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    </Row>
);
const WizardStep4 = () => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    Summary
                </h3>
                <p className="mb-5">
                    Below is a sample page for your cart , Created using pages design UI Elementes.
                </p>
                <Table className='my-2'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(items, (item, index) => (
                                <tr key={index}>
                                    <td>
                                        <i className="fa fa-close text-danger"></i>
                                    </td>
                                    <td>
                                        { item.name }
                                    </td>
                                    <td>
                                        { item.quantity }
                                    </td>
                                    <td className="text-right">
                                        { item.price }
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4} className='text-right'>
                                <strong>$986.78</strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <small>Invoice are issued on the date of despatch. Payment terms: Pre-orders: within 10 days of invoice date with 4% discount, from the 11th to the 30th day net. Re-orders: non-reduced stock items are payable net after 20 days.</small>

            </div>
        </Col>
        <Col md={6}>
            <h6 className="mb-3 mt-2">Name and Email Address</h6>

            <Row tag="dl">
                <dt className="col-sm-4">First Name</dt>
                <dd className="col-sm-8">John</dd>

                <dt className="col-sm-4">Last Name</dt>
                <dd className="col-sm-8">Novoselic</dd>

                <dt className="col-sm-4">Email</dt>
                <dd className="col-sm-8">john@novoselic.com</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
            <h6 className="my-3">Billing Address</h6>
            <Row tag="dl">
                <dt className="col-sm-4">Address</dt>
                <dd className="col-sm-8">65575 Wintheiser Skyway Einar Pike</dd>

                <dt className="col-sm-4">Country</dt>
                <dd className="col-sm-8">United Kingdom</dd>

                <dt className="col-sm-4">City</dt>
                <dd className="col-sm-8">London</dd>

                <dt className="col-sm-4">State/Province</dt>
                <dd className="col-sm-8">Greater London</dd>

                <dt className="col-sm-4">ZIP Code</dt>
                <dd className="col-sm-8">151</dd>

                <dt className="col-sm-4">Phone</dt>
                <dd className="col-sm-8">+48 383-747-234</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
            <h6 className="my-3">Credit Card</h6>
            <Row tag="dl">
                <dt className="col-sm-4">Card Name</dt>
                <dd className="col-sm-8"><i className="fa fa-cc-visa text-primary mr-1"></i> Visa </dd>

                <dt className="col-sm-4">Card Number</dt>
                <dd className="col-sm-8">**** **** **** 6765</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
        </Col>
    </Row>
);

export class CreateCampaign extends React.Component {
    state = {
        currentStep: _.first(sequence)
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
                                Your Cart
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[1] }
                                icon={ <i className="fa fa-cube fa-fw"></i> }
                                complete={ this._isComplete(sequence[1]) }
                            >
                                Shipping
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[2] }
                                icon={ <i className="fa fa-credit-card fa-fw"></i> }
                                complete={ this._isComplete(sequence[2]) }
                            >
                                Payment
                            </Wizard.Step>
                            <Wizard.Step
                                id={ sequence[3] }
                                icon={ <i className="fa fa-navicon fa-fw"></i> }
                                complete={ this._isComplete(sequence[3]) }
                            >
                                Summary
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-5">
                    {
                        (() => {
                            switch(this.state.currentStep) {
                                case sequence[0]:
                                    return <WizardStep1 />
                                case sequence[1]:
                                    return <WizardStep2 />
                                case sequence[2]:
                                    return <WizardStep3 />
                                case sequence[3]:
                                    return <WizardStep4 />
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