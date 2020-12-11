import React from 'react';
import { Container, Row, Col } from './../../../components';

import {
    CampaignField,
} from './campaign-fields';
import { HeaderMain } from "../../components/HeaderMain";

export const CampaignTable = () => (
    <Container>
        <HeaderMain 
            title="Campaigns"
            className="mb-5 mt-4"
        />
        <Row className="mb-5">
            <Col>
                <CampaignField />
            </Col>
        </Row>
    </Container>
);
