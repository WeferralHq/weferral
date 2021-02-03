import react from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText
} from './../../../components';

const ShareCard = () => (
    <React.Fragment>
        <Container>
            <Row>
                <Col lg={ 12 }>
                <Card className="mb-3 bg-none">
                        <CardBody>
                            <CardTitle tag="h6" className="text-center">
                                Share by email or on social media
                                <ButtonToolbar className="ml-auto">
                                    <Button color="facebook" size="md" className="mr-2">
                                        <i className="fa fa-facebook"></i>
                                    </Button>
                                    <Button color="twitter" size="sm" className="mr-2">
                                        <i className="fa fa-twitter"></i>
                                    </Button>
                                    <Button color="linkedin" outline size="sm">
                                        <i className="fa fa-fw fa-linkedin"></i>
                                    </Button>
                                    <Button color="secondary" outline size="sm">
                                        <i className="fa fa-email"></i>
                                    </Button>
                                    <Button color="medium" outline size="sm">
                                        <i className="fa fa-whatsapp"></i>
                                    </Button>
                                </ButtonToolbar>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
)