import React from 'react';
import {
    Container,
    Row,
    Col,
    ButtonToolbar,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    InputGroup,
    Input,
    InputGroupAddon
} from './../../../components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    LinkedinIcon,
    EmailIcon,
    WhatsappIcon
  } from "react-share";

  const updateShare = function(value,id){
    Fetcher(`${port}/api/v1/campaign/url/${id}/${value}`, 'PUT').then(function (response) {
        if (!response.error) {
            return;
        }
        return;
    });
  }

const ShareCard = (props) => (
    <React.Fragment>
        <Container>
            <Row>
                <Col lg={ 12 }>
                <Card className="mb-3 bg-none">
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">
                                Share by email or on social media
                                </CardTitle>
                                <ButtonToolbar className="justify-content-center">
                                <FacebookShareButton
                                    url={`${props.rows.url}?ref=${props.rows.referral_code}`}
                                    size="md"
                                    quote={"Share with the world"} onShareWindowClose={() => updateShare('fb_shares', props.rows.campaign_id)}>
                                    <FacebookIcon size={36} />
                                </FacebookShareButton>
                                <TwitterShareButton
                                url={`${props.rows.url}?ref=${props.rows.referral_code}`}
                                title={"Share with the world"} onShareWindowClose={() => updateShare('twitter_shares', props.rows.campaign_id)}>
                                    <TwitterIcon size={36}/>
                                </TwitterShareButton>
                                <LinkedinShareButton
                                url={`${props.rows.url}?ref=${props.rows.referral_code}`}
                                title={"Share with the world"} onShareWindowClose={() => updateShare('linkedin_shares', props.rows.campaign_id)}>
                                <LinkedinIcon size={36}/>
                                </LinkedinShareButton>
                                <EmailShareButton
                                url={`${props.rows.url}?ref=${props.rows.referral_code}`}
                                subject={"Share with the world"} onShareWindowClose={() => updateShare('email_shares', props.rows.campaign_id)}>
                                    <EmailIcon size={36}/>
                                </EmailShareButton>
                                <WhatsappShareButton
                                url={`${props.rows.url}?ref=${props.rows.referral_code}`}
                                title ={"Share with the world"} onShareWindowClose={() => updateShare('whatsapp_shares', props.rows.campaign_id)}>
                                    <WhatsappIcon size={36}/>
                                </WhatsappShareButton>
                                </ButtonToolbar>
                                <br></br>
                            <InputGroup>
                                <Input value={`${props.rows.url}?ref=${props.rows.referral_code}`} disabled/>
                                <InputGroupAddon addonType="append">
                                <CopyToClipboard text={`${props.rows.url}?ref=${props.rows.referral_code}`} >
                                    <Button color="primary">Copy</Button>
                                </CopyToClipboard>
                                </InputGroupAddon>
                            </InputGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
)

export default ShareCard;